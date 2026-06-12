import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Shield, Ambulance, MapPin, Bell, AlertTriangle, Copy, Check } from 'lucide-react';
import { emergencyContacts } from '../data/sampleData';

export default function Emergency() {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  

  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // Hospital and ambulance listings coming soon — provider network being built

  return (
    <div className="min-h-screen pt-20">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-emergency to-emergency-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Emergency Help</h1>
              <p className="text-red-100 text-sm sm:text-base">
                Immediate assistance when you need it the most. Save these numbers.
              </p>
            </div>
            <div className="sm:ml-auto">
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-center">
                <p className="text-xs text-red-200">National Emergency</p>
                <p className="text-2xl font-bold tracking-wider">112</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {[
            { number: '112', label: 'National Emergency', icon: Shield, color: 'bg-red-500' },
            { number: '108', label: 'Ambulance', icon: Ambulance, color: 'bg-orange-500' },
            { number: '100', label: 'Police', icon: Bell, color: 'bg-blue-500' },
            { number: '101', label: 'Fire Brigade', icon: AlertTriangle, color: 'bg-yellow-500' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-care-600 transition-colors">
                  {item.number}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.label}</p>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Contacts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-care-600" />
                  All Emergency Contacts
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {emergencyContacts.map((contact) => (
                  <div key={contact.service} className="hover:bg-gray-50 transition-colors">
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{contact.service}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{contact.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-lg font-bold text-care-600">{contact.number}</span>
                        <button
                          onClick={() => copyNumber(contact.number)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Copy number"
                        >
                          {copiedNumber === contact.number ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <a
                          href={`tel:${contact.number}`}
                          className="px-3 py-1.5 rounded-lg bg-care-500 text-white text-xs font-medium hover:bg-care-600 transition-colors"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Hospitals */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-care-600" />
                  Nearby Hospitals
                </h2>
              </div>
              <div className="px-6 py-8 text-center">
                <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">Hospital Network Coming Soon</p>
                <p className="text-xs text-gray-400">
                  CareRoam is currently onboarding hospital partners. 
                  This section will show nearby open hospitals once verified providers join our network.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ambulance Services */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-orange-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Ambulance className="w-5 h-5 text-orange-600" />
                  Ambulance Services
                </h2>
              </div>
              <div className="px-6 py-8 text-center">
                <Ambulance className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">Ambulance Network Coming Soon</p>
                <p className="text-xs text-gray-400">
                  We're building partnerships with ambulance providers. 
                  In the meantime, call 108 for government ambulance services or 112 for all emergencies.
                </p>
                <a
                  href="tel:108"
                  className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call 108 Now
                </a>
              </div>
            </div>

            {/* Emergency Tips */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Emergency Tips
              </h3>
              <ul className="space-y-3">
                {[
                  'Stay calm and call for help immediately',
                  'Know your current location for faster assistance',
                  'Keep emergency numbers saved in your phone',
                  'Carry a basic first-aid kit while traveling',
                  'Inform someone about your medical history',
                  'Save your hotel/hostel address and contact',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-care-500 mt-1.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-care-600 to-care-800 rounded-2xl p-6 text-white">
              <h3 className="text-base font-semibold mb-2">Need More Help?</h3>
              <p className="text-sm text-care-200 mb-4">
                Use our AI assistant for instant health guidance.
              </p>
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-care-700 text-sm font-medium hover:bg-care-50 transition-colors"
              >
                Ask AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
