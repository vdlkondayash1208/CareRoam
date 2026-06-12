import { useState } from 'react';
import { Users, Mail, MapPin, Calendar, Check, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WaitlistForm {
  name: string;
  email: string;
  city: string;
  travelFrequency: string;
}

const travelOptions = [
  'Monthly',
  'Quarterly',
  'Yearly',
  'Less than once a year',
];

export default function Waitlist() {
  const [form, setForm] = useState<WaitlistForm>({ name: '', email: '', city: '', travelFrequency: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateForm = (field: keyof WaitlistForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">You're on the List!</h2>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Thanks for joining the CareRoam waitlist, {form.name}! We'll notify you when we launch in {form.city || 'your city'}.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              In the meantime, check out our prototype features and share your feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/feedback"
                className="px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
              >
                Share Feedback
              </Link>
              <Link
                to="/search"
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Explore Prototype
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-care-500 to-care-600 flex items-center justify-center mb-6 shadow-lg shadow-care-500/25">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Join the CareRoam Waitlist
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Be among the first to access trusted healthcare while traveling. 
              We're building a network of verified providers and need early users like you to shape the product.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Sparkles, text: 'Early access when we launch in your city' },
                { icon: Mail, text: 'Monthly updates on our progress' },
                { icon: MapPin, text: 'Help us prioritize cities for launch' },
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

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <strong>🏗️ Validation Phase:</strong> CareRoam is currently in early development. 
                Joining the waitlist helps us demonstrate demand to partners and investors.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Get Early Access</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Users className="w-4 h-4 inline mr-1.5 text-gray-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Mail className="w-4 h-4 inline mr-1.5 text-gray-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <MapPin className="w-4 h-4 inline mr-1.5 text-gray-400" />
                  Your City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateForm('city', e.target.value)}
                  placeholder="e.g., Mumbai"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Calendar className="w-4 h-4 inline mr-1.5 text-gray-400" />
                  Travel Frequency
                </label>
                <select
                  value={form.travelFrequency}
                  onChange={(e) => updateForm('travelFrequency', e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900 appearance-none"
                >
                  <option value="">Select frequency...</option>
                  {travelOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
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
                    Join Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                No spam, ever. We'll only email you about launch updates and important milestones.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
