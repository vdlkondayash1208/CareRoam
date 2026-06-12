import { useState, useEffect, useCallback } from 'react';
import { MapPin, Building2, Users, LayoutDashboard, Target, Lightbulb, Plus, Minus, ArrowRight, Check, LogIn, LogOut, AlertCircle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, hasFirebaseConfig, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from '../firebase/config';
import {
  subscribeInterviewCount,
  incrementInterviewCount,
  decrementInterviewCount,
  isAdmin,
  type InterviewData,
} from '../firebase/interviewService';

const LOCAL_ADMIN_EMAIL = 'vdlkondayash1208@gmail.com';
const LOCAL_ADMIN_PASSWORD = '@Yashwanth1208';

export default function FounderDashboard() {
  const [interviewData, setInterviewData] = useState<InterviewData>({ count: 0, lastUpdated: Date.now(), updatedBy: '' });
  const [user, setUser] = useState<User | null>(null);
  const [localUser, setLocalUser] = useState<{ email: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [counterLoading, setCounterLoading] = useState(false);
  const [counterError, setCounterError] = useState('');

  // Listen for Firebase auth state changes
  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsub;
  }, []);

  // Subscribe to real-time counter updates from Firestore
  useEffect(() => {
    const unsub = subscribeInterviewCount(
      (data) => {
        setInterviewData(data);
        setCounterLoading(false);
      },
      () => {
        setCounterError('Could not sync counter. Using local value.');
        setCounterLoading(false);
      },
    );

    return unsub;
  }, []);

  // Determine the effective user (Firebase auth OR local demo auth)
  const effectiveUser = user ?? localUser;
  const isLocalMode = !hasFirebaseConfig;
  const isAdminUser = user
    ? isAdmin(user)
    : localUser?.email === LOCAL_ADMIN_EMAIL;

  // Local counter state used when Firestore is unavailable
  const [localCount, setLocalCount] = useState(0);
  const interviewCount = hasFirebaseConfig ? interviewData.count : localCount;

  const handleIncrement = useCallback(async () => {
    if (user && hasFirebaseConfig) {
      // Firestore-backed increment
      setCounterLoading(true);
      setCounterError('');
      try {
        await incrementInterviewCount(user);
      } catch (err: any) {
        setCounterError(err.message || 'Failed to increment');
        setCounterLoading(false);
      }
    } else if (isAdminUser) {
      // Local demo mode increment
      setLocalCount(prev => prev + 1);
    }
  }, [user, isAdminUser]);

  const handleDecrement = useCallback(async () => {
    if (user && hasFirebaseConfig) {
      // Firestore-backed decrement
      setCounterLoading(true);
      setCounterError('');
      try {
        await decrementInterviewCount(user);
      } catch (err: any) {
        setCounterError(err.message || 'Failed to decrement');
        setCounterLoading(false);
      }
    } else if (isAdminUser && localCount > 0) {
      // Local demo mode decrement
      setLocalCount(prev => Math.max(0, prev - 1));
    }
  }, [user, isAdminUser, localCount]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    if (auth && hasFirebaseConfig) {
      // Firebase auth
      try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        setShowLogin(false);
        setLoginEmail('');
        setLoginPassword('');
      } catch (err: any) {
        setAuthError(err.message || 'Login failed. Check your credentials.');
        setAuthLoading(false);
      }
    } else {
      // Local demo mode auth
      await new Promise(resolve => setTimeout(resolve, 800)); // simulate network delay
      if (loginEmail === LOCAL_ADMIN_EMAIL && loginPassword === LOCAL_ADMIN_PASSWORD) {
        setLocalUser({ email: loginEmail });
        setShowLogin(false);
        setLoginEmail('');
        setLoginPassword('');
        setAuthLoading(false);
      } else {
        setAuthError('Invalid email or password. Try: vdlkondayash1208@gmail.com');
        setAuthLoading(false);
      }
    }
  }, [loginEmail, loginPassword]);

  const handleLogout = useCallback(async () => {
    if (auth && hasFirebaseConfig) {
      await signOut(auth);
    }
    setLocalUser(null);
  }, []);

  const waitlistCount = 0;

  const metrics = [
    { label: 'Pilot Cities', value: '0', icon: MapPin, desc: 'Target: Mumbai, Bangalore', color: 'from-blue-500 to-cyan-500' },
    { label: 'Verified Hospital Partners', value: '0', icon: Building2, desc: 'Actively onboarding', color: 'from-red-500 to-pink-500' },
    { label: 'Active Users', value: waitlistCount.toString(), icon: Users, desc: 'Waitlist opening soon', color: 'from-green-500 to-emerald-500' },
  ];

  const keyLearnings = [
    'Travelers struggle to find trusted healthcare in unfamiliar cities',
    'Emergency situations are the #1 concern for Indian travelers',
    'Language barriers create significant healthcare access issues',
    'Hotels want to offer healthcare concierge but lack infrastructure',
    'Hospitals are open to partnerships if verification is credible',
  ];

  const TARGET_INTERVIEWS = 50;
  const progressPercent = Math.min(100, (interviewCount / TARGET_INTERVIEWS) * 100);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-8 h-8 text-care-500" />
              <h1 className="text-3xl font-bold text-gray-900">Founder Dashboard</h1>
            </div>
            <p className="text-gray-500">Validation-stage metrics and progress tracker</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Auth Status */}
            {effectiveUser ? (
              <div className="flex items-center gap-2">
                {isAdminUser ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-green-700 font-medium">
                      {isLocalMode ? 'Admin (Local Mode)' : 'Admin'}
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
                    <span className="text-xs text-blue-700 font-medium">Viewer</span>
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                Admin Login
              </button>
            )}
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span className="text-xs text-amber-700 font-medium">Validation Phase</span>
            </span>
          </div>
        </div>

        {/* Admin Login Form */}
        {showLogin && !effectiveUser && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            <form onSubmit={handleLogin} className="max-w-sm mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Admin Login</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={isLocalMode ? "vdlkondayash1208@gmail.com" : "admin@example.com"}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-care-500 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
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
                  {authLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
              {isLocalMode && (
                <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-xs text-blue-700 font-medium mb-1">🔧 Local Demo Mode Active</p>
                  <p className="text-xs text-blue-600">
                    Firebase not configured yet. Use your credentials to test the login flow. 
                    Counter changes work locally but reset on refresh.
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-400 text-center mt-3">
                Only the founder account can modify validation data.
              </p>
            </form>
          </div>
        )}

        {/* Firebase Not Configured Warning */}
        {isLocalMode && !showLogin && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Firebase Not Configured</p>
                <p className="text-sm text-amber-700">
                  The app is running in <strong>local demo mode</strong>. Admin login works with 
                  your credentials, but the counter resets on page refresh.{' '}
                  Set up a <code className="bg-amber-100 px-1 rounded text-xs">.env</code> file with Firebase config 
                  to enable persistent real-time sync.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Validation Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Transparency First</p>
              <p className="text-sm text-amber-700">
                CareRoam is in early validation stage. No fake metrics are displayed here — 
                only real progress as we build partnerships and validate the market.
              </p>
            </div>
          </div>
        </div>

        {/* Real Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-gray-700">{metric.label}</p>
                <p className="text-xs text-gray-400 mt-1">{metric.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Editable Interview Counter */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-care-500" />
                Validation Interviews Conducted
              </h2>
              <p className="text-sm text-gray-500">
                {isAdminUser
                  ? 'Use +/- to update. Changes sync to all visitors in real time.'
                  : effectiveUser
                    ? 'You are logged in as a viewer. Only the founder can edit.'
                    : 'Login as admin to track interviews.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isAdminUser ? (
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
            <span>Target: {TARGET_INTERVIEWS} interviews</span>
            <span>{Math.round(progressPercent)}% complete</span>
          </div>

          {/* Error message */}
          {counterError && (
            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {counterError}
            </p>
          )}
        </div>

        {/* Key Learnings & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Learnings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Key Validation Learnings
            </h2>
            <ul className="space-y-3">
              {keyLearnings.map((learning, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-6 h-6 rounded-full bg-care-50 text-care-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {learning}
                </li>
              ))}
            </ul>
          </div>

          {/* Next Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-care-500" />
              Immediate Next Steps
            </h2>
            <div className="space-y-4">
              {[
                { action: 'Complete 50 validation interviews', status: `${interviewCount}/${TARGET_INTERVIEWS} done` },
                { action: 'Onboard first 5 hospital partners', status: '0/5' },
                { action: 'Launch waitlist for travelers', status: 'Ready to launch' },
                { action: 'Define pilot city partnerships', status: 'Mumbai - In talks' },
                { action: 'Build investor pitch deck', status: 'In progress' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.status.includes('done') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
                  }`}>
                    {item.status.includes('done') ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-400">{item.status}</p>
                  </div>
                </div>
              ))}
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
              <p className="text-sm font-semibold text-gray-900">Investor Overview</p>
              <p className="text-xs text-gray-500">Vision, roadmap, and pitch</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-care-500 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            to="/waitlist"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">Traveler Waitlist</p>
              <p className="text-xs text-gray-500">{waitlistCount} signed up</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-care-500 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link
            to="/feedback"
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">User Feedback</p>
              <p className="text-xs text-gray-500">Help shape the product</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-care-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
