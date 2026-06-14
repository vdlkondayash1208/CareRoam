import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Lightbulb, Bug, Heart, Send, Check, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const feedbackTypes = [
  { id: 'feature', labelKey: 'feedback.typeFeature', icon: Lightbulb },
  { id: 'pain-point', labelKey: 'feedback.typePainPoint', icon: Bug },
  { id: 'general', labelKey: 'feedback.typeGeneral', icon: MessageSquare },
  { id: 'praise', labelKey: 'feedback.typePraise', icon: Heart },
];

export default function Feedback() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', feedbackType: 'general', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('feedback.successTitle')}</h2>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              {t('feedback.successDesc')}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
            >
              {t('common.backToHome')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:p-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-medium mb-4">
            <Lightbulb className="w-3 h-3" />
            {t('feedback.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {t('feedback.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            {t('feedback.desc')}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('feedback.nameLabel')}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t('feedback.namePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('feedback.emailLabel')}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t('feedback.emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t('feedback.typeLabel')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {feedbackTypes.map((ft) => {
                  const Icon = ft.icon;
                  const isSelected = form.feedbackType === ft.id;
                  return (
                    <button
                      key={ft.id}
                      type="button"
                      onClick={() => setForm({ ...form, feedbackType: ft.id })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-care-500 bg-care-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-care-500' : 'text-gray-400'}`} />
                      <span className={`text-xs font-medium ${isSelected ? 'text-care-700' : 'text-gray-600'}`}>
                        {t(ft.labelKey)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('feedback.messageLabel')}</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={form.feedbackType === 'feature' ? t('feedback.messagePlaceholderFeature') :
                  form.feedbackType === 'pain-point' ? t('feedback.messagePlaceholderPain') :
                  form.feedbackType === 'praise' ? t('feedback.messagePlaceholderPraise') :
                  t('feedback.messagePlaceholderGeneral')}
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !form.message}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('feedback.submitButton')}
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">{t('feedback.whyMattersTitle')}</p>
              <p className="text-sm text-amber-700">{t('feedback.whyMattersDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
