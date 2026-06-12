import { useState } from 'react';
import { MessageSquare, Lightbulb, Bug, Heart, Send, Check, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const feedbackTypes = [
  { id: 'feature', label: 'Feature Request', icon: Lightbulb },
  { id: 'pain-point', label: 'Travel Health Pain Point', icon: Bug },
  { id: 'general', label: 'General Feedback', icon: MessageSquare },
  { id: 'praise', label: 'Something You Love', icon: Heart },
];

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', feedbackType: 'general', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h2>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Your feedback will directly shape CareRoam's development. We read every submission carefully.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-medium mb-4">
            <Lightbulb className="w-3 h-3" />
            Help Shape CareRoam
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Share Your Input
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            As an early-stage startup, your feedback is our most valuable asset. 
            Tell us about your travel healthcare experiences, pain points, or ideas.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Feedback Type</label>
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
                        {ft.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Feedback</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={form.feedbackType === 'feature' ? "What feature would you like to see?" :
                  form.feedbackType === 'pain-point' ? "Describe a health-related challenge you've faced while traveling..." :
                  form.feedbackType === 'praise' ? "What do you like about CareRoam so far?" :
                  "Share your thoughts, ideas, or suggestions..."}
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
                  Submit Feedback
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Why Your Feedback Matters</p>
              <p className="text-sm text-amber-700">
                CareRoam is in validation phase, which means your input directly influences what we build. 
                Every piece of feedback helps us understand real traveler needs and create a better product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
