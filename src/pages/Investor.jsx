import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Target, Lightbulb, TrendingUp, Route, ArrowRight, Users, MessageSquare, Shield, Mail, ChevronRight, Heart, Building2 } from 'lucide-react';
import { roadmapData } from '../data/sampleData';

export default function Investor() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-care-500/25">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {t('investor.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('investor.desc')}
          </p>
        </div>

        {/* Status Banner */}
        <div className="bg-gradient-to-r from-care-600 to-care-800 rounded-2xl p-6 sm:p-8 text-white mb-10 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg mb-1">{t('investor.stageTitle')}</p>
              <p className="text-care-200 text-sm">
                {t('investor.stageDesc')}
              </p>
            </div>
            <Link
              to="/waitlist"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-care-700 font-medium text-sm whitespace-nowrap hover:bg-care-50 transition-colors"
            >
              <Users className="w-4 h-4" />
              {t('investor.joinWaitlist')}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Vision */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t('investor.visionTitle')}</h2>
            <p className="text-gray-600 leading-relaxed">{t('investor.visionDesc')}</p>
          </div>

          {/* Problem */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t('investor.problemTitle')}</h2>
            <p className="text-gray-600 leading-relaxed">{t('investor.problemDesc')}</p>
          </div>

          {/* Market */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t('investor.marketTitle')}</h2>
            <ul className="space-y-3">
              {['investor.market1', 'investor.market2', 'investor.market3', 'investor.market4', 'investor.market5'].map((key, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <ChevronRight className="w-4 h-4 text-care-500 mt-0.5 flex-shrink-0" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          {/* Current Stage */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Route className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t('investor.stageSubtitle')}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">✅ {t('investor.completed')}</p>
                <ul className="space-y-1.5">
                  {['investor.done1', 'investor.done2', 'investor.done3', 'investor.done4', 'investor.done5'].map((key, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 text-xs mt-0.5">●</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">🔄 {t('investor.inProgress')}</p>
                <ul className="space-y-1.5">
                  {['investor.progress1', 'investor.progress2', 'investor.progress3', 'investor.progress4'].map((key, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-amber-500 text-xs mt-0.5">●</span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Route className="w-6 h-6 text-care-500" />
            <h2 className="text-xl font-bold text-gray-900">{t('investor.roadmapTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapData.map((phase, index) => (
              <div
                key={phase.phase}
                className={`relative rounded-xl border-2 p-5 ${
                  phase.status === 'current'
                    ? 'border-care-500 bg-care-50/50'
                    : 'border-gray-200'
                }`}
              >
                {phase.status === 'current' && (
                  <div className="absolute -top-2.5 left-3 px-2.5 py-0.5 bg-care-500 text-white text-xs font-semibold rounded-full">
                    {t('investor.current')}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    phase.status === 'current' ? 'bg-care-500 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{phase.phase}</p>
                    <h3 className="text-sm font-semibold text-gray-900">{phase.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3">{phase.description}</p>
                <ul className="space-y-1.5">
                  {phase.milestones.map((milestone, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-gray-500">
                      <span className="text-care-400 text-xs mt-0.5">•</span>
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How You Can Help */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-care-500" />
            How You Can Help
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { titleKey: 'investor.helpMentorship', descKey: 'investor.helpMentorshipDesc', icon: Lightbulb, actionKey: 'investor.helpMentorshipAction', link: '/feedback' },
              { titleKey: 'investor.helpPartnerships', descKey: 'investor.helpPartnershipsDesc', icon: Building2, actionKey: 'investor.helpPartnershipsAction', link: '/partner' },
              { titleKey: 'investor.helpInvestment', descKey: 'investor.helpInvestmentDesc', icon: TrendingUp, actionKey: 'investor.helpInvestmentAction', link: '/feedback' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titleKey} className="text-center p-6 rounded-xl border border-gray-100 hover:border-care-200 hover:shadow-sm transition-all">
                  <Icon className="w-8 h-8 text-care-500 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{t(item.titleKey)}</h3>
                  <p className="text-sm text-gray-600 mb-4">{t(item.descKey)}</p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-sm text-care-600 hover:text-care-700 font-medium"
                  >
                    {t(item.actionKey)}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-care-50 to-blue-50 rounded-2xl border border-care-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('investor.ctaTitle')}</h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-6">{t('investor.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:vdlkondayash1208@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
            >
              <Mail className="w-4 h-4" />
              vdlkondayash1208@gmail.com
            </a>
            <Link
              to="/feedback"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {t('investor.ctaMessage')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
