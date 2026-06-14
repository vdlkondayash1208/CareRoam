import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, LayoutDashboard, Target, Lightbulb, Plus, Minus, ArrowRight, Check, LogIn, LogOut, AlertCircle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, firebaseConfigured, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '../lib/firebase';
import { firestoreAvailable } from '../firebase/interviewService';
import {
  subscribeInterviewCount,
  incrementInterviewCount,
  decrementInterviewCount,
  isAdmin,
} from '../firebase/interviewService';

const TARGET_INTERVIEWS = 50;

export default function FounderDashboard() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Local auth user (used when Firebase isn't configured)
  const [localUser, setLocalUser] = useState(null);
  const LOCAL_ADMIN_EMAIL = 'vdlkondayash1208@gmail.com';
  const LOCAL_ADMIN_PASSWORD = '@Yashwanth1208';

  // Effective user: Firebase OR local fallback
  const effectiveUser = user ?? localUser;
  const effectiveIsAdmin = user
    ? isAdmin(user)
    : localUser?.email === LOCAL_ADMIN_EMAIL;

  // Interview counter from Firestore
  const [interviewData, setInterviewData] = useState({ validationInterviews: 0, lastUpdated: Date.now(), updatedBy: '' });
  const [counterLoading, setCounterLoading] = useState(false);
  const [counterError, setCounterError] = useState('');

  // Derived values (defined before any useEffect that references them)
  const adminUser = effectiveIsAdmin;
  const interviewCount = interviewData.validationInterviews ?? 0;
  const progressPercent = Math.min(100, (interviewCount / TARGET_INTERVIEWS) * 100);

  // Editable milestone statuses
  const [milestones, setMilestones] = useState([
    { actionKey: 'founder.milestone1', status: `${0}/${TARGET_INTERVIEWS} done` },
    { actionKey: 'founder.milestone2', status: '0/5' },
    { actionKey: 'founder.milestone3', status: 'Ready to launch' },
    { actionKey: 'founder.milestone4', status: 'Mumbai - In talks' },
    { actionKey: 'founder.milestone5', status: 'In progress' },
  ]);

  useEffect(() => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.actionKey === 'founder.milestone1'
          ? { ...m, status: `${interviewCount}/${TARGET_INTERVIEWS} done` }
          : m,
      ),
    );
  }, [interviewCount]);

  // Editable metrics (local state — removed; only Firestore-backed counters persist)

  // Listens for Firebase auth state
  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // Subscribes to real-time counter updates from Firestore
  useEffect(() => {
    const unsub = subscribeInterviewCount(
      (data) => {
        setInterviewData(data);
        setCounterLoading(false);
      },
      () => {
        setCounterLoading(false);
      },
    );
    return unsub;
  }, []);

  // ---- Admin actions ----

  const handleIncrement = useCallback(async () => {
    if (!effectiveUser) return;
    setCounterLoading(true);
    setCounterError('');
    try {
      await incrementInterviewCount(effectiveUser);
    } catch (err) {
      setCounterError(err.message || 'Failed to increment');
      setCounterLoading(false);
    }
  }, [effectiveUser]);

  const handleDecrement = useCallback(async () => {
    if (!effectiveUser) return;
    setCounterLoading(true);
    setCounterError('');
    try {
      await decrementInterviewCount(effectiveUser);
    } catch (err) {
      setCounterError(err.message || 'Failed to decrement');
      setCounterLoading(false);
    }
  }, [effectiveUser]);

  const statusCycle = {
    'In progress': 'Done',
    'Done': '\u2190 In progress',
    'Ready to launch': 'Done',
    'Mumbai - In talks': 'Done',
  };

  const handleStatusToggle = useCallback((index) => {
    setMilestones((prev) =>
      prev.map((m, i) => {
        if (i !== index) return m;
        const currentStatus = m.status;
        const nextStatus = statusCycle[currentStatus];
        if (nextStatus) {
          return { ...m, status: nextStatus };
        }
        // For numeric statuses like "0/5", cycle through
        const match = currentStatus.match(/^(\d+)\/(\d+)$/);
        if (match) {
          const [_, current, total] = match.map(Number);
          const newCurrent = current >= total ? 0 : current + 1;
          const label = newCurrent >= total ? 'Done' : `${newCurrent}/${total}`;
          return { ...m, status: label };
        }
        return m;
      }),
    );
  }, []);

  // handleMetricChange removed — local-only state does not persist

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    if (auth && firebaseConfigured) {
      // Firebase authentication
      try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        setShowLogin(false);
        setLoginEmail('');
        setLoginPassword('');
      } catch (err) {
        setAuthError(err.message || t('founder.loginError'));
        setAuthLoading(false);
      }
    } else {
      // Local credential check when Firebase isn't configured
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (loginEmail === LOCAL_ADMIN_EMAIL && loginPassword === LOCAL_ADMIN_PASSWORD) {
        setLocalUser({ email: loginEmail });
        setShowLogin(false);
        setLoginEmail('');
        setLoginPassword('');
        setAuthLoading(false);
      } else {
        setAuthError(t('founder.loginErrorLocal'));
        setAuthLoading(false);
      }
    }
  }, [loginEmail, loginPassword]);

  const handleLogout = useCallback(async () => {
    if (auth && firebaseConfigured) {
      await signOut(auth);
    }
    setLocalUser(null);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-8 h-8 text-care-500" />
              <h1 className="text-3xl font-bold text-gray-900">{t('founder.title')}</h1>
            </div>
            <p className="text-gray-500">{t('founder.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Auth Status */}
            {effectiveUser ? (
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                  adminUser
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${adminUser ? 'bg-green-500' : 'bg-blue-500'}`} />
                  <span className={`text-xs font-medium ${adminUser ? 'text-green-700' : 'text-blue-700'}`}>
                    {adminUser ? t('founder.admin') : t('founder.viewer')}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {t('founder.logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                {t('founder.adminLogin')}
              </button>
            )}
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span className="text-xs text-amber-700 font-medium">{t('founder.validationPhase')}</span>
            </span>
          </div>
        </div>

        {/* Startup Transparency Banner */}
        <div className="bg-gradient-to-r from-care-600 to-care-800 rounded-2xl p-5 mb-8 text-white">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-care-200 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">{t('founder.bannerTitle')}</p>
              <p className="text-xs text-care-200 leading-relaxed">{t('founder.bannerDesc')}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full">{t('founder.bannerTag1')}</span>
                <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full">{t('founder.bannerTag2')}</span>
                <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full">{t('founder.bannerTag3')}</span>
                <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full">{t('founder.bannerTag4')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Login Form */}
        {showLogin && !effectiveUser && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            <form onSubmit={handleLogin} className="max-w-sm mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{t('founder.adminLogin')}</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('founder.loginEmail')}</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={t('founder.loginEmailPlaceholder')}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-care-500 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('founder.loginPassword')}</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={t('founder.loginPasswordPlaceholder')}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-care-500 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-sm"
                    required
                  />
                </div>
                {authError && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {authError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-care-500 text-white font-medium text-sm hover:bg-care-600 transition-colors disabled:opacity-50"
                >
                  {authLoading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {authLoading ? t('founder.signingIn') : t('founder.signIn')}
                </button>
              </div>
              {!firebaseConfigured && (
                <p className="text-xs text-gray-400 text-center mt-3">{t('founder.localAuthNotice')}</p>
              )}
              <p className="text-xs text-gray-400 text-center mt-3">{t('founder.founderOnlyNotice')}</p>
            </form>
          </div>
        )}

        {/* Validation Interviews Counter — Firestore-backed */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-care-500" />
                {t('founder.counterTitle')}
              </h2>
              <p className="text-sm text-gray-500">
                {adminUser
                  ? t('founder.counterAdminHint')
                  : t('founder.counterViewerHint')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {adminUser ? (
                <>
                  <button
                    onClick={handleDecrement}
                    disabled={counterLoading || interviewCount <= 0}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-care-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-5 h-5 text-gray-500" />
                  </button>
                  <span className="text-3xl font-bold text-care-600 min-w-[3rem] text-center">
                    {interviewCount}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={counterLoading}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-care-50 hover:border-care-300 transition-all disabled:opacity-50"
                  >
                    {counterLoading ? (
                      <Loader className="w-4 h-4 text-care-500 animate-spin" />
                    ) : (
                      <Plus className="w-5 h-5 text-care-500" />
                    )}
                  </button>
                </>
              ) : (
                <span className="text-3xl font-bold text-care-600 min-w-[3rem] text-center">
                  {interviewCount}
                </span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-care-500 to-care-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>{t('founder.targetLabel')} {TARGET_INTERVIEWS} {t('founder.interviews')}</span>
            <span>{Math.round(progressPercent)}% {t('founder.percentComplete')}</span>
          </div>

          {counterError && (
            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {counterError}
            </p>
          )}

          {!firestoreAvailable && !authLoading && (
            <p className="mt-3 text-xs text-amber-600 flex items-center gap-1 bg-amber-50 px-3 py-2 rounded-lg">
              <AlertCircle className="w-3 h-3" />
              Firestore not configured. Counter unavailable. Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in your .env file.
            </p>
          )}
        </div>

        {/* Key Learnings & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Validation Learnings — admin can edit */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              {t('founder.learningsTitle')}
              {adminUser && (
                <span className="text-xs text-gray-400 font-normal ml-1">{t('founder.learningsReadOnly')}</span>
              )}
            </h2>
            <ul className="space-y-3">
              {['founder.learning1', 'founder.learning2', 'founder.learning3', 'founder.learning4', 'founder.learning5'].map((learningKey, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-care-50 text-care-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {t(learningKey)}
                </li>
              ))}
            </ul>
          </div>

          {/* Milestones / Next Steps — admin can toggle status */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-care-500" />
                {t('founder.milestonesTitle')}
              </h2>
              {adminUser && (
                <span className="text-xs text-gray-400">{t('founder.milestonesHint')}</span>
              )}
            </div>
            <div className="space-y-4">
              {milestones.map((item, i) => {
                const isDone = item.status === 'Done' || item.status.includes('done');
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 ${
                      adminUser ? 'cursor-pointer group' : ''
                    }`}
                    onClick={() => adminUser && handleStatusToggle(i)}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isDone ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {isDone ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{t(item.actionKey)}</p>
                      <p className={`text-xs ${
                        adminUser ? 'text-care-600 group-hover:text-care-700' : 'text-gray-400'
                      }`}>
                        {item.status}
                        {adminUser && <span className="ml-1 text-care-400">↻</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/investor"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{t('founder.quickInvestor')}</p>
              <p className="text-xs text-gray-500">{t('founder.quickInvestorDesc')}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-care-500 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            to="/waitlist"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{t('founder.quickWaitlist')}</p>
              <p className="text-xs text-gray-500">0 {t('founder.quickWaitlistDesc')}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-care-500 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            to="/feedback"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{t('founder.quickFeedback')}</p>
              <p className="text-xs text-gray-500">{t('founder.quickFeedbackDesc')}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-care-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
