import { Link } from 'react-router-dom';
import { Search, Shield, MessageSquare, Languages, Building2, ArrowRight, MapPin, Users, Lightbulb, Target, ArrowUpRight, ChevronRight, Mail } from 'lucide-react';
import { roadmapData } from '../data/sampleData';

const features = [
  {
    icon: Search,
    title: 'Emergency Search',
    description: 'Search interface to find hospitals, doctors, pharmacies, and ambulances near you. Provider network currently being onboarded.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MessageSquare,
    title: 'AI Health Assistant',
    description: 'Get instant answers to health-related travel questions from our AI prototype.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Languages,
    title: 'Multi-Language Support',
    description: 'Translate common medical phrases into English, Hindi, and Telugu.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Emergency Help',
    description: 'Quick access to national emergency contacts and ambulance numbers.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Building2,
    title: 'Partner Network (Coming Soon)',
    description: 'Actively building partnerships with hospitals, hotels, and travel agencies.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Users,
    title: 'Built for Travelers',
    description: 'Designed with input from frequent travelers across major Indian cities.',
    color: 'from-teal-500 to-cyan-500',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-care-950 via-care-900 to-care-800" />
          <div className="absolute top-20 left-10 w-96 h-96 bg-care-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-care-400/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Validation Phase Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-sm font-medium mb-8">
              <Lightbulb className="w-4 h-4" />
              Startup Validation Phase
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Trusted Healthcare for{' '}
              <span className="text-gradient bg-gradient-to-r from-care-300 to-care-400 bg-clip-text text-transparent">
                Travelers Anywhere
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              CareRoam is currently building partnerships with healthcare providers and validating traveler needs. 
              We're creating a platform to help you find trusted medical care while traveling.
            </p>

            <p className="text-sm text-amber-400/80 max-w-xl mx-auto mb-10 bg-amber-500/5 border border-amber-500/10 rounded-xl px-4 py-3">
              🏗️ This is a working prototype. Verified providers are being onboarded — 
              join the waitlist to be notified when we launch in your city.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-semibold text-lg shadow-xl shadow-care-500/30 hover:shadow-care-500/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                Explore Search Prototype
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/waitlist"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                Join Waitlist
              </Link>
            </div>

            {/* Validation Progress */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '0', label: 'Pilot Cities', desc: 'Target: Mumbai, Bangalore', icon: MapPin },
                { value: '0', label: 'Verified Partners', desc: 'Actively onboarding', icon: Building2 },
                { value: '0', label: 'Active Users', desc: 'Waitlist opening soon', icon: Users },
                { value: '→', label: 'Validation Mode', desc: 'Seeking your input', icon: Target },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <Icon className="w-6 h-6 text-care-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
            <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Prototype Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-care-50 text-care-700 text-xs font-medium mb-4">
              <Shield className="w-3 h-3" />
              Prototype Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What We're Building
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These features are in active development. Your feedback will shape the final product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 card-hover group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Roadmap
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in transparency. Here's where we are and where we're headed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapData.map((phase, index) => (
              <div
                key={phase.phase}
                className={`relative bg-white rounded-2xl border-2 p-6 ${
                  phase.status === 'current'
                    ? 'border-care-500 shadow-lg shadow-care-500/10'
                    : 'border-gray-200'
                }`}
              >
                {phase.status === 'current' && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-care-500 text-white text-xs font-semibold rounded-full">
                    Current
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                    phase.status === 'current'
                      ? 'bg-care-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{phase.phase}</p>
                    <h3 className="text-base font-semibold text-gray-900">{phase.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.milestones.map((milestone, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <ChevronRight className="w-3 h-3 text-care-500 mt-0.5 flex-shrink-0" />
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Shape CareRoam Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium mb-4">
                <Lightbulb className="w-3 h-3" />
                Your Input Matters
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Help Shape CareRoam
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're in the early stages and your feedback is invaluable. Whether you're a frequent traveler, 
                a healthcare professional, or someone who cares about travel safety — we want to hear from you.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Users, text: 'Join our traveler waitlist for early access' },
                  { icon: Building2, text: 'Register partnership interest for your facility' },
                  { icon: MessageSquare, text: 'Share your travel healthcare pain points' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3 text-gray-700">
                      <div className="w-8 h-8 rounded-lg bg-care-50 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-care-600" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/waitlist"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
                >
                  Join Waitlist
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/feedback"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Share Feedback
                </Link>
                <Link
                  to="/investor"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  For Investors
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-purple-50 to-care-50 border border-purple-100 p-8 flex items-center justify-center">
                <div className="text-center max-w-xs">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-care-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Get in Touch</h3>
                  <p className="text-sm text-gray-500">
                    Have questions or want to contribute? Reach out to us at{' '}
                    <a href="mailto:vdlkondayash1208@gmail.com" className="text-care-600 hover:underline font-medium">
                      vdlkondayash1208@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-care-600 to-care-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
            <path d="M0 50C240 0 480 100 720 50C960 0 1200 100 1440 50V0H0V50Z" fill="#f9fafb" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20 mb-4">
            <Target className="w-3 h-3" />
            Early Stage
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Be Part of the Journey
          </h2>
          <p className="text-lg text-care-200 max-w-2xl mx-auto mb-10">
            CareRoam is in validation phase. Join our waitlist, share your feedback, or partner with us 
            to make travel healthcare accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-care-700 font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              Join the Waitlist
            </Link>
            <Link
              to="/feedback"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-care-500/20 backdrop-blur-sm text-white font-semibold text-lg border border-care-400/30 hover:bg-care-500/30 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              Share Your Input
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
