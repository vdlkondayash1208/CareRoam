import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Heart,
  Stethoscope,
  Mail,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react';

const socialLinks = [
  {
    href: 'mailto:vdlkondayash1208@gmail.com',
    icon: Mail,
    label: 'Email',
    hoverColor: 'hover:bg-blue-500/20 hover:text-blue-400',
  },
  {
    href: 'https://linkedin.com/in/your-profile',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
    hoverColor: 'hover:bg-blue-600/20 hover:text-blue-500',
  },
  {
    href: 'https://github.com/your-profile',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    hoverColor: 'hover:bg-gray-500/20 hover:text-gray-200',
  },
  {
    href: 'https://x.com/your-profile',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: 'X/Twitter',
    hoverColor: 'hover:bg-white/10 hover:text-white',
  },
];

const quickLinks = [
  { to: '/', labelKey: 'footer.home' },
  { to: '/search', labelKey: 'footer.findHealthcare' },
  { to: '/assistant', labelKey: 'footer.aiHealthAssistant' },
  { to: '/emergency', labelKey: 'footer.emergencyHelp' },
  { to: '/language', labelKey: 'footer.languageSupport' },
  { to: '/waitlist', labelKey: 'footer.joinWaitlist' },
];

const resourceLinks = [
  { to: '/partner', labelKey: 'footer.partnerWithUs' },
  { to: '/feedback', labelKey: 'footer.shareFeedback' },
  { to: '/', labelKey: 'footer.faq' },
  { to: '/investor', labelKey: 'footer.investorOverview' },
  { to: '/founder', labelKey: 'footer.founderDashboard' },
  { to: '/contact', labelKey: 'footer.contactUs' },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #061428 0%, #0B1D3A 100%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-care-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* ============================================================ */}
        {/* MAIN 4-COLUMN GRID */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ---------- COLUMN 1: BRAND ---------- */}
          <div className="space-y-5">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-care-500 to-care-700 flex items-center justify-center shadow-lg shadow-care-500/20 group-hover:shadow-care-500/40 group-hover:scale-105 transition-all duration-300">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Care<span className="text-care-400">Roam</span>
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {t('footer.brandDesc')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-200 ${social.hoverColor} focus:outline-none focus:ring-2 focus:ring-care-400/50 focus:ring-offset-2 focus:ring-offset-[#061428]`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ---------- COLUMN 2: QUICK LINKS ---------- */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.12em] mb-5">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to + link.labelKey}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                  >
                    <span className="w-1 h-1 rounded-full bg-care-400/0 group-hover:bg-care-400 transition-all duration-200" />
                    <span>{t(link.labelKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- COLUMN 3: RESOURCES ---------- */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.12em] mb-5">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to + link.labelKey}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                  >
                    <span className="w-1 h-1 rounded-full bg-care-400/0 group-hover:bg-care-400 transition-all duration-200" />
                    <span>{t(link.labelKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- COLUMN 4: CONTACT ---------- */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.12em] mb-5">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              {/* Phone */}
              <li>
                <a
                  href="tel:+919440584274"
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-care-500/10 border border-care-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-care-500/20 group-hover:border-care-500/30 transition-all duration-200">
                    <Phone className="w-3.5 h-3.5 text-care-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                      {t('footer.phone')}
                    </span>
                    <span className="block text-slate-300 group-hover:text-white transition-colors">
                      +91 9440584274
                    </span>
                  </div>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:vdlkondayash1208@gmail.com"
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-care-500/10 border border-care-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-care-500/20 group-hover:border-care-500/30 transition-all duration-200">
                    <Mail className="w-3.5 h-3.5 text-care-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                      {t('common.emailAddress')}
                    </span>
                    <span className="block text-slate-300 group-hover:text-white transition-colors break-all">
                      vdlkondayash1208@gmail.com
                    </span>
                  </div>
                </a>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-care-500/10 border border-care-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-care-400" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    {t('footer.location')}
                  </span>
                  <span className="block text-slate-300">
                    Hyderabad, Telangana, India
                  </span>
                </div>
              </li>

              {/* Support Availability */}
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-care-500/10 border border-care-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-care-400" />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                    {t('footer.supportAvailability')}
                  </span>
                  <span className="block text-slate-300">
                    {t('footer.supportHours')}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM BAR */}
        {/* ============================================================ */}
        <div className="mt-14 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-slate-500">
              &copy; {year} CareRoam. {t('footer.rights')}
            </p>

            {/* Tagline */}
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              {t('footer.madeWith')}
              <Heart className="w-3 h-3 text-red-400 fill-red-400 animate-pulse" />
              {t('footer.forTravelers')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
