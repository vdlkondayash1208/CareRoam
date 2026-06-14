import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Loader, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

const CONTACT_EMAIL = 'vdlkondayash1208@gmail.com';
const CONTACT_PHONE = '+91 9440584274';
const CONTACT_LOCATION = 'Hyderabad, Telangana, India';

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // EmailJS integration — user must configure env vars
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, {
          publicKey,
        });
        setIsSubmitted(true);
        formRef.current.reset();
      } else {
        setSubmitError(t('contact.errorNotConfigured'));
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      setSubmitError(err.message || t('contact.errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('contact.successTitle')}</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {t('contact.successDesc')}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
            >
              {t('common.sendAnother')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-care-500/25">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t('contact.title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-care-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-care-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">{t('contact.phone')}</p>
                  <a
                    href="tel:+919440584274"
                    className="text-sm text-care-600 hover:text-care-700 hover:underline"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-care-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-care-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">{t('contact.email')}</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-care-600 hover:text-care-700 hover:underline break-all"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-care-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-care-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">{t('contact.location')}</p>
                  <p className="text-sm text-gray-600">{CONTACT_LOCATION}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-care-600 to-care-800 rounded-2xl p-6 text-white">
              <p className="text-sm font-semibold mb-1">{t('contact.stageTitle')}</p>
              <p className="text-xs text-care-200 leading-relaxed">{t('contact.stageDesc')}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">{t('contact.formTitle')}</h2>
                <p className="text-sm text-gray-500">{t('contact.formSubtitle')}</p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contact.nameLabel')}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t('contact.namePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contact.emailLabel')}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t('contact.emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contact.phoneLabel')}</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t('contact.phonePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contact.subjectLabel')}</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder={t('contact.subjectPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contact.messageLabel')}</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900 resize-none"
                  />
                </div>

                {/* Hidden field to set the recipient email */}
                <input type="hidden" name="to_email" value={CONTACT_EMAIL} />

                {submitError && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-medium shadow-lg shadow-care-500/25 hover:shadow-care-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      {t('common.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.submitButton')}
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  {t('contact.recipientNotice')}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-care-500 hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
