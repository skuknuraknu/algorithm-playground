import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  ];

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-medium transition-colors border-2 border-slate-300"
        aria-label={t.language}
      >
        <Globe size={18} />
        <span className="hidden sm:inline">{currentLang?.flag}</span>
        <span className="hidden md:inline text-sm">{currentLang?.name}</span>
      </button>

      <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-xl border-2 border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                language === lang.code
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
