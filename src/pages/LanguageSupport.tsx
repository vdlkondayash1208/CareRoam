import { useState } from 'react';
import { Languages, Search, Copy, Check, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { samplePhrases } from '../data/sampleData';

const categories = ['All', 'Emergency', 'Symptoms', 'Pharmacy', 'Allergies', 'General', 'Medical'];

export default function LanguageSupport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredPhrases = samplePhrases.filter((phrase) => {
    const matchesSearch =
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.hindi.includes(searchQuery) ||
      phrase.telugu.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All' || phrase.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
            <Languages className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Medical Phrase Translator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Translate common medical phrases into English, Hindi, and Telugu. 
            Communicate better with healthcare providers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-28">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-care-50 text-care-700'
                        : 'text-gray-600 hover:text-care-600 hover:bg-care-50/50'
                    }`}
                  >
                    {cat === 'All' ? '📋 All Phrases' : 
                     cat === 'Emergency' ? '🚨 ' : 
                     cat === 'Symptoms' ? '🤒 ' : 
                     cat === 'Pharmacy' ? '💊 ' : 
                     cat === 'Allergies' ? '⚠️ ' : 
                     cat === 'General' ? '💬 ' : '🏥 '}
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search phrases in English, Hindi, or Telugu..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>

            {/* Language Labels */}
            <div className="grid grid-cols-3 gap-3 mb-4 px-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100">
                <span className="text-sm font-medium text-blue-700">🇬🇧 English</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 border border-orange-100">
                <span className="text-sm font-medium text-orange-700">🇮🇳 Hindi</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border border-purple-100">
                <span className="text-sm font-medium text-purple-700">🇮🇳 Telugu</span>
              </div>
            </div>

            {/* Phrases List */}
            {filteredPhrases.length > 0 ? (
              <div className="space-y-3">
                {filteredPhrases.map((phrase) => (
                  <div
                    key={phrase.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Desktop View */}
                    <div className="hidden sm:grid grid-cols-3 gap-4 p-5">
                      {/* English */}
                      <div className="relative group">
                        <p className="text-sm text-gray-900 font-medium">{phrase.english}</p>
                        <button
                          onClick={() => copyToClipboard(phrase.english, `en-${phrase.id}`)}
                          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
                        >
                          {copiedId === `en-${phrase.id}` ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>

                      {/* Hindi */}
                      <div className="relative group">
                        <p className="text-sm text-gray-900">{phrase.hindi}</p>
                        <button
                          onClick={() => copyToClipboard(phrase.hindi, `hi-${phrase.id}`)}
                          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
                        >
                          {copiedId === `hi-${phrase.id}` ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>

                      {/* Telugu */}
                      <div className="relative group">
                        <p className="text-sm text-gray-900">{phrase.telugu}</p>
                        <button
                          onClick={() => copyToClipboard(phrase.telugu, `te-${phrase.id}`)}
                          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
                        >
                          {copiedId === `te-${phrase.id}` ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="sm:hidden">
                      <button
                        onClick={() => setExpandedId(expandedId === phrase.id ? null : phrase.id)}
                        className="w-full flex items-center justify-between p-4"
                      >
                        <div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            phrase.category === 'Emergency' ? 'bg-red-50 text-red-600' :
                            phrase.category === 'Symptoms' ? 'bg-yellow-50 text-yellow-700' :
                            phrase.category === 'Pharmacy' ? 'bg-green-50 text-green-700' :
                            phrase.category === 'Allergies' ? 'bg-orange-50 text-orange-700' :
                            'bg-blue-50 text-blue-700'
                          }`}>
                            {phrase.category}
                          </span>
                          <p className="text-sm text-gray-900 font-medium mt-2">{phrase.english}</p>
                        </div>
                        {expandedId === phrase.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {expandedId === phrase.id && (
                        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                          <div>
                            <p className="text-xs text-orange-600 font-medium mb-1">🇮🇳 Hindi</p>
                            <p className="text-sm text-gray-900 flex items-center justify-between">
                              {phrase.hindi}
                              <button onClick={() => copyToClipboard(phrase.hindi, `hi-${phrase.id}`)}>
                                {copiedId === `hi-${phrase.id}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                              </button>
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-purple-600 font-medium mb-1">🇮🇳 Telugu</p>
                            <p className="text-sm text-gray-900 flex items-center justify-between">
                              {phrase.telugu}
                              <button onClick={() => copyToClipboard(phrase.telugu, `te-${phrase.id}`)}>
                                {copiedId === `te-${phrase.id}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                              </button>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No phrases found</h3>
                <p className="text-gray-500">Try a different search or category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
