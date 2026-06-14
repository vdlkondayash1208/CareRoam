import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Hospital, Hotel, Check, ArrowLeft, ArrowRight, Mail, Phone, MapPin, User, Loader2, Briefcase, MessageSquare } from 'lucide-react';
const initialForm = {
  name: '',
  email: '',
  phone: '',
  city: '',
  notes: '',
  type: 'hospital',
};

const partnerTypes = [
  { type: 'hospital', icon: Hospital, labelKey: 'partner.typeHospital', descKey: 'partner.typeHospitalDesc', color: 'from-red-500 to-red-600' },
  { type: 'hotel', icon: Hotel, labelKey: 'partner.typeHotel', descKey: 'partner.typeHotelDesc', color: 'from-green-500 to-emerald-600' },
  { type: 'travel-agency', icon: Briefcase, labelKey: 'partner.typeAgency', descKey: 'partner.typeAgencyDesc', color: 'from-purple-500 to-pink-600' },
];

export default function PartnerDashboard() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('partner.successTitle')}</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {t('partner.successDesc')}
            </p>
            <button
              onClick={() => { setIsSubmitted(false); setStep(0); setForm(initialForm); }}
              className="px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
            >
              {t('common.submitAnother')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-4">
            <MessageSquare className="w-3 h-3" />
            {t('partner.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t('partner.title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('partner.desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Partner Type Selection */}
          <div className="lg:col-span-1 space-y-4">
            {partnerTypes.map((pt) => {
              const Icon = pt.icon;
              const isSelected = form.type === pt.type;
              return (
                <button
                  key={pt.type}
                  onClick={() => { updateForm('type', pt.type); setStep(1); }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-care-500 bg-care-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pt.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{t(pt.labelKey)}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{t(pt.descKey)}</p>
                    </div>
                    {isSelected && (
                      <div className="ml-auto">
                        <Check className="w-5 h-5 text-care-500" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interest Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {form.type === 'hospital' ? t('partner.formTitleHospital') : 
                     form.type === 'hotel' ? t('partner.formTitleHotel') : 
                     t('partner.formTitleAgency')}
                  </h2>
                  <span className="text-xs text-gray-400">{t('partner.stepLabel')} {step}/2</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <User className="w-4 h-4 inline mr-1.5 text-gray-400" />
                          {t('partner.orgNameLabel')}
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateForm('name', e.target.value)}
                          placeholder={form.type === 'hospital' ? t('partner.orgNamePlaceholderHospital') : form.type === 'hotel' ? t('partner.orgNamePlaceholderHotel') : t('partner.orgNamePlaceholderAgency')}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <Mail className="w-4 h-4 inline mr-1.5 text-gray-400" />
                          {t('partner.emailLabel')}
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          placeholder={t('partner.emailPlaceholder')}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <Phone className="w-4 h-4 inline mr-1.5 text-gray-400" />
                          {t('partner.phoneLabel')}
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateForm('phone', e.target.value)}
                          placeholder={t('partner.phonePlaceholder')}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
                      >
                        {t('partner.nextStep')}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* Step 2: Location & Notes */}
                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <MapPin className="w-4 h-4 inline mr-1.5 text-gray-400" />
                          {t('partner.cityLabel')}
                        </label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={(e) => updateForm('city', e.target.value)}
                          placeholder={t('partner.cityPlaceholder')}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('partner.notesLabel')}</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => updateForm('notes', e.target.value)}
                        placeholder={t('partner.notesPlaceholder')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-gray-600 hover:text-care-600 hover:bg-gray-50 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        {t('partner.back')}
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !form.name || !form.email || !form.phone}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-medium shadow-lg shadow-care-500/25 hover:shadow-care-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          t('partner.submitInterest')
                        )}
                      </button>
                    </div>
                  </>
                )}

                {/* Initial State */}
                {step === 0 && (
                  <div className="text-center py-12">
                    <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('partner.selectType')}</h3>
                    <p className="text-gray-500 mb-6">{t('partner.selectTypeDesc')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                      {partnerTypes.map((pt) => {
                        const Icon = pt.icon;
                        return (
                          <button
                            key={pt.type}
                            onClick={() => { updateForm('type', pt.type); setStep(1); }}
                            className="p-4 rounded-xl border border-gray-200 hover:border-care-300 hover:bg-care-50 transition-all group"
                          >
                            <Icon className="w-8 h-8 text-gray-400 group-hover:text-care-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-care-700">{t(pt.labelKey)}</span>
                          </button>
                        );
                      })}
                    </div>
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
