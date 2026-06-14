import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Shield, MapPin, Copy, Check, Search, AlertTriangle, ChevronRight } from 'lucide-react';
import { emergencyContacts } from '../data/sampleData';

const categoryConfig = {
  national: { labelKey: 'emergency.catNational', color: 'bg-red-100 text-red-700 border-red-200' },
  medical: { labelKey: 'emergency.catMedical', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  safety: { labelKey: 'emergency.catSafety', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  support: { labelKey: 'emergency.catSupport', color: 'bg-green-100 text-green-700 border-green-200' },
};

export default function Emergency() {
  const { t } = useTranslation();
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const copyNumber = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return emergencyContacts;
    const q = searchQuery.toLowerCase();
    return emergencyContacts.filter(
      (c) =>
        c.service.toLowerCase().includes(q) ||
        c.number.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.category && c.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{t('emergency.title')}</h1>
              <p className="text-red-100 text-sm sm:text-base">{t('emergency.subtitle')}</p>
            </div>
            <div className="flex-shrink-0">
              <div className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-center">
                <p className="text-xs text-red-200 uppercase tracking-wider font-medium">{t('emergency.nationalEmergency')}</p>
                <p className="text-2xl font-bold tracking-wider">112</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column — Emergency Contacts (70%) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header with search */}
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-red-500" />
                    {t('common.allEmergencyContacts')}
                  </h2>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('emergency.searchPlaceholder') || 'Search by service or number...'}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-red-300 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Contacts List */}
              <div className="divide-y divide-gray-100">
                {filteredContacts.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <p className="text-sm text-gray-400">{t('common.noResults')}</p>
                  </div>
                ) : (
                  filteredContacts.map((contact) => {
                    const cat = categoryConfig[contact.category] || categoryConfig.support;
                    return (
                      <div key={contact.service} className="px-5 py-3.5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-sm font-medium text-gray-900">{contact.service}</p>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${cat.color}`}>
                                {t(cat.labelKey)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{contact.description}</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="text-base font-bold text-gray-900 tabular-nums min-w-[80px] text-right">{contact.number}</span>
                            <button
                              onClick={() => copyNumber(contact.number)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                              title={t('language.copyPhrase')}
                            >
                              {copiedNumber === contact.number ? (
                                <Check className="w-3.5 h-3.5 text-green-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-gray-400" />
                              )}
                            </button>
                            <a
                              href={`tel:${contact.number}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              {t('emergency.callNow')}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                {t('emergency.importantInfo')}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('emergency.importantInfoDesc')}
              </p>
            </div>
          </div>

          {/* Right Column — Safety Tips & Quick Links (30%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Safety Tips */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-red-500" />
                {t('emergency.emergencyTips')}
              </h3>
              <ul className="space-y-3">
                {[t('emergency.tip1'), t('emergency.tip2'), t('emergency.tip3'), t('emergency.tip4'), t('emergency.tip5')].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold flex items-center justify-center mt-0.5 flex-shrink-0">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-5 text-white shadow-sm">
              <h3 className="text-sm font-semibold mb-2">{t('common.needMoreHelp')}</h3>
              <p className="text-xs text-red-200 mb-4 leading-relaxed">{t('common.useAiAssistant')}</p>
              <Link
                to="/assistant"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-red-700 text-sm font-medium hover:bg-red-50 transition-colors"
              >
                {t('common.askAI')}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Medical Translator Link */}
            <Link
              to="/language"
              className="block bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{t('emergency.translatorLink')}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t('emergency.translatorLinkDesc')}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
