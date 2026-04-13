import { createContext, useContext, useState, useEffect, ReactNode, FormEvent } from 'react';
import { translations } from './translations';

const ADMIN_PASSWORD = 'admin123';

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
}

const AdminContext = createContext<AdminContextType | null>(null);

const PasswordModal = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 1500);
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
            <button type="submit"
              style={{ flex: 2, padding: '11px 0', borderRadius: 12, border: 'none', background: '#4CAF50', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
              Enter Admin
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
  const [overrides, setOverrides] = useState<Overrides>(() => {
    try { return JSON.parse(localStorage.getItem('ps_content_overrides') || '{}'); }
    catch { return {}; }
  });
  const [branding, setBranding] = useState<Branding>(() => {
    try { return JSON.parse(localStorage.getItem('ps_branding') || '{}'); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('ps_content_overrides', JSON.stringify(overrides));
  }, [overrides]);

  useEffect(() => {
    localStorage.setItem('ps_branding', JSON.stringify(branding));
  }, [branding]);

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
  const resetBranding  = () => { setBranding({}); localStorage.removeItem('ps_branding'); };

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
      }}
    >
      {children}
      {showPrompt && (
        <PasswordModal
          onSuccess={() => { setShowPrompt(false); setIsAdmin(true); }}
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
