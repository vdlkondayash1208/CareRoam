import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Copy,
  Check,
  ArrowLeftRight,
  Search,
  Stethoscope,
  Pill,
  Ambulance,
  Heart,
  MessageSquare,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../i18n/config';

// ============================================================
// Phrase Data — categorized medical phrases
// ============================================================

const phraseCategories = [
  {
    id: 'emergency',
    labelKey: 'language.categoryEmergency',
    icon: Ambulance,
    color: 'from-red-500 to-red-600',
    phrases: [
      { id: 'em1', en: 'I need an ambulance', hi: 'मुझे एम्बुलेंस चाहिए', te: 'నాకు అంబులెన్స్ కావాలి' },
      { id: 'em2', en: 'This is an emergency', hi: 'यह एक आपातकालीन स्थिति है', te: 'ఇది అత్యవసర పరిస్థితి' },
      { id: 'em3', en: 'Call 108 (ambulance)', hi: '108 (एम्बुलेंस) पर कॉल करें', te: '108 (అంబులెన్స్) కాల్ చేయండి' },
      { id: 'em4', en: 'Call 112 (national emergency)', hi: '112 (राष्ट्रीय आपातकालीन) पर कॉल करें', te: '112 (జాతీయ అత్యవసర) కాల్ చేయండి' },
      { id: 'em5', en: 'There is a fire', hi: 'आग लगी है', te: 'మంటలు చెలరేగాయి' },
      { id: 'em6', en: 'Someone is unconscious', hi: 'कोई बेहोश है', te: 'ఎవరో స్పృహ కోల్పోయారు' },
      { id: 'em7', en: 'I need help immediately', hi: 'मुझे तुरंत मदद चाहिए', te: 'నాకు వెంటనే సహాయం కావాలి' },
      { id: 'em8', en: 'There has been an accident', hi: 'एक दुर्घटना हुई है', te: 'ప్రమాదం జరిగింది' },
    ],
  },
  {
    id: 'pharmacy',
    labelKey: 'language.categoryPharmacy',
    icon: Pill,
    color: 'from-green-500 to-emerald-600',
    phrases: [
      { id: 'ph1', en: 'Where is the nearest pharmacy?', hi: 'निकटतम फार्मेसी कहाँ है?', te: 'దగ్గరి ఫార్మసీ ఎక్కడ ఉంది?' },
      { id: 'ph2', en: 'I need medicine for pain', hi: 'मुझे दर्द की दवा चाहिए', te: 'నాకు నొప్పి మందు కావాలి' },
      { id: 'ph3', en: 'Do you have this medicine?', hi: 'क्या आपके पास यह दवा है?', te: 'మీ దగ్గర ఈ మందు ఉందా?' },
      { id: 'ph4', en: 'I need a prescription refill', hi: 'मुझे एक प्रिस्क्रिप्शन रिफिल चाहिए', te: 'నాకు ప్రిస్క్రిప్షన్ రీఫిల్ కావాలి' },
      { id: 'ph5', en: 'Is there a 24-hour pharmacy?', hi: 'क्या 24 घंटे की फार्मेसी है?', te: '24 గంటల ఫార్మసీ ఉందా?' },
      { id: 'ph6', en: 'I need ORS packets', hi: 'मुझे ORS पैकेट चाहिए', te: 'నాకు ORS ప్యాకెట్లు కావాలి' },
      { id: 'ph7', en: 'Do I need a prescription for this?', hi: 'क्या इसके लिए प्रिस्क्रिप्शन चाहिए?', te: 'దీనికి ప్రిస్క్రిప్షన్ అవసరమా?' },
    ],
  },
  {
    id: 'hospital',
    labelKey: 'language.categoryHospital',
    icon: Stethoscope,
    color: 'from-blue-500 to-blue-600',
    phrases: [
      { id: 'ho1', en: 'Where is the nearest hospital?', hi: 'निकटतम अस्पताल कहाँ है?', te: 'దగ్గరి ఆసుపత్రి ఎక్కడ ఉంది?' },
      { id: 'ho2', en: 'Does this hospital have an emergency room?', hi: 'क्या इस अस्पताल में आपातकालीन कक्ष है?', te: 'ఈ ఆసుపత్రికి ఎమర్జెన్సీ రూం ఉందా?' },
      { id: 'ho3', en: 'I need to see a doctor', hi: 'मुझे डॉक्टर से मिलना है', te: 'నాకు డాక్టర్ ను చూడాలి' },
      { id: 'ho4', en: 'What are the visiting hours?', hi: 'मिलने का समय क्या है?', te: 'సందర్శన సమయాలు ఏమిటి?' },
      { id: 'ho5', en: 'How do I get to the hospital?', hi: 'मैं अस्पताल कैसे पहुँचूँ?', te: 'నేను ఆసుపత్రికి ఎలా చేరుకోవాలి?' },
      { id: 'ho6', en: 'I need a blood test', hi: 'मुझे रक्त परीक्षण की आवश्यकता है', te: 'నాకు రక్త పరీక్ష అవసరం' },
    ],
  },
  {
    id: 'doctor',
    labelKey: 'language.categoryDoctor',
    icon: Heart,
    color: 'from-purple-500 to-purple-600',
    phrases: [
      { id: 'dc1', en: 'I have a fever', hi: 'मुझे बुखार है', te: 'నాకు జ్వరం వచ్చింది' },
      { id: 'dc2', en: 'I have a headache', hi: 'मुझे सिरदर्द है', te: 'నాకు తలనొప్పి ఉంది' },
      { id: 'dc3', en: 'I have stomach pain', hi: 'मेरे पेट में दर्द है', te: 'నాకు కడుపు నొప్పి ఉంది' },
      { id: 'dc4', en: 'I am allergic to...', hi: 'मुझे ... से एलर्जी है', te: 'నాకు ... అలెర్జీ ఉంది' },
      { id: 'dc5', en: 'I have difficulty breathing', hi: 'मुझे सांस लेने में तकलीफ है', te: 'నాకు శ్వాస తీసుకోవడంలో ఇబ్బంది ఉంది' },
      { id: 'dc6', en: 'I feel dizzy', hi: 'मुझे चक्कर आ रहा है', te: 'నాకు తల తిరుగుతోంది' },
      { id: 'dc7', en: 'I have been vomiting', hi: 'मुझे उल्टी हो रही है', te: 'నాకు వాంతులు అవుతున్నాయి' },
      { id: 'dc8', en: 'I have diarrhea', hi: 'मुझे दस्त है', te: 'నాకు విరేచనాలు అవుతున్నాయి' },
    ],
  },
  {
    id: 'symptoms',
    labelKey: 'language.categorySymptoms',
    icon: MessageSquare,
    color: 'from-teal-500 to-teal-600',
    phrases: [
      { id: 'sy1', en: 'I am in pain', hi: 'मुझे दर्द है', te: 'నాకు నొప్పి ఉంది' },
      { id: 'sy2', en: 'I have a rash', hi: 'मुझे दाने हैं', te: 'నాకు దద్దుర్లు వచ్చాయి' },
      { id: 'sy3', en: 'I have swelling', hi: 'मुझे सूजन है', te: 'నాకు వాపు ఉంది' },
      { id: 'sy4', en: 'I think I have food poisoning', hi: 'मुझे लगता है मुझे फूड पॉइज़निंग है', te: 'నాకు ఫుడ్ పాయిజనింగ్ అయినట్లు ఉంది' },
      { id: 'sy5', en: 'I have a cough', hi: 'मुझे खांसी है', te: 'నాకు దగ్గు ఉంది' },
      { id: 'sy6', en: 'I have a sore throat', hi: 'मेरे गले में दर्द है', te: 'నాకు గొంతు నొప్పి ఉందி', ta: 'எனக்கு தொண்டை வலி உள்ளது' },
    ],
  },
  {
    id: 'general',
    labelKey: 'language.categoryGeneral',
    icon: Globe,
    color: 'from-indigo-500 to-indigo-600',
    phrases: [
      { id: 'gn1', en: 'Do you speak English?', hi: 'क्या आप अंग्रेज़ी बोलते हैं?', te: 'మీరు ఇంగ్లీష్ మాట్లాడతారా?' },
      { id: 'gn2', en: 'Please help me', hi: 'कृपया मेरी मदद करें', te: 'దయచేసి నాకు సహాయం చేయండి' },
      { id: 'gn3', en: 'Thank you', hi: 'धन्यवाद', te: 'ధన్యవాదాలు' },
      { id: 'gn4', en: 'How much does this cost?', hi: 'इसकी कीमत कितनी है?', te: 'దీని ధర ఎంత?' },
      { id: 'gn5', en: 'I have health insurance', hi: 'मेरे पास स्वास्थ्य बीमा है', te: 'నా దగ్గర ఆరోగ్య బీమా ఉంది' },
      { id: 'gn6', en: 'Please write it down', hi: 'कृपया इसे लिख दें', te: 'దయచేసి రాసి ఇవ్వండి' },
    ],
  },
];

// ============================================================
// Main Component
// ============================================================

export default function LanguageSupport() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('emergency');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = useCallback((text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleSwapLangs = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  }, [sourceLang, targetLang]);

  const activeCategoryData = phraseCategories.find((c) => c.id === activeCategory);

  function getText(phrase, lang) {
    return phrase[lang] || phrase.en;
  }

  const filteredPhrases = useMemo(() => {
    if (!activeCategoryData) return [];
    if (!searchQuery) return activeCategoryData.phrases;
    const q = searchQuery.toLowerCase();
    return activeCategoryData.phrases.filter((p) => {
      const sourceText = getText(p, sourceLang);
      return sourceText.toLowerCase().includes(q);
    });
  }, [activeCategoryData, searchQuery, sourceLang]);

  const sourceInfo = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang);
  const targetInfo = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-care-500/20">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{t('language.title')}</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">{t('language.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar — Categories & Language Selection */}
          <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
            {/* Language Selector */}
            <div className="bg-white rounded-2xl border border-gray-100 premium-shadow p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('language.sourceLang')}</h3>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.flag} {l.nativeLabel} ({l.label})</option>
                ))}
              </select>

              {/* Swap Button */}
              <button
                onClick={handleSwapLangs}
                className="w-full flex items-center justify-center gap-2 my-3 px-3 py-2 rounded-xl bg-care-50 text-care-700 text-sm font-medium hover:bg-care-100 transition-colors"
              >
                <ArrowLeftRight className="w-4 h-4" />
                {t('language.switchLang')}
              </button>

              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('language.targetLang')}</h3>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-slate-50 text-sm focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.flag} {l.nativeLabel} ({l.label})</option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 premium-shadow p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('language.selectCategory')}</h3>
              <div className="space-y-1.5">
                {phraseCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = cat.id === activeCategory;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                        isActive
                          ? 'bg-care-50 text-care-700 font-medium'
                          : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="flex-1">{t(cat.labelKey)}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90' : ''} text-gray-400`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-care-50 to-blue-50 rounded-2xl border border-care-100 p-4 text-center">
              <p className="text-xs text-care-700 font-medium">{t('language.supportedLangs')}</p>
            </div>
          </div>

          {/* Main Content — Phrases */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-gray-100 premium-shadow-lg overflow-hidden">
              {/* Search + Category header */}
              <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  {activeCategoryData && (
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeCategoryData.color} flex items-center justify-center`}>
                      {(() => {
                        const Icon = activeCategoryData.icon;
                        return <Icon className="w-5 h-5 text-white" />;
                      })()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {activeCategoryData ? t(activeCategoryData.labelKey) : ''}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {sourceInfo?.flag} {sourceInfo?.nativeLabel} → {targetInfo?.flag} {targetInfo?.nativeLabel}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('language.phrasePlaceholder')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-sm focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phrase List */}
              <div className="divide-y divide-gray-50">
                {filteredPhrases.map((phrase) => {
                  const translation = getText(phrase, targetLang);
                  return (
                    <div
                      key={phrase.id}
                      className="p-4 sm -5 hover:bg-slate-50/50 transition-colors group"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:px-6">
                        {/* Source */}
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            {sourceInfo?.flag} {sourceInfo?.nativeLabel}
                          </p>
                          <p className="text-sm text-gray-700">{getText(phrase, sourceLang)}</p>
                        </div>
                        {/* Target */}
                        <div className="min-w-0 relative">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            {targetInfo?.flag} {targetInfo?.nativeLabel}
                          </p>
                          <p className="text-sm font-medium text-care-700">{getText(phrase, targetLang)}</p>
                          {/* Copy button */}
                          <button
                            onClick={() => handleCopy(translation, phrase.id)}
                            className="absolute top-0 right-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all"
                            aria-label={t('language.copyPhrase')}
                          >
                            {copiedId === phrase.id ? (
                              <Check className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredPhrases.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-400">{t('common.noResults')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
