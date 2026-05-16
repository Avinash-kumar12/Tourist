import { Link } from 'react-router-dom';
import {
  MapPin, MessageCircle, Map, Users, ArrowRight,
  Globe, Shield, Star, ChevronRight, Compass
} from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Trip Planner',
    desc: 'Generate personalized day-wise itineraries. Just tell us your destination, budget, and interests — we handle the rest.',
    to: '/planner',
    color: 'bg-brand-100 text-brand-700'
  },
  {
    icon: MessageCircle,
    title: 'Travel Chat',
    desc: 'Ask anything about Indian travel — from best street food spots to hidden temples. Get expert answers instantly.',
    to: '/chat',
    color: 'bg-violet-100 text-violet-700'
  },
  {
    icon: Map,
    title: 'Explore Places',
    desc: 'Discover popular destinations across India with detailed info, timings, tips, and location details.',
    to: '/explore',
    color: 'bg-emerald-100 text-emerald-700'
  },
  {
    icon: Users,
    title: 'Local Guides',
    desc: 'Connect with verified local guides who speak your language and know the hidden gems of their city.',
    to: '/buddies',
    color: 'bg-amber-100 text-amber-700'
  },
];

const cities = [
  { name: 'Delhi', emoji: '🏛️', desc: 'History & Heritage' },
  { name: 'Mumbai', emoji: '🌊', desc: 'City of Dreams' },
  { name: 'Jaipur', emoji: '🏰', desc: 'The Pink City' },
  { name: 'Goa', emoji: '🏖️', desc: 'Beach Paradise' },
  { name: 'Varanasi', emoji: '🕉️', desc: 'Spiritual Capital' },
  { name: 'Agra', emoji: '🕌', desc: 'Taj Mahal' },
];

const Home = () => {
  return (
    <div className="min-h-screen" id="home-page">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden" id="hero-section">
        {/* Subtle warm background accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-200/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="badge mb-8 animate-fade-in">
            <Compass className="w-4 h-4" />
            <span>Your Travel Companion for India</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-warm-gray-900 animate-slide-up">
            Discover <span className="heading-accent">Incredible</span>
            <br />
            India
          </h1>

          <p className="text-lg sm:text-xl text-warm-gray-500 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Plan your perfect Indian adventure with curated itineraries,
            expert travel advice, and local guides who bring destinations to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/planner" className="btn-primary text-base !px-8 !py-3.5 group" id="hero-plan-btn">
              Plan Your Trip
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/explore" className="btn-secondary text-base !px-8 !py-3.5" id="hero-explore-btn">
              <Compass className="w-5 h-5" />
              Explore Places
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 max-w-md mx-auto mt-16 gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div>
              <p className="text-3xl font-bold text-warm-gray-800">6+</p>
              <p className="text-sm text-warm-gray-400">Cities</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-warm-gray-800">50+</p>
              <p className="text-sm text-warm-gray-400">Places</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-warm-gray-800">100+</p>
              <p className="text-sm text-warm-gray-400">Guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="features-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-warm-gray-800 mb-4">
              Everything You Need to <span className="heading-accent">Travel Smart</span>
            </h2>
            <p className="text-warm-gray-500 text-lg max-w-2xl mx-auto">
              From personalized itineraries to local guides, we've got everything covered for your Indian adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <Link
                key={i}
                to={feature.to}
                className="card-interactive p-8 group"
                id={`feature-card-${i}`}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-warm-gray-800 mb-2 flex items-center gap-2">
                  {feature.title}
                  <ChevronRight className="w-5 h-5 text-warm-gray-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                </h3>
                <p className="text-warm-gray-500 leading-relaxed">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-warm" id="cities-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-warm-gray-800 mb-4">
              Popular <span className="heading-accent">Destinations</span>
            </h2>
            <p className="text-warm-gray-500">Start exploring these iconic Indian cities</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city, i) => (
              <Link
                key={i}
                to="/explore"
                className="card-interactive p-5 text-center group"
                id={`city-card-${city.name.toLowerCase()}`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{city.emoji}</div>
                <h3 className="font-semibold text-warm-gray-800">{city.name}</h3>
                <p className="text-xs text-warm-gray-400 mt-1">{city.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tourist Buddy CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="buddy-cta-section">
        <div className="max-w-4xl mx-auto">
          <div className="card p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-amber-400" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-6 border-2 border-brand-200">
                <Users className="w-8 h-8 text-brand-700" />
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-warm-gray-800 mb-4">
                Meet Your <span className="heading-accent">Local Guide</span>
              </h2>
              <p className="text-warm-gray-500 text-lg max-w-lg mx-auto mb-8">
                Connect with verified local guides who speak your language,
                know the hidden gems, and make your trip truly unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/buddies" className="btn-primary text-base !px-8 !py-3.5 group" id="cta-find-buddy">
                  Find a Guide
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/register" className="btn-secondary text-base !px-8 !py-3.5" id="cta-become-guide">
                  Become a Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-warm-gray-200" id="trust-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-success-50 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="font-semibold text-warm-gray-800 text-lg mb-1">Verified Guides</h3>
              <p className="text-warm-gray-500 text-sm">All local guides are verified for your safety</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-warm-gray-800 text-lg mb-1">Multi-Language</h3>
              <p className="text-warm-gray-500 text-sm">Guides speaking Hindi, English, and regional languages</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-warm-gray-800 text-lg mb-1">Curated Itineraries</h3>
              <p className="text-warm-gray-500 text-sm">Expert-crafted trips tailored to your preferences</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
