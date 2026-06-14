import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Mail, MapPin, Calendar, Check, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const travelOptions = [
  { value: 'monthly', labelKey: 'waitlist.frequencyMonthly' },
  { value: 'quarterly', labelKey: 'waitlist.frequencyQuarterly' },
  { value: 'yearly', labelKey: 'waitlist.frequencyYearly' },
  { value: 'less', labelKey: 'waitlist.frequencyLess' },
];

export default function Waitlist() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', city: '', travelFrequency: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-care-500/25">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('waitlist.successTitle')}</h2>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              {t('waitlist.successDesc')}, {form.name}! {t('waitlist.successDesc2')} {form.city || t('waitlist.successDesc3')}.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              {t('waitlist.successHint')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/feedback"
                className="px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
              >
                {t('common.shareFeedback')}
              </Link>
              <Link
                to="/search"
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                {t('common.explorePrototype')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center mb-6 shadow-lg shadow-care-500/25">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('waitlist.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t('waitlist.desc')}
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Sparkles, key: 'waitlist.benefit1' },
                { icon: Mail, key: 'waitlist.benefit2' },
                { icon: MapPin, key: 'waitlist.benefit3' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded-lg bg-care-50 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-care-600" />
                    </div>
                    <span className="text-sm">{t(item.key)}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <strong>🏗️ {t('waitlist.validationNotice')}</strong>
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('waitlist.formTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Users className="w-4 h-4 inline mr-1.5 text-gray-400" />
                  {t('waitlist.nameLabel')}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  placeholder={t('waitlist.namePlaceholder')}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Mail className="w-4 h-4 inline mr-1.5 text-gray-400" />
                  {t('waitlist.emailLabel')}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  placeholder={t('waitlist.emailPlaceholder')}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <MapPin className="w-4 h-4 inline mr-1.5 text-gray-400" />
                  {t('waitlist.cityLabel')}
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateForm('city', e.target.value)}
                  placeholder={t('waitlist.cityPlaceholder')}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Calendar className="w-4 h-4 inline mr-1.5 text-gray-400" />
                  {t('waitlist.frequencyLabel')}
                </label>
                <select
                  value={form.travelFrequency}
                  onChange={(e) => updateForm('travelFrequency', e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900 appearance-none"
                >
                  <option value="">{t('waitlist.frequencyPlaceholder')}</option>
                  {travelOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !form.name || !form.email || !form.city || !form.travelFrequency}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-semibold shadow-lg shadow-care-500/25 hover:shadow-care-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {t('waitlist.submitButton')}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                {t('common.privacyNotice')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
