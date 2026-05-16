import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Compass, MessageCircle, Map, Users, LayoutDashboard,
  Menu, X, LogOut, MapPin, User
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/planner', label: 'Trip Planner', icon: MapPin },
    { to: '/chat', label: 'Travel Chat', icon: MessageCircle },
    { to: '/explore', label: 'Explore', icon: Map },
    { to: '/buddies', label: 'Find a Guide', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="logo-link">
            <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-warm-gray-800 hidden sm:block">
              TouristBuddy
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(to)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-warm-gray-500 hover:text-warm-gray-800 hover:bg-warm-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive('/dashboard')
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-warm-gray-500 hover:text-warm-gray-800 hover:bg-warm-gray-100'
                  }`}
                  id="dashboard-link"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sand-100 border border-sand-200">
                  <User className="w-4 h-4 text-brand-600" />
                  <span className="text-sm text-warm-gray-700 font-medium">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="p-2 rounded-lg text-warm-gray-400 hover:text-error-600 hover:bg-error-50 transition-all" title="Logout" id="logout-btn">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-warm-gray-600 hover:text-warm-gray-800 hover:bg-warm-gray-100 transition-all" id="login-link">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary text-sm !py-2 !px-4" id="signup-link">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg text-warm-gray-500 hover:text-warm-gray-800" id="mobile-menu-toggle">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-warm-gray-200 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(to) ? 'bg-brand-50 text-brand-700' : 'text-warm-gray-500 hover:text-warm-gray-800 hover:bg-warm-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-warm-gray-500 hover:text-warm-gray-800 hover:bg-warm-gray-100">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-error-600 hover:bg-error-50">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-warm-gray-200">
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center px-3 py-2.5 rounded-lg text-sm font-medium text-warm-gray-600 hover:bg-warm-gray-100">Log In</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1 text-center btn-primary text-sm !py-2.5">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
