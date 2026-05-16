import { Compass, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-warm-gray-800 text-warm-gray-300" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">TouristBuddy</span>
            </div>
            <p className="text-warm-gray-400 text-sm leading-relaxed max-w-sm">
              Your trusted companion for exploring the incredible diversity of India.
              Plan trips, connect with local guides, and discover hidden gems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Explore</h4>
            <div className="space-y-2.5">
              <Link to="/planner" className="block text-sm text-warm-gray-400 hover:text-brand-300 transition">Trip Planner</Link>
              <Link to="/chat" className="block text-sm text-warm-gray-400 hover:text-brand-300 transition">Travel Chat</Link>
              <Link to="/explore" className="block text-sm text-warm-gray-400 hover:text-brand-300 transition">Places</Link>
              <Link to="/buddies" className="block text-sm text-warm-gray-400 hover:text-brand-300 transition">Local Guides</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Support</h4>
            <div className="space-y-2.5">
              <a href="#" className="block text-sm text-warm-gray-400 hover:text-brand-300 transition">Help Center</a>
              <a href="#" className="block text-sm text-warm-gray-400 hover:text-brand-300 transition">Safety Tips</a>
              <a href="#" className="block text-sm text-warm-gray-400 hover:text-brand-300 transition">Privacy Policy</a>
              <a href="#" className="block text-sm text-warm-gray-400 hover:text-brand-300 transition">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="border-t border-warm-gray-700 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray-500 text-sm">© 2026 TouristBuddy. All rights reserved.</p>
          <p className="text-warm-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
