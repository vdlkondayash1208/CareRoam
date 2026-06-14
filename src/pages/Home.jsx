import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { subscribeInterviewCount, firestoreAvailable } from '../firebase/interviewService';
import {
  Search,
  Shield,
  MessageSquare,
  Languages,
  Building2,
  ArrowRight,
  MapPin,
  Users,
  HeartPulse,
  ChevronDown,
  Check,
  X,
  Star,
  Ambulance,
  Stethoscope,
  Globe,
  Lock,
  Award,
  Sparkles,
  Quote,
  Mail,
  Target,
  ArrowUpRight,
  Menu,
} from 'lucide-react';

// ============================================================
// Hooks
// ============================================================

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ============================================================
// Components
// ============================================================

function TrustBadge({ icon: Icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover-lift">
      <Icon className="w-4 h-4 text-care-600" />
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  );
}

function PhoneMockup({ gradient, icon: Icon, title, description }) {
  return (
    <div className="phone-frame mx-auto">
      <div className={`phone-screen ${gradient} p-5 flex flex-col justify-between`}>
        {/* Status bar */}
        <div className="flex items-center justify-between text-white/80 text-[10px] font-medium px-1">
          <span>9 </span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 border border-white/60 rounded-[1px]" />
            <div className="w-3 h-2 border border-white/60 rounded-[1px]" />
          </div>
        </div>

        {/* App content */}
        <div className="flex-1 flex flex-col items-center justify-center text-white px-2">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white text-center mb-2">{title}</h3>
          <p className="text-xs text-white/80 text-center leading-relaxed">{description}</p>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-1">
          <div className="w-28 h-1 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-2 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-900 group-hover:text-care-600 transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-80 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed px-2">{answer}</p>
      </div>
    </div>
  );
}

// ============================================================
// Data
// ============================================================

const features = [
  {
    icon: Search,
    titleKey: 'home.feature1',
    descKey: 'home.feature1Desc',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MessageSquare,
    titleKey: 'home.feature2',
    descKey: 'home.feature2Desc',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Languages,
    titleKey: 'home.feature3',
    descKey: 'home.feature3Desc',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    titleKey: 'home.feature4',
    descKey: 'home.feature4Desc',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Building2,
    titleKey: 'home.feature5',
    descKey: 'home.feature5Desc',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Globe,
    titleKey: 'home.feature6',
    descKey: 'home.feature6Desc',
    color: 'from-teal-500 to-cyan-500',
  },
];

const comparisonData = [
  { feature: 'Verified healthcare providers', i18nKey: 'home.compRow1', maps: false, care: true },
  { feature: 'Real-time bed availability', i18nKey: 'home.compRow2', maps: false, care: true },
  { feature: 'Multi-language medical phrases', i18nKey: 'home.compRow3', maps: false, care: true },
  { feature: 'Direct doctor booking', i18nKey: 'home.compRow4', maps: false, care: true },
  { feature: 'Emergency coordination', i18nKey: 'home.compRow5', maps: false, care: true },
  { feature: 'Insurance compatibility check', i18nKey: 'home.compRow6', maps: false, care: true },
  { feature: 'Navigation to facility', i18nKey: 'home.compRow7', maps: true, care: true },
  { feature: 'Restaurant & business reviews', i18nKey: 'home.compRow8', maps: true, care: false },
];

const faqData = [
  { questionKey: 'faq.q1', answerKey: 'faq.a1' },
  { questionKey: 'faq.q2', answerKey: 'faq.a2' },
  { questionKey: 'faq.q3', answerKey: 'faq.a3' },
  { questionKey: 'faq.q4', answerKey: 'faq.a4' },
  { questionKey: 'faq.q5', answerKey: 'faq.a5' },
  { questionKey: 'faq.q6', answerKey: 'faq.a6' },
  { questionKey: 'faq.q7', answerKey: 'faq.a7' },
];

const founderStory = {
  nameKey: 'home.founderName',
  titleKey: 'home.founderRole',
  storyKey: 'home.founderStory',
  missionKey: 'home.founderMission',
};

// ============================================================
// Main Page Component
// ============================================================

export default function Home() {
  console.log("Home loaded");
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [validationInterviews, setValidationInterviews] = useState(0);

  useScrollReveal();

  // Listen for real-time interview count from Firestore
  useEffect(() => {
    const unsub = subscribeInterviewCount(
      (data) => {
        console.log('Home page received update — validationInterviews:', data.validationInterviews);
        setValidationInterviews(data.validationInterviews);
      },
      () => {},
    );
    return unsub;
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = useCallback((index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#071028' }}>
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #071028 0%, #0F2E73 50%, #2563EB 100%)',
            }}
          />
          {/* Healthcare-travel themed illustration layer — increased visibility */}
          <div className="absolute inset-0 opacity-[0.14]">
            <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              {/* India route/travel path network */}
              <path d="M150,250 Q350,150 550,300 Q750,450 950,250 Q1150,100 1300,350" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
              <path d="M100,450 Q300,350 500,500 Q700,650 900,450 Q1100,300 1350,500" fill="none" stroke="#bfdbfe" strokeWidth="1.2" opacity="0.4" />
              <path d="M250,120 Q450,80 650,220 Q850,360 1050,200" fill="none" stroke="#93c5fd" strokeWidth="1.2" opacity="0.5" strokeDasharray="8,10" />
              <path d="M200,650 Q400,550 600,680 Q800,800 1000,650" fill="none" stroke="#bfdbfe" strokeWidth="1" opacity="0.3" />

              {/* Traveler silhouette — person with backpack walking */}
              <g transform="translate(180, 350)" opacity="0.55">
                {/* Head */}
                <circle cx="20" cy="8" r="7" fill="#bfdbfe" />
                {/* Body */}
                <path d="M13,17 L27,17 L29,40 L11,40 Z" fill="#93c5fd" />
                {/* Backpack */}
                <rect x="24" y="16" width="7" height="18" rx="2" fill="#bfdbfe" opacity="0.6" />
                {/* Legs */}
                <path d="M14,40 L11,58" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M26,40 L29,58" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
                {/* Arm */}
                <path d="M13,20 L8,30" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
                <path d="M27,20 L32,28" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Hospital building */}
              <g transform="translate(620, 200)" opacity="0.5">
                {/* Building body */}
                <rect x="0" y="15" width="45" height="50" rx="2" fill="#93c5fd" opacity="0.4" />
                {/* Roof */}
                <rect x="-2" y="12" width="49" height="5" rx="1" fill="#bfdbfe" opacity="0.5" />
                {/* Cross on building */}
                <rect x="18" y="20" width="9" height="22" rx="1.5" fill="#bfdbfe" />
                <rect x="13" y="27" width="19" height="8" rx="1.5" fill="#bfdbfe" />
                {/* Windows */}
                <rect x="5" y="35" width="8" height="6" rx="1" fill="white" opacity="0.3" />
                <rect x="32" y="35" width="8" height="6" rx="1" fill="white" opacity="0.3" />
                <rect x="5" y="46" width="8" height="6" rx="1" fill="white" opacity="0.3" />
                <rect x="32" y="46" width="8" height="6" rx="1" fill="white" opacity="0.3" />
                {/* Door */}
                <rect x="15" y="52" width="15" height="13" rx="1" fill="#bfdbfe" opacity="0.4" />
              </g>

              {/* Ambulance vehicle */}
              <g transform="translate(920, 480)" opacity="0.5">
                {/* Main body */}
                <rect x="0" y="12" width="65" height="24" rx="4" fill="#93c5fd" opacity="0.5" />
                {/* Cabin (front) */}
                <path d="M40,12 L40,5 L50,5 L55,12 Z" fill="#bfdbfe" opacity="0.5" />
                {/* Cross on ambulance */}
                <rect x="22" y="17" width="4" height="12" rx="1" fill="#bfdbfe" />
                <rect x="18" y="21" width="12" height="4" rx="1" fill="#bfdbfe" />
                {/* Wheels */}
                <circle cx="15" cy="38" r="6" fill="#93c5fd" opacity="0.6" />
                <circle cx="15" cy="38" r="3" fill="#bfdbfe" opacity="0.4" />
                <circle cx="50" cy="38" r="6" fill="#93c5fd" opacity="0.6" />
                <circle cx="50" cy="38" r="3" fill="#bfdbfe" opacity="0.4" />
                {/* Flashing light */}
                <rect x="42" y="3" width="6" height="4" rx="1" fill="#fda4af" opacity="0.7" />
              </g>

              {/* Doctor figure — with stethoscope */}
              <g transform="translate(1050, 300)" opacity="0.5">
                {/* Head */}
                <circle cx="15" cy="7" r="7" fill="#bfdbfe" />
                {/* Body (lab coat) */}
                <path d="M8,16 L22,16 L24,45 L6,45 Z" fill="#93c5fd" opacity="0.5" />
                {/* Coat lapels */}
                <path d="M15,16 L15,28" stroke="white" strokeWidth="1" opacity="0.3" />
                {/* Stethoscope */}
                <path d="M10,18 Q5,22 7,25 Q9,28 12,26" fill="none" stroke="#bfdbfe" strokeWidth="1.5" />
                <circle cx="12" cy="26" r="3" fill="none" stroke="#bfdbfe" strokeWidth="1" />
                {/* Legs */}
                <path d="M10,45 L8,58" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20,45 L22,58" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
                {/* Medical cross on chest */}
                <rect x="13" y="19" width="4" height="10" rx="1" fill="#bfdbfe" opacity="0.6" />
                <rect x="10" y="22" width="10" height="4" rx="1" fill="#bfdbfe" opacity="0.6" />
              </g>

              {/* Second traveler (sitting/resting) */}
              <g transform="translate(480, 480)" opacity="0.4">
                <circle cx="15" cy="5" r="6" fill="#bfdbfe" />
                <path d="M9,13 L21,13 L19,35 L11,35 Z" fill="#93c5fd" opacity="0.4" />
                <path d="M11,30 L8,45" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
                <path d="M19,30 L22,45" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
                <path d="M6,18 Q0,22 -3,15" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
                {/* Simple bag next to them */}
                <rect x="-8" y="22" width="8" height="10" rx="2" fill="#bfdbfe" opacity="0.3" />
              </g>

              {/* Map pin markers */}
              <g transform="translate(300, 280)" opacity="0.65">
                <path d="M0,0 C0,-22 18,-36 36,-36 C54,-36 72,-22 72,0 C72,28 36,54 36,54 C36,54 0,28 0,0Z" fill="#93c5fd" />
                <circle cx="36" cy="-6" r="9" fill="white" opacity="0.8" />
              </g>
              <g transform="translate(700, 330)" opacity="0.55">
                <path d="M0,0 C0,-22 18,-36 36,-36 C54,-36 72,-22 72,0 C72,28 36,54 36,54 C36,54 0,28 0,0Z" fill="#93c5fd" />
                <circle cx="36" cy="-6" r="9" fill="white" opacity="0.8" />
              </g>
              <g transform="translate(1050, 280)" opacity="0.65">
                <path d="M0,0 C0,-22 18,-36 36,-36 C54,-36 72,-22 72,0 C72,28 36,54 36,54 C36,54 0,28 0,0Z" fill="#93c5fd" />
                <circle cx="36" cy="-6" r="9" fill="white" opacity="0.8" />
              </g>

              {/* Medical cross symbols */}
              <g transform="translate(550, 500)" opacity="0.45">
                <rect x="-8" y="-24" width="16" height="48" rx="3" fill="#93c5fd" />
                <rect x="-24" y="-8" width="48" height="16" rx="3" fill="#93c5fd" />
              </g>
              <g transform="translate(850, 200)" opacity="0.4">
                <rect x="-6" y="-18" width="12" height="36" rx="2" fill="#bfdbfe" />
                <rect x="-18" y="-6" width="36" height="12" rx="2" fill="#bfdbfe" />
              </g>

              {/* Heartbeat line */}
              <path d="M200,600 L250,600 L270,580 L290,620 L310,560 L330,640 L350,600 L400,600" fill="none" stroke="#f9a8d4" strokeWidth="2" opacity="0.45" />

              {/* City markers */}
              <circle cx="300" cy="280" r="5" fill="#93c5fd" opacity="0.7" />
              <circle cx="450" cy="180" r="3.5" fill="#93c5fd" opacity="0.5" />
              <circle cx="700" cy="330" r="5" fill="#93c5fd" opacity="0.7" />
              <circle cx="850" cy="220" r="3.5" fill="#93c5fd" opacity="0.5" />
              <circle cx="1050" cy="280" r="5" fill="#93c5fd" opacity="0.7" />
              <circle cx="1200" cy="150" r="3.5" fill="#93c5fd" opacity="0.5" />
              <circle cx="550" cy="390" r="3" fill="#93c5fd" opacity="0.4" />
              <circle cx="850" cy="400" r="3" fill="#93c5fd" opacity="0.4" />

              {/* Decorative rings */}
              <g opacity="0.12">
                <circle cx="100" cy="100" r="24" fill="none" stroke="#93c5fd" strokeWidth="0.8" />
                <circle cx="1340" cy="820" r="35" fill="none" stroke="#93c5fd" strokeWidth="0.8" />
                <circle cx="120" cy="820" r="18" fill="none" stroke="#93c5fd" strokeWidth="0.8" />
              </g>
            </svg>
          </div>
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Glow orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-care-400/[0.06] rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-care-300/[0.06] rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-care-400/[0.04] rounded-full blur-2xl" />
        </div>

        {/* Soft radial blue glow behind the headline */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-care-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-care-500/10 border border-care-500/20 text-care-300 text-sm font-medium mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              {t('home.heroBadge')}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t('home.headline1')}
              <br />
              <span className="bg-gradient-to-r from-care-300 via-care-400 to-care-300 bg-clip-text text-transparent">
                {t('home.headline2')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('home.subheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/waitlist"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-semibold text-lg shadow-xl shadow-care-500/25 hover:shadow-2xl hover:shadow-care-500/40 hover:-translate-y-0.5 transition-all duration-300 animate-pulse-glow"
              >
                <Users className="w-5 h-5" />
                {t('home.ctaWaitlist')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm text-white font-semibold text-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                {t('home.ctaSeeHow')}
              </Link>
            </div>

            {/* Validation-Stage Metrics — improved glassmorphism */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                {              value: validationInterviews,
                labelKey: 'home.metric1Label', descKey: 'home.metric1Desc' },
                { value: t('home.metric2Value'), labelKey: 'home.metric2Label', descKey: 'home.metric2Desc' },
                { value: t('home.metric3Value'), labelKey: 'home.metric3Label', descKey: 'home.metric3Desc' },
                { value: t('home.metric4Value'), labelKey: 'home.metric4Label', descKey: 'home.metric4Desc' },
              ].map((stat) => (
                <div
                  key={stat.labelKey}
                  className="text-center p-4 rounded-xl backdrop-blur-md bg-white/[0.08] border border-white/[0.15] hover:bg-white/[0.12] transition-colors"
                >
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-care-300 to-care-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-300 font-medium mt-1">{t(stat.labelKey)}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t(stat.descKey)}</div>
                </div>
              ))}
            </div>

            {!firestoreAvailable && (
              <p className="mt-4 text-xs text-amber-400/70 flex items-center justify-center gap-1">
                Firestore not configured. Counter unavailable.
              </p>
            )}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </section>

      {/* ============================================================ */}
      {/* 2. TRUST BADGES */}
      {/* ============================================================ */}
      <section className="relative -mt-16 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 reveal">
            <TrustBadge icon={Sparkles} text={t('home.badge1')} />
            <TrustBadge icon={Users} text={t('home.badge2')} />
            <TrustBadge icon={MessageSquare} text={t('home.badge3')} />
            <TrustBadge icon={HeartPulse} text={t('home.badge4')} />
            <TrustBadge icon={Star} text={t('home.badge5')} />
            <TrustBadge icon={Target} text={t('home.badge6')} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PROBLEM WE SOLVE */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 premium-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Problem */}
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-care-50 text-care-700 text-xs font-medium mb-5">
                <Target className="w-3 h-3" />
                {t('home.problemLabel')}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-6">
                {t('home.problemTitle')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t('home.problemDesc')}
              </p>

              <div className="space-y-4">
                {[
                  { stat: t('home.stat1'), text: t('home.stat1Text') },
                  { stat: t('home.stat2'), text: t('home.stat2Text') },
                  { stat: t('home.stat3'), text: t('home.stat3Text') },
                ].map((item) => (
                  <div key={item.stat} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 premium-shadow">
                    <span className="text-2xl font-bold text-care-600 flex-shrink-0 w-16">{item.stat}</span>
                    <p className="text-sm text-gray-600 pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Solution preview */}
            <div className="relative reveal reveal-delay-2">
              <div className="relative z-10">
                <PhoneMockup
                  gradient="bg-gradient-to-br from-care-600 to-care-900"
                  icon={Stethoscope}
                  title={t('home.phoneMockupTitle')}
                  description={t('home.phoneMockupDesc')}
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-care-500/5 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-48 h-48 bg-care-400/5 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WHY CAREROAM VS GOOGLE MAPS */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-care-50 text-care-700 text-xs font-medium mb-5">
              <Star className="w-3 h-3" />
              {t('home.comparisonLabel')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-4">
              {t('home.comparisonTitle')}{' '}
              <span className="text-care-600">{t('home.comparisonTitleHighlight')}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.comparisonDesc')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto reveal">
            {/* Comparison Table */}
            <div className="bg-white rounded-2xl border border-gray-100 premium-shadow-lg overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 p-5 bg-gradient-to-r from-care-50 to-blue-50 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-600">{t('home.comparisonFeature')}</div>
                <div className="text-sm font-semibold text-gray-400 text-center">{t('home.comparisonGoogle')}</div>
                <div className="text-sm font-semibold text-care-700 text-center">{t('home.comparisonCare')}</div>
              </div>

              {/* Rows */}
              {comparisonData.map((row, i) => (
                <div
                  key={row.i18nKey}
                  className={`grid grid-cols-3 gap-4 p-5 items-center ${
                    i < comparisonData.length - 1 ? 'border-b border-gray-50' : ''
                  } hover:bg-slate-50/50 transition-colors`}
                >
                  <div className="text-sm font-medium text-gray-700">{t(row.i18nKey)}</div>
                  <div className="flex justify-center">
                    {row.maps ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.care ? (
                      <div className="w-6 h-6 rounded-full bg-care-500 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    ) : (
                      <X className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 text-center mt-6">
              {t('home.comparisonNote')}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PRODUCT SCREENSHOTS / MOCKUPS */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-care-50 text-care-700 text-xs font-medium mb-5">
              <Sparkles className="w-3 h-3" />
              {t('home.productLabel')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-4">
              {t('home.productTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.productDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Mockup 1: Search */}
            <div className="reveal reveal-delay-1">
              <PhoneMockup
                gradient="bg-gradient-to-br from-slate-900 to-care-900"
                icon={Search}
                title={t('home.mockup1Title')}
                description={t('home.mockup1Desc')}
              />
              <p className="text-center text-sm font-medium text-gray-700 mt-4">{t('home.mockup1Label')}</p>
              <p className="text-center text-xs text-gray-500">{t('home.mockup1Sub')}</p>
            </div>

            {/* Mockup 2: Translator */}
            <div className="reveal reveal-delay-2">
              <PhoneMockup
                gradient="bg-gradient-to-br from-emerald-700 to-teal-900"
                icon={Languages}
                title={t('home.mockup2Title')}
                description={t('home.mockup2Desc')}
              />
              <p className="text-center text-sm font-medium text-gray-700 mt-4">{t('home.mockup2Label')}</p>
              <p className="text-center text-xs text-gray-500">{t('home.mockup2Sub')}</p>
            </div>

            {/* Mockup 3: Emergency */}
            <div className="reveal reveal-delay-3">
              <PhoneMockup
                gradient="bg-gradient-to-br from-red-600 to-red-900"
                icon={Ambulance}
                title={t('home.mockup3Title')}
                description={t('home.mockup3Desc')}
              />
              <p className="text-center text-sm font-medium text-gray-700 mt-4">{t('home.mockup3Label')}</p>
              <p className="text-center text-xs text-gray-500">{t('home.mockup3Sub')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. WHAT WE'RE BUILDING (Features) */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.03),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-care-50 text-care-700 text-xs font-medium mb-5">
              <Building2 className="w-3 h-3" />
              {t('home.featuresLabel')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-4">
              {t('home.featuresTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.featuresDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.titleKey}
                  className="group bg-white rounded-2xl p-7 border border-gray-100 premium-shadow hover-lift reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover -3 transition-all duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{t(feature.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FOUNDER STORY */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 premium-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-care-50 text-care-700 text-xs font-medium mb-5">
                <Quote className="w-3 h-3" />
                {t('home.founderLabel')}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-4">
                {t('home.founderTitle')}
              </h2>
            </div>

            <div className="reveal">
              <div className="bg-gradient-to-br from-slate-50 to-care-50/30 rounded-3xl p-8 lg:p-12 border border-gray-100 premium-shadow-lg relative overflow-hidden">
                {/* Quote mark */}
                <div className="absolute -top-6 -left-6 text-8xl text-care-500/10 leading-none font-serif">
                  &ldquo;
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start">
                  {/* Founder avatar placeholder */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-care-500 to-care-700 flex items-center justify-center shadow-lg shadow-care-500/20">
                      <span className="text-2xl font-bold text-white">VY</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                      &ldquo;{t(founderStory.storyKey)}&rdquo;
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-8">{t(founderStory.missionKey)}</p>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-900">{t(founderStory.nameKey)}</p>
                        <p className="text-sm text-gray-500">{t(founderStory.titleKey)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FAQ */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-care-50 text-care-700 text-xs font-medium mb-5">
              <MessageSquare className="w-3 h-3" />
              {t('faq.label')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-4">
              {t('faq.title')}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 premium-shadow-lg px-6 reveal" role="region" aria-label={t('faq.label')}>
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={t(faq.questionKey)}
                answer={t(faq.answerKey)}
                isOpen={openFaqIndex === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. FINAL CTA */}
      {/* ============================================================ */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-950">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-care-950" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-care-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-care-500/10 border border-care-500/20 text-care-300 text-sm font-medium mb-8">
              <Users className="w-4 h-4" />
              {t('home.finalCtaBadge')}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-6">
              {t('home.finalCtaTitle')}
            </h2>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('home.finalCtaDesc')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/waitlist"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-semibold text-lg shadow-xl shadow-care-500/25 hover:shadow-2xl hover:shadow-care-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                {t('home.finalCtaWaitlist')}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/feedback"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm text-white font-semibold text-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5" />
                {t('home.finalCtaFeedback')}
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> {t('home.finalSocialEmail')}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {t('home.finalSocialLocation')}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> {t('home.finalSocialStatus')}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
