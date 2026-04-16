import { useState, useRef, ChangeEvent } from 'react';
import { Settings, X, RotateCcw, Save, ChevronRight, Check, Palette, Upload, RefreshCw } from 'lucide-react';
import { useAdmin, Branding } from './AdminContext';
import { translations } from './translations';

type Lang = 'en' | 'am';

const RADIUS_OPTIONS = [
  { label: 'Rounded Square', value: '2xl' },
  { label: 'Circle',         value: 'full' },
  { label: 'Slightly Rounded', value: 'lg' },
  { label: 'Sharp',          value: 'none' },
];

const BrandingEditor = ({
  branding, updateBranding, resetBranding, onClose,
}: {
  branding: Branding;
  updateBranding: (p: Partial<Branding>) => void;
  resetBranding: () => void;
  onClose: () => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateBranding({ logoImage: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#4CAF50]" /> Branding
          </h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Logo & colors — synced across devices</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Logo image */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Logo Image</label>
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-${branding.logoRadius || '2xl'} flex items-center justify-center shrink-0`}
              style={{ backgroundColor: branding.logoColor || '#4CAF50' }}
            >
              {branding.logoImage
                ? <img src={branding.logoImage} className="w-8 h-8 object-contain" alt="preview" />
                : <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(-35 12 12)"/><circle cx="19" cy="7" r="1.5" fill="currentColor"/></svg>
              }
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Image
              </button>
              {branding.logoImage && (
                <button
                  onClick={() => updateBranding({ logoImage: undefined })}
                  className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> Remove (use default SVG)
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>
        </div>

        {/* Logo color */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Background Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={branding.logoColor || '#4CAF50'}
              onChange={e => updateBranding({ logoColor: e.target.value })}
              className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={branding.logoColor || '#4CAF50'}
              onChange={e => updateBranding({ logoColor: e.target.value })}
              className="flex-1 p-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-[#4CAF50] transition-colors"
              placeholder="#4CAF50"
            />
          </div>
        </div>

        {/* Logo shape */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shape</label>
          <div className="grid grid-cols-2 gap-2">
            {RADIUS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => updateBranding({ logoRadius: opt.value })}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                  (branding.logoRadius || '2xl') === opt.value
                    ? 'border-[#4CAF50] bg-[#4CAF50]/10 text-[#4CAF50]'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => { if (confirm('Reset branding to defaults?')) resetBranding(); }}
          className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Reset Branding
        </button>
      </div>
    </>
  );
};

const SECTIONS = [
  { key: 'nav',          label: 'Navigation' },
  { key: 'hero',         label: 'Hero' },
  { key: 'overview',     label: 'Platform Overview' },
  { key: 'problem',      label: 'Problem Section' },
  { key: 'modules',      label: 'Modules' },
  { key: 'roles',        label: 'User Roles' },
  { key: 'visuals',      label: 'Product Visuals' },
  { key: 'benefits',     label: 'Benefits' },
  { key: 'ecosystem',    label: 'Ecosystem' },
  { key: 'business',     label: 'Business Value' },
  { key: 'cta',          label: 'Final CTA' },
  { key: 'footer',       label: 'Footer' },
  { key: 'registration', label: 'Registration' },
];

export const AdminBar = ({ lang }: { lang: Lang }) => {
  const { isAdmin, exitAdmin, resetOverrides, updateOverride, getContent, overrides, branding, updateBranding, resetBranding, saveToServer, isSyncing, syncError } = useAdmin();
  const [isPanelOpen, setIsPanelOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [localValues, setLocalValues]     = useState<Record<string, any>>({});
  const [saved, setSaved]                 = useState(false);
  const [serverSaved, setServerSaved]     = useState(false);

  const langOverrides = overrides[lang] ?? {};

  if (!isAdmin) return null;

  const openSection = (key: string) => {
    const current = getContent(lang)[key] ?? {};
    setLocalValues({ ...current });
    setActiveSection(key);
  };

  const handleSave = async () => {
    if (!activeSection) return;
    const base = (translations as any)[lang][activeSection] ?? {};
    for (const [key, value] of Object.entries(localValues)) {
      if (key in base) {
        updateOverride(lang, activeSection, key, value as string | string[]);
      }
    }
    setSaved(true);
    // Save to server after a short delay to let state update
    setTimeout(async () => {
      const ok = await saveToServer();
      if (ok) {
        setServerSaved(true);
        setTimeout(() => setServerSaved(false), 2000);
      }
    }, 100);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
    if (confirm('Reset ALL content to defaults? This cannot be undone.')) {
      resetOverrides();
      resetBranding();
      // Sync empty state to server
      setTimeout(() => saveToServer(), 100);
    }
  };

  const renderField = (key: string, baseValue: any) => {
    // Skip nested objects and arrays-of-objects
    if (baseValue !== null && typeof baseValue === 'object' && !Array.isArray(baseValue)) return null;
    if (Array.isArray(baseValue) && baseValue.length > 0 && typeof baseValue[0] === 'object') return null;

    const current = localValues[key] ?? baseValue;

    if (Array.isArray(baseValue)) {
      return (
        <div key={key} className="space-y-1.5">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">{key}</label>
          <textarea
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm font-mono resize-y focus:outline-none focus:border-[#4CAF50] transition-colors min-h-[70px]"
            value={Array.isArray(current) ? current.join('\n') : current}
            onChange={e =>
              setLocalValues(prev => ({ ...prev, [key]: e.target.value.split('\n') }))
            }
          />
          <p className="text-[10px] text-gray-400">One item per line</p>
        </div>
      );
    }

    // String
    const isLong = typeof baseValue === 'string' && baseValue.length > 80;
    return (
      <div key={key} className="space-y-1.5">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">{key}</label>
        {isLong ? (
          <textarea
            rows={3}
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm resize-y focus:outline-none focus:border-[#4CAF50] transition-colors"
            value={current}
            onChange={e => setLocalValues(prev => ({ ...prev, [key]: e.target.value }))}
          />
        ) : (
          <input
            type="text"
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4CAF50] transition-colors"
            value={current}
            onChange={e => setLocalValues(prev => ({ ...prev, [key]: e.target.value }))}
          />
        )}
      </div>
    );
  };

  const activeBase = activeSection
    ? ((translations as any)[lang][activeSection] ?? {})
    : {};

  return (
    <>
      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-3 bg-gray-950 text-white px-5 py-3 rounded-full shadow-2xl border border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest">Admin Mode</span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        <button
          onClick={() => setIsPanelOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#4CAF50] transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          Edit Content
        </button>

        {Object.keys(langOverrides).length > 0 && (
          <>
            <div className="w-px h-4 bg-white/20" />
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </>
        )}

        <div className="w-px h-4 bg-white/20" />

        <button
          onClick={exitAdmin}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors"
        >
          <X className="w-3 h-3" />
          Exit
        </button>
      </div>

      {/* ── Side panel ───────────────────────────────────────────── */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[2000] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => { setIsPanelOpen(false); setActiveSection(null); }}
          />

          {/* Panel */}
          <div className="relative ml-auto flex h-full shadow-2xl">

            {/* Section list */}
            <div className="w-52 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-sm">Sections</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Click to edit</p>
                </div>
                <button
                  onClick={() => { setIsPanelOpen(false); setActiveSection(null); }}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                {/* Branding entry */}
                <button
                  onClick={() => setActiveSection('__branding')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors border-b border-gray-200 mb-1 ${
                    activeSection === '__branding'
                      ? 'bg-[#4CAF50]/10 text-[#4CAF50] font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5" />
                    Branding
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                </button>

                {SECTIONS.map(s => {
                  const hasEdits = !!(langOverrides[s.key]);
                  return (
                    <button
                      key={s.key}
                      onClick={() => openSection(s.key)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        activeSection === s.key
                          ? 'bg-[#4CAF50]/10 text-[#4CAF50] font-bold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {hasEdits && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] shrink-0" />
                        )}
                        {s.label}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Editor */}
            <div className="w-96 bg-white flex flex-col h-full">
              {activeSection === '__branding' ? (
                <BrandingEditor branding={branding} updateBranding={updateBranding} resetBranding={resetBranding} onClose={() => setIsPanelOpen(false)} />
              ) : activeSection ? (
                <>
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {SECTIONS.find(s => s.key === activeSection)?.label}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Editing <span className="font-bold">{lang.toUpperCase()}</span> · {syncError ? <span className="text-red-500">{syncError}</span> : serverSaved ? <span className="text-green-600">synced to server</span> : 'synced across devices'}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-5">
                    {Object.entries(activeBase)
                      .map(([key, value]) => renderField(key, value))
                      .filter(Boolean)}
                  </div>

                  <div className="p-4 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                        saved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-[#4CAF50] text-white hover:bg-[#3d9943] active:scale-[0.98]'
                      }`}
                    >
                      {saved ? <Check className="w-4 h-4" /> : isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {saved ? 'Saved!' : isSyncing ? 'Syncing...' : 'Save Changes'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <Settings className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="font-bold text-gray-400 text-sm mb-1">Select a section</p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Choose a section from the left panel to start editing its content.
                  </p>
                </div>
              ) /* end activeSection ternary */ }
            </div>
          </div>
        </div>
      )}
    </>
  );
};
