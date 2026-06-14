import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Stethoscope, Search, MessageSquare, Shield, HeartPulse, Users } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isRtl = i18n.dir() === 'rtl';

  // i18n keys only — t() is called in JSX during render so language changes always produce fresh labels
  const navLinks = [
    { to: '/', i18nKey: 'navbar.home', icon: HeartPulse },
    { to: '/search', i18nKey: 'navbar.findCare', icon: Search },
    { to: '/assistant', i18nKey: 'navbar.aiAssistant', icon: MessageSquare },
    { to: '/emergency', i18nKey: 'navbar.emergency', icon: Shield },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
          : isHomePage
          ? 'bg-transparent'
          : 'bg-white/80 backdrop-blur-xl'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-care-500 to-care-700 flex items-center justify-center shadow-lg shadow-care-500/20 group-hover:shadow-care-500/30 transition-all duration-300 group-hover:scale-105">
              <Stethoscope className="w-5 h-5 lg:w-5.5 lg:h-5.5 text-white" />
            </div>
            <span className="text-lg lg:text-xl font-bold text-gray-900 whitespace-nowrap">
              Care<span className="text-care-600">Roam</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 flex-nowrap">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 xl -4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-care-50 text-care-700 shadow-sm'
                      : 'text-gray-600 hover:text-care-600 hover:bg-care-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(link.i18nKey)}
                </Link>
              );
            })}
            <div className="flex-shrink-0">
              <LanguageSwitcher />
            </div>
            <Link
              to="/waitlist"
              className="ml-1 inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-xl bg-care-500 text-white text-sm font-semibold hover:bg-care-600 hover:shadow-lg hover:shadow-care-500/25 transition-all duration-200 whitespace-nowrap flex-shrink-0"
            >
              <Users className="w-4 h-4" />
              {t('navbar.joinWaitlist')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1 lg:hidden flex-shrink-0">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isHomePage && !scrolled
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-care-600 hover:bg-care-50'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-care-50 text-care-700'
                    : 'text-gray-700 hover:text-care-600 hover:bg-care-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {t(link.i18nKey)}
              </Link>
            );
          })}
          <Link
            to="/waitlist"
            className="flex items-center justify-center gap-2 mt-3 px-4 py-3 rounded-xl bg-care-500 text-white text-sm font-semibold hover:bg-care-600 transition-colors whitespace-nowrap"
          >
            <Users className="w-5 h-5" />
            {t('navbar.joinWaitlist')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
