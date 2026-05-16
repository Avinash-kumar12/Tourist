import { useState, useEffect } from 'react';
import { getBuddies, sendBuddyRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BuddyCard from '../components/BuddyCard';
import Loading from '../components/Loading';
import { MapPin, Languages, IndianRupee, Users, Filter, X } from 'lucide-react';

const BuddyMarketplace = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ city: '', language: '', maxPrice: '' });
  const [showBooking, setShowBooking] = useState(null);
  const [bookingData, setBookingData] = useState({ startDate: '', endDate: '', message: '' });
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchBuddies = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.city) params.city = filters.city;
      if (filters.language) params.language = filters.language;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      const { data } = await getBuddies(params);
      setBuddies(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchBuddies(); }, []);

  const handleFilter = (e) => { e.preventDefault(); fetchBuddies(); };

  const handleConnect = (buddy) => {
    if (!user) { navigate('/login'); return; }
    setShowBooking(buddy);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await sendBuddyRequest({ buddyId: showBooking._id, ...bookingData });
      alert('Booking request sent successfully!');
      setShowBooking(null);
      setBookingData({ startDate: '', endDate: '', message: '' });
    } catch (err) { alert(err.response?.data?.message || 'Failed to send request'); }
    setBookingLoading(false);
  };

  const mockBuddies = [
    { _id: '1', user: { name: 'Rajesh Kumar' }, city: 'Jaipur', languages: ['Hindi', 'English', 'French'], pricePerDay: 1500, rating: 4.8, totalReviews: 42, bio: 'Born and raised in Jaipur. I know every hidden gem in the Pink City!', specialties: ['Heritage Walks', 'Food Tours', 'Photography'], experience: 5, isAvailable: true, isVerified: true },
    { _id: '2', user: { name: 'Priya Sharma' }, city: 'Delhi', languages: ['Hindi', 'English'], pricePerDay: 2000, rating: 4.9, totalReviews: 67, bio: 'History enthusiast and certified guide. Let me show you the real Delhi!', specialties: ['Historical Tours', 'Street Food', 'Markets'], experience: 8, isAvailable: true, isVerified: true },
    { _id: '3', user: { name: 'Arjun Nair' }, city: 'Goa', languages: ['English', 'Hindi', 'Konkani'], pricePerDay: 1800, rating: 4.7, totalReviews: 35, bio: 'Beach lover and adventure guide. From hidden beaches to best nightlife spots.', specialties: ['Beach Tours', 'Water Sports', 'Nightlife'], experience: 4, isAvailable: true, isVerified: false },
    { _id: '4', user: { name: 'Meera Patel' }, city: 'Varanasi', languages: ['Hindi', 'English', 'Sanskrit'], pricePerDay: 1200, rating: 4.6, totalReviews: 28, bio: 'Spiritual guide specializing in temple tours and Ganga Aarti experiences.', specialties: ['Temple Tours', 'Spiritual Walks', 'Yoga'], experience: 6, isAvailable: true, isVerified: true },
    { _id: '5', user: { name: 'Vikram Singh' }, city: 'Mumbai', languages: ['Hindi', 'English', 'Marathi'], pricePerDay: 2500, rating: 4.5, totalReviews: 53, bio: 'Bollywood insider and city explorer. Experience Mumbai like a local!', specialties: ['Bollywood Tours', 'Street Food', 'Nightlife'], experience: 7, isAvailable: true, isVerified: true },
    { _id: '6', user: { name: 'Ananya Reddy' }, city: 'Agra', languages: ['Hindi', 'English', 'Telugu'], pricePerDay: 1000, rating: 4.4, totalReviews: 19, bio: 'Taj Mahal expert. I\'ll help you capture the perfect sunrise shot!', specialties: ['Photography', 'History', 'Architecture'], experience: 3, isAvailable: false, isVerified: false },
  ];

  const displayBuddies = buddies.length > 0 ? buddies : mockBuddies;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8" id="buddies-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-warm-gray-800 mb-4">
            Find Your <span className="heading-accent">Local Guide</span>
          </h1>
          <p className="text-warm-gray-500 text-lg max-w-xl mx-auto">Connect with verified local guides who make your trip unforgettable</p>
        </div>

        <form onSubmit={handleFilter} className="card p-4 mb-8 animate-slide-up" id="buddies-filter">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
              <input type="text" placeholder="City" value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})} className="input-dark !pl-10" />
            </div>
            <div className="relative">
              <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
              <input type="text" placeholder="Language" value={filters.language} onChange={e => setFilters({...filters, language: e.target.value})} className="input-dark !pl-10" />
            </div>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
              <input type="number" placeholder="Max Price/Day" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: e.target.value})} className="input-dark !pl-10" />
            </div>
            <button type="submit" className="btn-primary" id="filter-btn"><Filter className="w-4 h-4" />Filter</button>
          </div>
        </form>

        {loading ? <Loading text="Finding guides..." /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayBuddies.map((buddy, i) => (
              <div key={buddy._id} style={{ animationDelay: `${i * 0.08}s` }}>
                <BuddyCard buddy={buddy} onConnect={handleConnect} />
              </div>
            ))}
          </div>
        )}

        {showBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" id="booking-modal">
            <div className="card p-6 w-full max-w-md relative animate-slide-up">
              <button onClick={() => setShowBooking(null)} className="absolute top-4 right-4 text-warm-gray-400 hover:text-warm-gray-800" id="close-modal"><X className="w-5 h-5" /></button>
              <h3 className="font-bold text-xl text-warm-gray-800 mb-1">Book {showBooking.user?.name}</h3>
              <p className="text-warm-gray-500 text-sm mb-5">₹{showBooking.pricePerDay}/day • {showBooking.city}</p>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-warm-gray-700 mb-1">Start Date</label>
                  <input type="date" required value={bookingData.startDate} onChange={e => setBookingData({...bookingData, startDate: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-gray-700 mb-1">End Date</label>
                  <input type="date" required value={bookingData.endDate} onChange={e => setBookingData({...bookingData, endDate: e.target.value})} className="input-dark" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-gray-700 mb-1">Message</label>
                  <textarea rows="3" placeholder="Tell the guide about your plans..." value={bookingData.message} onChange={e => setBookingData({...bookingData, message: e.target.value})} className="input-dark" />
                </div>
                <button type="submit" disabled={bookingLoading} className="w-full btn-primary !py-3 disabled:opacity-50" id="send-booking-btn">
                  {bookingLoading ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuddyMarketplace;
