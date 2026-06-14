import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../i18n/config';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-care-600 hover:bg-care-50 transition-all duration-200"
        aria-label="Switch language"
        title={currentLang.label}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline text-xs uppercase font-semibold">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-50 animate-fade-in">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-3 px-3 py-3 text-sm transition-colors text-left ${
                lang.code === i18n.language
                  ? 'bg-care-50 text-care-700'
                  : 'text-gray-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-base flex-shrink-0">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <span className="block font-medium truncate">{lang.nativeLabel}</span>
                <span className="block text-xs text-gray-400 truncate">{lang.label}</span>
              </div>
              {lang.code === i18n.language && (
                <Check className="w-4 h-4 text-care-500 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
