import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
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
        setIsAdmin(v => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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
        enterAdmin: () => setIsAdmin(true),
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
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};
