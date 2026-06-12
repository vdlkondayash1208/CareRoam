import { useState } from 'react';
import { Search as SearchIcon, Stethoscope, Heart, Pill, Ambulance, Loader2, X, Building2, Users, MessageSquare, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'hospital', label: 'Hospitals', icon: Stethoscope, color: 'red' },
  { id: 'doctor', label: 'Doctors', icon: Heart, color: 'blue' },
  { id: 'pharmacy', label: 'Pharmacies', icon: Pill, color: 'green' },
  { id: 'ambulance', label: 'Ambulances', icon: Ambulance, color: 'orange' },
] as const;

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate a short delay to show the UI flow
    setTimeout(() => {
      setIsSearching(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Validation Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-4">
              <Building2 className="w-3 h-3" />
              Provider network being built — prototype search below
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Healthcare</h1>
            <p className="text-gray-600 mb-6">Search for hospitals, doctors, pharmacies, and ambulances near you</p>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search by city or location..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-care-400 focus:ring-2 focus:ring-care-500/20 outline-none transition-all text-gray-900"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-care-500 to-care-600 text-white font-semibold shadow-lg shadow-care-500/25 hover:shadow-care-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <SearchIcon className="w-5 h-5" />
                  )}
                  Search
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-care-500 text-white shadow-md shadow-care-500/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-care-500 text-white shadow-md shadow-care-500/25'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isSearching ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-care-500 mx-auto mb-4" />
              <p className="text-gray-500">Searching provider network...</p>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="max-w-2xl mx-auto">
            {/* Onboarding Message */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Coming Soon to {searchQuery || 'Your City'}
              </h2>
              <p className="text-gray-600 mb-2 max-w-md mx-auto">
                Verified healthcare partners are currently being onboarded in this region. 
                We're actively building our network to ensure you get trusted care.
              </p>
              <p className="text-sm text-amber-600 bg-amber-50 rounded-xl px-4 py-3 mb-8">
                🏗️ CareRoam is in validation phase. No fake provider data is displayed — 
                we believe in transparency from day one.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/waitlist"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-care-500 text-white font-medium hover:bg-care-600 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Join the Waitlist
                </Link>
                <Link
                  to="/partner"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  Register Partnership Interest
                </Link>
              </div>
            </div>

            {/* What You Can Do While Waiting */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/assistant"
                className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <MessageSquare className="w-8 h-8 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">AI Health Assistant</h3>
                <p className="text-xs text-gray-500">Get health travel tips</p>
              </Link>
              <Link
                to="/emergency"
                className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <Shield className="w-8 h-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Emergency Contacts</h3>
                <p className="text-xs text-gray-500">National helpline numbers</p>
              </Link>
              <Link
                to="/language"
                className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <Globe className="w-8 h-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Translation Tools</h3>
                <p className="text-xs text-gray-500">Medical phrases in 3 languages</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-care-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-10 h-10 text-care-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Search for Healthcare</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              Enter a location above to search for hospitals, doctors, pharmacies, and ambulance services.
            </p>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Note: CareRoam is currently onboarding providers. Search results will show availability as partners join.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
