import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search as SearchIcon,
  Stethoscope,
  Heart,
  Pill,
  Ambulance,
  Loader2,
  X,
  Building2,
  Users,
  Shield,
  Globe,
  MapPin,
  Star,
  Phone,
  Navigation,
  Clock,
  ChevronRight,
  CircleDot,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Hospital,
  Microscope,
  Activity,
  AlertTriangle,
  PhoneCall,
  Filter,
  BookOpen,
} from 'lucide-react';
import {
  parseSearchQuery,
  getSuggestions,
  getEmergencyInfo,
  filterProviders,
  enrichProviders,
  fuzzyMatch,
  hasEmergencyIntent,
} from '../utils/searchEngine';

// ============================================================
// Mock Data
// ============================================================

const popularCities = [
  { name: 'Hyderabad', state: 'Telangana', count: '120+ providers' },
  { name: 'Bangalore', state: 'Karnataka', count: '200+ providers' },
  { name: 'Mumbai', state: 'Maharashtra', count: '350+ providers' },
  { name: 'Delhi', state: 'Delhi NCR', count: '400+ providers' },
  { name: 'Chennai', state: 'Tamil Nadu', count: '180+ providers' },
  { name: 'Pune', state: 'Maharashtra', count: '150+ providers' },
];

const popularSearches = [
  { id: 'hospitals', labelKey: 'search.popSearchHospitals', icon: Hospital, color: 'from-blue-500 to-blue-600', descKey: 'search.popSearchHospitalsDesc' },
  { id: 'pharmacies', labelKey: 'search.popSearchPharmacies', icon: Pill, color: 'from-green-500 to-emerald-600', descKey: 'search.popSearchPharmaciesDesc' },
  { id: 'ambulance', labelKey: 'search.popSearchAmbulance', icon: Ambulance, color: 'from-red-500 to-red-600', descKey: 'search.popSearchAmbulanceDesc' },
  { id: 'physicians', labelKey: 'search.popSearchPhysicians', icon: Stethoscope, color: 'from-purple-500 to-purple-600', descKey: 'search.popSearchPhysiciansDesc' },
  { id: 'specialists', labelKey: 'search.popSearchSpecialists', icon: Activity, color: 'from-indigo-500 to-indigo-600', descKey: 'search.popSearchSpecialistsDesc' },
  { id: 'womens', labelKey: 'search.popSearchWomens', icon: Heart, color: 'from-pink-500 to-rose-600', descKey: 'search.popSearchWomensDesc' },
];

const categories = [
  { id: 'hospitals', labelKey: 'search.catHospitals', icon: Hospital, descKey: 'search.catHospitalsDesc', providers: '2,400+' },
  { id: 'doctors', labelKey: 'search.catDoctors', icon: Stethoscope, descKey: 'search.catDoctorsDesc', providers: '8,500+' },
  { id: 'pharmacies', labelKey: 'search.catPharmacies', icon: Pill, descKey: 'search.catPharmaciesDesc', providers: '5,200+' },
  { id: 'ambulances', labelKey: 'search.catAmbulances', icon: Ambulance, descKey: 'search.catAmbulancesDesc', providers: '1,800+' },
  { id: 'clinics', labelKey: 'search.catClinics', icon: Microscope, descKey: 'search.catClinicsDesc', providers: '3,600+' },
  { id: 'diagnostics', labelKey: 'search.catDiagnostics', icon: Activity, descKey: 'search.catDiagnosticsDesc', providers: '1,200+' },
];

const steps = [
  { icon: MapPin, titleKey: 'search.step1Title', descKey: 'search.step1Desc', color: 'from-care-500 to-care-600' },
  { icon: Building2, titleKey: 'search.step2Title', descKey: 'search.step2Desc', color: 'from-purple-500 to-pink-500' },
  { icon: Phone, titleKey: 'search.step3Title', descKey: 'search.step3Desc', color: 'from-green-500 to-emerald-500' },
  { icon: Shield, titleKey: 'search.step4Title', descKey: 'search.step4Desc', color: 'from-blue-500 to-cyan-500' },
];

const trustBadges = [
  { icon: CheckCircle2, labelKey: 'search.badgeVerified', descKey: 'search.badgeVerifiedDesc' },
  { icon: Shield, labelKey: 'search.badgeEmergency', descKey: 'search.badgeEmergencyDesc' },
  { icon: Globe, labelKey: 'search.badgeMultiLang', descKey: 'search.badgeMultiLangDesc' },
  { icon: Sparkles, labelKey: 'search.badgeAI', descKey: 'search.badgeAIDesc' },
];

const rawProviders = [
  {
    id: '1', name: 'Apollo Hospitals', category: 'Multi-Speciality', address: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad', distance: '2.3 km', rating: 4.8, reviewCount: 1250, isOpen: true,
    hours: 'Open 24/7', phone: '+91 40 2360 7777', image: 'from-blue-600 to-blue-800',
    badge: 'NABH Accredited', isVerified: true, is24x7: true, hasEmergency: true,
    tags: ['Multi-Speciality', 'Emergency', 'Trauma', 'Cardiology', 'Neurology'],
  },
  {
    id: '2', name: 'Medicover Pharmacy', category: 'Pharmacy', address: 'Hitech City, Hyderabad',
    city: 'Hyderabad', distance: '1.5 km', rating: 4.6, reviewCount: 340, isOpen: true,
    hours: 'Open 24/7', phone: '+91 40 2311 1111', image: 'from-green-600 to-green-800',
    badge: 'Verified', isVerified: true, is24x7: true, hasEmergency: false,
    tags: ['Pharmacy', '24/7', 'Medicine', 'Online Delivery'],
  },
  {
    id: '3', name: 'KIMS Hospitals', category: 'Multi-Speciality', address: 'Secunderabad, Hyderabad',
    city: 'Hyderabad', distance: '5.8 km', rating: 4.7, reviewCount: 890, isOpen: false,
    hours: 'Opens 6:00 AM', phone: '+91 40 4488 5000', image: 'from-purple-600 to-purple-800',
    badge: 'NABH Accredited', isVerified: true, is24x7: false, hasEmergency: true,
    tags: ['Multi-Speciality', 'Emergency', 'Cardiology', 'Orthopedics'],
  },
  {
    id: '4', name: 'Yashoda Hospitals', category: 'Multi-Speciality', address: 'Somajiguda, Hyderabad',
    city: 'Hyderabad', distance: '3.1 km', rating: 4.5, reviewCount: 2100, isOpen: true,
    hours: 'Open 24/7', phone: '+91 40 4567 8000', image: 'from-indigo-600 to-indigo-800',
    badge: 'Verified', isVerified: true, is24x7: true, hasEmergency: true,
    tags: ['Multi-Speciality', 'Emergency', 'Maternity', 'Pediatrics'],
  },
  {
    id: '5', name: 'Care N Cure Clinic', category: 'Clinic', address: 'Kondapur, Hyderabad',
    city: 'Hyderabad', distance: '1.8 km', rating: 4.3, reviewCount: 156, isOpen: true,
    hours: '9:00 AM - 8:00 PM', phone: '+91 40 2301 4567', image: 'from-teal-600 to-teal-800',
    badge: 'Verified', isVerified: true, is24x7: false, hasEmergency: false,
    tags: ['Clinic', 'General Medicine', 'Pediatrics', 'GP'],
  },
  {
    id: '6', name: 'Apollo Pharmacy', category: 'Pharmacy', address: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad', distance: '2.5 km', rating: 4.4, reviewCount: 520, isOpen: false,
    hours: '8:00 AM - 10:00 PM', phone: '+91 40 2360 7788', image: 'from-green-700 to-green-900',
    badge: 'Verified', isVerified: true, is24x7: false, hasEmergency: false,
    tags: ['Pharmacy', 'Medicine', 'Wellness'],
  },
];

const demoProviders = enrichProviders(rawProviders);

const filterChips = [
  { key: 'open-now', labelKey: 'search.filterOpenNow', icon: Clock },
  { key: '24/7', labelKey: 'search.filter24h', icon: CircleDot },
  { key: 'emergency', labelKey: 'search.filterEmergency', icon: AlertTriangle },
  { key: 'verified', labelKey: 'search.filterVerified', icon: CheckCircle2 },
  { key: 'top-rated', labelKey: 'search.filterTopRated', icon: Star },
  { key: 'nearest', labelKey: 'search.filterNearest', icon: MapPin },
];

const emergencyContacts = [
  { label: 'National Emergency', number: '112', icon: Shield },
  { label: 'Ambulance', number: '108', icon: Ambulance },
  { label: 'Police', number: '100', icon: Shield },
  { label: 'Fire Brigade', number: '101', icon: AlertTriangle },
];

// ============================================================
// Sub-Components
// ============================================================

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 premium-shadow">
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-xl bg-gray-100 animate-shimmer flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-3/4 bg-gray-100 rounded-lg animate-shimmer" />
              <div className="h-4 w-1/2 bg-gray-100 rounded-lg animate-shimmer" />
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-100 rounded-lg animate-shimmer" />
                <div className="h-8 w-20 bg-gray-100 rounded-lg animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProviderCard({ provider }) {
  const { t } = useTranslation();
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 premium-shadow hover-lift overflow-hidden transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <div className={`w-full sm:w-24 h-24 rounded-xl bg-gradient-to-br ${provider.image} flex items-center justify-center flex-shrink-0`}>
          <Hospital className="w-10 h-10 text-white/80" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-semibold text-care-600 bg-care-50 px-2 py-0.5 rounded-full">{provider.category}</span>
            {provider.badge && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                provider.badge === 'NABH Accredited' ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50'
              }`}>
                {provider.badge}
              </span>
            )}
            {provider.isOpen && (
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">{t('search.openNow')}</span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-care-600 transition-colors">{provider.name}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {provider.address}
            </span>
            <span className="text-gray-300">·</span>
            <span className="font-medium text-gray-700">{provider.distance}</span>
          </div>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-900">{provider.rating}</span>
              <span className="text-xs text-gray-400">({provider.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              {provider.isOpen ? (
                <><CircleDot className="w-3 h-3 text-success" /><span className="text-xs font-medium text-success">{provider.hours}</span></>
              ) : (
                <><Clock className="w-3 h-3 text-gray-400" /><span className="text-xs font-medium text-gray-500">{provider.hours}</span></>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`tel:${provider.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-care-500 text-white text-sm font-medium hover:bg-care-600 transition-all hover:shadow-md hover:shadow-care-500/25">
              <Phone className="w-3.5 h-3.5" /> {t('search.call')}
            </a>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all">
              <Navigation className="w-3.5 h-3.5" /> {t('search.directions')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Emergency Assistance Card — shown when emergency intent is detected in the query */
function EmergencyAssistanceCard({ query }) {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in space-y-5">
      {/* Red Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-1">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{t('search.emergencyAssistance')}</h2>
              <p className="text-sm text-red-100">{t('search.emergencyDetected')}</p>
            </div>
          </div>

          {/* Emergency Numbers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {emergencyContacts.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.number}
                  href={`tel:${c.number}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-red-100">{c.label}</p>
                    <p className="text-lg font-bold text-white">{c.number}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:108"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-red-700 font-bold text-sm hover:bg-red-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              {t('search.callAmbulance')}
            </a>
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 text-white font-semibold text-sm hover:bg-white/25 border border-white/20 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              {t('search.callNational')}
            </a>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 border border-white/10 transition-all"
            >
              <MapPin className="w-4 h-4" />
              {t('search.findHospitals')}
            </button>
            <a
              href="/emergency"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 border border-white/10 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              {t('search.emergencyGuide')}
            </a>
          </div>
        </div>
      </div>

      {/* Emergency Preparedness Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5">
        <p className="text-sm text-amber-800 font-medium mb-1">{t('search.stayCalm')}</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          {t('search.stayCalmDesc')}
        </p>
      </div>
    </div>
  );
}

function NoResultsFallback({ query }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl border border-gray-100 premium-shadow-lg p-5 sm:px-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-base font-semibold text-gray-900">{t('search.needUrgentHelp')}</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {emergencyContacts.map((c) => {
            const Icon = c.icon;
            return (
              <a key={c.number} href={`tel:${c.number}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-red-50 transition-all group">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                  <Icon className="w-4 h-4 text-gray-600 group-hover:bg-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{c.label}</p>
                  <p className="text-sm font-bold text-gray-900">{c.number}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 premium-shadow-lg p-8 sm:p-10 text-center">
        <SearchIcon className="w-14 h-14 text-gray-200 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('search.noResults')}</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          {t('search.noResultsDesc')} &ldquo;<strong>{query}</strong>&rdquo;.
          {t('search.noResultsTry')}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['search.catHospitals', 'search.catDoctors', 'search.catPharmacies', 'search.catAmbulances'].map((catKey) => (
            <span key={catKey} className="px-3 py-1.5 rounded-full bg-care-50 text-care-700 text-xs font-medium">{t(catKey)}</span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {popularCities.slice(0, 4).map((city) => (
            <button key={city.name}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-care-50 hover:border-care-200 transition-all">
              <MapPin className="w-3.5 h-3.5" /> {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Page Component
// ============================================================

export default function Search() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const parsedQuery = useMemo(() => parseSearchQuery(searchQuery), [searchQuery]);
  const suggestions = useMemo(() => getSuggestions(searchQuery), [searchQuery]);
  const isEmergency = useMemo(() => hasEmergencyIntent(searchQuery), [searchQuery]);

  const filteredProviders = useMemo(() => {
    return filterProviders(demoProviders, parsedQuery, activeFilters);
  }, [parsedQuery, activeFilters]);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    setShowSuggestions(false);
    setTimeout(() => setIsSearching(false), 800);
  }, [searchQuery]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleSearch();
  }, [handleSearch]);

  const handleExampleSearch = useCallback((text) => {
    setSearchQuery(text);
    setActiveFilters([]);
    setShowSuggestions(false);
    setIsSearching(true);
    setHasSearched(true);
    setTimeout(() => setIsSearching(false), 800);
  }, []);

  const toggleFilter = useCallback((filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setShowSuggestions(false);
  }, []);

  const resetSearch = useCallback(() => {
    setHasSearched(false);
    setActiveFilters([]);
  }, []);

  const parsedInfo = useMemo(() => {
    const parts = [];
    if (parsedQuery.category) parts.push(`${t('search.parsedCategory')}: ${parsedQuery.category}`);
    if (parsedQuery.location) parts.push(`${t('search.parsedLocation')}: ${parsedQuery.location}`);
    if (parsedQuery.specialty) parts.push(`${t('search.parsedSpecialty')}: ${parsedQuery.specialty}`);
    if (isEmergency) parts.push(`⚠️ ${t('search.parsedEmergency')}`);
    return parts.join(' · ');
  }, [parsedQuery, isEmergency]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ============================================================ */}
      {/* SEARCH HEADER — Clean light design with care-blue accent */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <span>{t('search.breadcrumbHome')}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-care-600 font-medium">{t('search.breadcrumbFindCare')}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {t('search.title')}
            </h1>
            <p className="text-gray-500 mb-6 max-w-2xl">
              {t('search.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={t('search.searchPlaceholder')}
                    className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-gray-900 placeholder-slate-400 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all shadow-sm"
                  />
                  {searchQuery && (
                    <button onClick={clearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-20 animate-fade-in">
                      <div className="px-4 py-2 text-xs font-medium text-gray-400 border-b border-gray-50">{t('search.suggestions')}</div>
                      {suggestions.map((s) => (
                        <button key={s.text} onMouseDown={() => handleExampleSearch(s.text)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-care-50 transition-colors text-left">
                          <div className="w-6 h-6 rounded bg-care-50 flex items-center justify-center flex-shrink-0">
                            <SearchIcon className="w-3 h-3 text-care-500" />
                          </div>
                          <div>
                            <span className="font-medium">{s.text}</span>
                            <span className="text-xs text-gray-400 ml-2">{s.subtitle}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-semibold shadow-lg shadow-care-500/25 hover:shadow-care-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-shrink-0">
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <SearchIcon className="w-5 h-5" />}
                  {t('search.searchButton')}
                </button>
              </div>
            </div>

            {/* Search Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs text-gray-400 mr-1">{t('search.tryLabel')}</span>
              {[
                { textKey: 'search.try1', icon: Ambulance },
                { textKey: 'search.try2', icon: Hospital },
                { textKey: 'search.try3', icon: Stethoscope },
                { textKey: 'search.try4', icon: Pill },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <button key={s.textKey} onClick={() => handleExampleSearch(t(s.textKey))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-care-50 text-gray-600 hover:text-care-600 text-xs transition-all border border-transparent hover:border-care-200">
                    <Icon className="w-3 h-3" /> {t(s.textKey)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges — seamless, no border break */}
      <div className="bg-white pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.labelKey} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-care-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-care-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{t(badge.labelKey)}</p>
                    <p className="text-xs text-gray-500">{t(badge.descKey)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Cities — seamless flow */}
      <div className="bg-white pt-2 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-care-500" />
            <h2 className="text-base font-semibold text-gray-900">{t('search.popularCities')}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularCities.map((city) => (
              <button key={city.name} onClick={() => handleExampleSearch(`Hospitals in ${city.name}`)}
                className="group text-left p-3.5 rounded-xl border border-slate-100 bg-white hover:border-care-200 hover:shadow-sm hover:-translate-y-0.5 transition-all premium-shadow">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-care-600 transition-colors">{city.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{city.state}</p>
                <p className="text-xs text-care-500 font-medium mt-1.5">{city.count}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-400 mr-1">{t('search.filters')}</span>
          {filterChips.map((chip) => {
            const Icon = chip.icon;
            const isActive = activeFilters.includes(chip.key);
            return (
              <button key={chip.key} onClick={() => toggleFilter(chip.key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive ? 'bg-care-500 text-white shadow-sm shadow-care-500/25' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}>
                <Icon className="w-3.5 h-3.5" /> {t(chip.labelKey)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isSearching && <LoadingSkeleton />}

        {/* ============================================================ */}
        {/* CRITICAL LOGIC ORDER:
            1. EMERGENCY INTENT → show EmergencyAssistanceCard (NO no-results)
            2. PROVIDERS FOUND → show provider cards
            3. NO RESULTS → show NoResultsFallback
        */}
        {/* ============================================================ */}
        {!isSearching && hasSearched && (
          <div className="animate-fade-in space-y-5">
            {/* Parsed query info */}
            {parsedInfo && (
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-care-500" />                    <span>{t('search.smartSearchDetected')} {parsedInfo}</span>
              </div>
            )}

            {/* STEP 1: Emergency intent detected — show Emergency Assistance Card ONLY */}
            {isEmergency && (
              <EmergencyAssistanceCard query={searchQuery} />
            )}

            {/* STEP 2: No emergency, but providers found — show provider cards */}
            {!isEmergency && filteredProviders.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {parsedQuery.category
                        ? `${parsedQuery.category.charAt(0).toUpperCase() + parsedQuery.category.slice(1)}s`
                        : t('search.results')} {parsedQuery.location ? `${t('common.in')} ${parsedQuery.location}` : ''}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {filteredProviders.length} {filteredProviders.length === 1 ? t('search.resultFound') : t('search.resultsFound')}
                      {activeFilters.length > 0 ? ` ${t('search.withFilters')}` : ''}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredProviders.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                    <p className="text-sm text-amber-700 font-medium">
                      {t('search.demoPreview')}
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      {t('search.demoPreviewDesc')}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* STEP 3: No emergency, no providers — show NoResultsFallback */}
            {!isEmergency && filteredProviders.length === 0 && (
              <NoResultsFallback query={searchQuery} />
            )}
          </div>
        )}

        {/* Default browsing state */}
        {!isSearching && !hasSearched && (
          <div className="space-y-12 animate-fade-in">
            <section>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-5 h-5 text-care-500" />
                <h2 className="text-lg font-semibold text-gray-900">{t('search.popularSearches')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {popularSearches.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => handleExampleSearch(t(item.labelKey))}
                      className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 premium-shadow hover-lift text-left">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-care-600 transition-colors">{t(item.labelKey)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t(item.descKey)}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-care-400 ml-auto transition-colors" />
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-5">
                <Building2 className="w-5 h-5 text-care-500" />
                <h2 className="text-lg font-semibold text-gray-900">{t('search.healthcareCategories')}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.id} onClick={() => handleExampleSearch(`${t(cat.labelKey)} in Hyderabad`)}
                      className="group p-4 bg-white rounded-xl border border-gray-100 premium-shadow hover-lift text-center">
                      <div className="w-10 h-10 rounded-xl bg-care-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-care-100 transition-colors">
                        <Icon className="w-5 h-5 text-care-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-care-600 transition-colors">{t(cat.labelKey)}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{t(cat.descKey)}</p>
                      <p className="text-xs text-care-500 font-medium mt-2">{cat.providers} {t('common.providers')}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 premium-shadow-lg p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('search.howItWorks')}</h2>
                <p className="text-sm text-gray-500 max-w-lg mx-auto">{t('search.howItWorksDesc')}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.titleKey} className="text-center group">
                      <div className="relative inline-flex mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">{i + 1}</div>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{t(step.titleKey)}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{t(step.descKey)}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-care-500" />
                  <h2 className="text-lg font-semibold text-gray-900">{t('search.featuredProviders')}</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demoProviders.slice(0, 4).map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
              <div className="mt-6 bg-gradient-to-br from-care-50 to-blue-50 rounded-2xl border border-care-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t('search.providerCta')}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t('search.providerCtaDesc')}</p>
                </div>
                <a href="/partner"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-care-500 text-white text-sm font-medium hover:bg-care-600 transition-colors flex-shrink-0">
                  {t('search.registerInterest')} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Floating Emergency Button */}
      <a href="/emergency" aria-label="Emergency help"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1 transition-all duration-300 animate-float">
        <Shield className="w-5 h-5" />
        <span className="text-sm">{t('search.emergencyHelp')}</span>
      </a>

      {/* Mobile waitlist button */}
      <div className="fixed bottom-6 left-6 z-40 block sm:hidden">
        <a href="/waitlist"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-care-500 text-white text-sm font-medium shadow-lg shadow-care-500/30">
          <Users className="w-4 h-4" /> {t('footer.joinWaitlist')}
        </a>
      </div>
    </div>
  );
}
