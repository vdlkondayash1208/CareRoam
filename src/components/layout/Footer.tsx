import { Link } from 'react-router-dom';
import { Heart, Stethoscope, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-care-500 to-care-700 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Care<span className="text-care-400">Roam</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Trusted healthcare for travelers anywhere. Your safety is our priority, whether you're exploring new cities or on a business trip.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-care-600 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-care-600 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/search" className="text-sm hover:text-care-400 transition-colors">Find Healthcare</Link>
              </li>
              <li>
                <Link to="/waitlist" className="text-sm hover:text-care-400 transition-colors">Join Waitlist</Link>
              </li>
              <li>
                <Link to="/assistant" className="text-sm hover:text-care-400 transition-colors">AI Health Assistant</Link>
              </li>
              <li>
                <Link to="/emergency" className="text-sm hover:text-care-400 transition-colors">Emergency Help</Link>
              </li>
              <li>
                <Link to="/language" className="text-sm hover:text-care-400 transition-colors">Language Support</Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">More</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/partner" className="text-sm hover:text-care-400 transition-colors">Partner With Us</Link>
              </li>
              <li>
                <Link to="/feedback" className="text-sm hover:text-care-400 transition-colors">Share Feedback</Link>
              </li>
              <li>
                <Link to="/investor" className="text-sm hover:text-care-400 transition-colors">Investor Overview</Link>
              </li>
              <li>
                <Link to="/founder" className="text-sm hover:text-care-400 transition-colors">Founder Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Healthcare Types</h3>
            <ul className="space-y-3">
              <li>              <span className="text-sm text-gray-400">Hospitals</span>
            </li>
            <li>
                <span className="text-sm text-gray-400">General Physicians</span>
            </li>
            <li>
                <span className="text-sm text-gray-400">Pharmacies</span>
            </li>
            <li>
                <span className="text-sm text-gray-400">Ambulance Services</span>
            </li>
            <li>
                <span className="text-sm text-gray-400">Specialists</span>
            </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-care-400 flex-shrink-0" />
                <a href="tel:+919440584274" className="hover:text-care-400 transition-colors">+91 9440584274</a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-care-400 flex-shrink-0" />
                <a href="mailto:vdlkondayash1208@gmail.com" className="hover:text-care-400 transition-colors">vdlkondayash1208@gmail.com</a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-care-400 flex-shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CareRoam. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            Made with <Heart className="w-3.5 h-3.5 text-emergency fill-emergency" /> for travelers worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
