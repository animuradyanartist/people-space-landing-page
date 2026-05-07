import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode, FormEvent } from 'react';
import { translations } from './translations';

type Lang = 'en' | 'am';
type Overrides = Record<string, Record<string, Record<string, any>>>;

export interface Branding {
  logoImage?: string;   // URL or data URL
  logoColor?: string;   // hex, e.g. "#4CAF50"
  logoRadius?: string;  // tailwind class suffix, e.g. "2xl" | "full" | "xl"
}

interface AdminContextType {
  isAdmin: boolean;
  enterAdmin: () => void;
  exitAdmin: () => void;
  overrides: Overrides;
  updateOverride: (lang: Lang, section: string, key: string, value: string | string[]) => void;
  resetOverrides: () => void;
  getContent: (lang: Lang) => any;
  branding: Branding;
  updateBranding: (patch: Partial<Branding>) => void;
  resetBranding: () => void;
  saveToServer: () => Promise<boolean>;
  isSyncing: boolean;
  syncError: string | null;
}

const AdminContext = createContext<AdminContextType | null>(null);

const API_URL = '/api/admin-content';

const PasswordModal = ({ onSuccess, onCancel }: { onSuccess: (password: string) => void; onCancel: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, validate_only: true }),
      });
      if (res.ok) {
        onSuccess(password);
      } else {
        setError(true);
        setPassword('');
        setTimeout(() => setError(false), 1500);
      }
    } catch {
      // If server unreachable, still allow local-only admin
      onSuccess(password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 360, boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 2 }}>Admin Access</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>Enter password</p>
          </div>
        </div>

        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>This area is restricted to administrators.</p>

        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '12px 14px',
              border: `2px solid ${error ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: 12, fontSize: 15, outline: 'none',
              background: error ? '#fef2f2' : '#f9fafb',
              color: '#111827', transition: 'border-color 0.2s',
              marginBottom: error ? 6 : 16,
            }}
          />
          {error && <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 12 }}>Incorrect password. Try again.</p>}

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={onCancel}
              style={{ flex: 1, padding: '11px 0', borderRadius: 12, border: '2px solid #e5e7eb', background: 'transparent', fontSize: 14, fontWeight: 700, color: '#6b7280', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading}
              style={{ flex: 2, padding: '11px 0', borderRadius: 12, border: 'none', background: loading ? '#9ca3af' : '#4CAF50', fontSize: 14, fontWeight: 700, color: '#fff', cursor: loading ? 'wait' : 'pointer' }}>
              {loading ? 'Verifying...' : 'Enter Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const adminPasswordRef = useRef<string>('');

  // Initialize from localStorage cache, then fetch from server
  const [overrides, setOverrides] = useState<Overrides>(() => {
    try { return JSON.parse(localStorage.getItem('ps_content_overrides') || '{}'); }
    catch { return {}; }
  });
  const [branding, setBranding] = useState<Branding>(() => {
    try { return JSON.parse(localStorage.getItem('ps_branding') || '{}'); }
    catch { return {}; }
  });

  // Refs mirror latest state so saveToServer always reads the latest values
  // (avoids stale closures when saveToServer is called right after setState).
  const overridesRef = useRef(overrides);
  const brandingRef = useRef(branding);
  useEffect(() => { overridesRef.current = overrides; }, [overrides]);
  useEffect(() => { brandingRef.current = branding; }, [branding]);

  // Fetch server data on mount (for ALL visitors). The server is the source of
  // truth, BUT: if the server returns truly empty data while we have local
  // overrides cached, we keep the local cache. This prevents a misconfigured
  // server (e.g. missing ADMIN_PASSWORD causing silent save failures) from
  // wiping out edits that the admin believes are saved.
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const res = await fetch(API_URL, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const nextOverrides = data.overrides ?? {};
        const nextBranding = data.branding ?? {};

        const serverHasOverrides = Object.keys(nextOverrides).length > 0;
        const serverHasBranding = Object.keys(nextBranding).length > 0;
        const localHasOverrides = Object.keys(overridesRef.current).length > 0;
        const localHasBranding = Object.keys(brandingRef.current).length > 0;

        if (serverHasOverrides || !localHasOverrides) {
          setOverrides(nextOverrides);
          localStorage.setItem('ps_content_overrides', JSON.stringify(nextOverrides));
        }
        if (serverHasBranding || !localHasBranding) {
          setBranding(nextBranding);
          localStorage.setItem('ps_branding', JSON.stringify(nextBranding));
        }
      } catch {
        // Server unavailable — keep localStorage cache
      }
    };
    fetchServerData();
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('ps_content_overrides', JSON.stringify(overrides));
  }, [overrides]);

  useEffect(() => {
    localStorage.setItem('ps_branding', JSON.stringify(branding));
  }, [branding]);

  // Auto-sync to server (debounced) whenever data changes while admin is logged in.
  // Skips the initial mount so we don't re-save what we just fetched.
  const didInit = useRef(false);
  useEffect(() => {
    if (!isAdmin || !adminPasswordRef.current) return;
    if (!didInit.current) { didInit.current = true; return; }
    const t = setTimeout(() => { void saveToServerRef.current?.(); }, 600);
    return () => clearTimeout(t);
  }, [overrides, branding, isAdmin]);

  // Ref holder for saveToServer so the autosync effect can call the latest version
  const saveToServerRef = useRef<() => Promise<boolean>>();

  // Save to server — reads latest state via refs so it never sends stale data.
  const saveToServer = useCallback(async (): Promise<boolean> => {
    if (!adminPasswordRef.current) return false;
    setIsSyncing(true);
    setSyncError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: adminPasswordRef.current,
          overrides: overridesRef.current,
          branding: brandingRef.current,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSyncError(data.error || 'Failed to sync');
        return false;
      }
      return true;
    } catch (err) {
      setSyncError('Server unavailable');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Keep the autosync effect in sync with the latest saveToServer
  useEffect(() => { saveToServerRef.current = saveToServer; }, [saveToServer]);

  // Keyboard shortcut: Ctrl+Shift+A
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        if (isAdmin) {
          setIsAdmin(false);
        } else {
          setShowPrompt(true);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isAdmin]);

  const updateOverride = (lang: Lang, section: string, key: string, value: string | string[]) => {
    setOverrides(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...(prev[lang]?.[section] ?? {}),
          [key]: value,
        },
      },
    }));
  };

  const resetOverrides = () => {
    setOverrides({});
    localStorage.removeItem('ps_content_overrides');
  };

  const updateBranding = (patch: Partial<Branding>) => setBranding(prev => ({ ...prev, ...patch }));

  const resetBranding = () => {
    setBranding({});
    localStorage.removeItem('ps_branding');
  };

  const getContent = (lang: Lang) => {
    const base = (translations as any)[lang];
    const langOverrides = overrides[lang] ?? {};
    const result: any = {};
    for (const section of Object.keys(base)) {
      result[section] = { ...base[section], ...(langOverrides[section] ?? {}) };
    }
    return result;
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        enterAdmin: () => setShowPrompt(true),
        exitAdmin: () => setIsAdmin(false),
        overrides,
        updateOverride,
        resetOverrides,
        getContent,
        branding,
        updateBranding,
        resetBranding,
        saveToServer,
        isSyncing,
        syncError,
      }}
    >
      {children}
      {showPrompt && (
        <PasswordModal
          onSuccess={(pw) => {
            adminPasswordRef.current = pw;
            setShowPrompt(false);
            setIsAdmin(true);
          }}
          onCancel={() => setShowPrompt(false)}
        />
      )}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};
