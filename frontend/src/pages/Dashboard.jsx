import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getMyTrips, deleteTrip, getMyBookings, getMyRequests, 
  updateRequestStatus, getMyBuddyProfile, upsertBuddyProfile, toggleAvailability 
} from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { 
  Plane, MapPin, Calendar, Trash2, Users, Check, X, Clock, Plus, 
  User, Languages, Award, Shield, CheckCircle, Edit, Star 
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('trips');
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Guide Profile States
  const [profile, setProfile] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    city: '',
    languages: '',
    pricePerDay: '',
    bio: '',
    specialties: '',
    experience: ''
  });
  const [profileSubmitLoading, setProfileSubmitLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    loadData();
  }, [user, tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === 'trips') { 
        const { data } = await getMyTrips(); 
        setTrips(data); 
      }
      else if (tab === 'bookings') { 
        const { data } = await getMyBookings(); 
        setBookings(data); 
      }
      else if (tab === 'requests') { 
        const { data } = await getMyRequests(); 
        setRequests(data); 
      }
      else if (tab === 'profile' && user?.role === 'guide') {
        const { data } = await getMyBuddyProfile();
        setProfile(data);
        if (data) {
          setProfileFormData({
            city: data.city || '',
            languages: data.languages ? data.languages.join(', ') : '',
            pricePerDay: data.pricePerDay || '',
            bio: data.bio || '',
            specialties: data.specialties ? data.specialties.join(', ') : '',
            experience: data.experience || ''
          });
        }
      }
    } catch (err) { 
      console.error(err); 
    }
    setLoading(false);
  };

  const handleDeleteTrip = async (id) => {
    if (!confirm('Delete this trip?')) return;
    try { await deleteTrip(id); setTrips(trips.filter(t => t._id !== id)); } catch (err) { console.error(err); }
  };

  const handleRequestAction = async (id, status) => {
    try { await updateRequestStatus(id, status); loadData(); } catch (err) { console.error(err); }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileSubmitLoading(true);
    try {
      const parsedData = {
        city: profileFormData.city,
        pricePerDay: Number(profileFormData.pricePerDay),
        experience: Number(profileFormData.experience),
        bio: profileFormData.bio,
        languages: profileFormData.languages.split(',').map(l => l.trim()).filter(l => l !== ''),
        specialties: profileFormData.specialties.split(',').map(s => s.trim()).filter(s => s !== '')
      };

      const { data } = await upsertBuddyProfile(parsedData);
      setProfile(data);
      setIsEditingProfile(false);
      alert('Profile updated successfully!');
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save profile. Please try again.');
    } finally {
      setProfileSubmitLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    setToggleLoading(true);
    try {
      const { data } = await toggleAvailability();
      setProfile(prev => prev ? { ...prev, isAvailable: data.isAvailable } : null);
    } catch (err) {
      alert('Failed to toggle availability.');
    } finally {
      setToggleLoading(false);
    }
  };

  const statusColors = {
    pending: 'text-amber-700 bg-amber-50 border-amber-100',
    accepted: 'text-success-600 bg-success-50 border-green-100',
    rejected: 'text-error-600 bg-error-50 border-red-100',
    completed: 'text-brand-700 bg-brand-50 border-brand-100',
    cancelled: 'text-warm-gray-500 bg-warm-gray-100 border-warm-gray-200'
  };

  const tabs = [
    { id: 'trips', label: 'My Trips', icon: Plane },
    { id: 'bookings', label: 'My Bookings', icon: Users },
    ...(user?.role === 'guide' ? [
      { id: 'requests', label: 'Guide Requests', icon: Clock },
      { id: 'profile', label: 'Guide Profile', icon: User }
    ] : [])
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8" id="dashboard-page">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 animate-slide-up">
          <h1 className="font-display font-bold text-3xl text-warm-gray-800 mb-2">
            Welcome back, <span className="heading-accent">{user?.name}</span>
          </h1>
          <p className="text-warm-gray-500">Manage your trips, bookings, and guide profile</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${tab === t.id ? 'bg-brand-600 text-white' : 'bg-white border border-warm-gray-200 text-warm-gray-500 hover:text-warm-gray-800 hover:border-warm-gray-300'}`} id={`tab-${t.id}`}>
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>

        {loading ? <Loading /> : (
          <>
            {tab === 'trips' && (
              <div className="space-y-4">
                {trips.length === 0 ? (
                  <div className="card p-12 text-center" id="no-trips">
                    <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4 border border-brand-200">
                      <Plane className="w-7 h-7 text-brand-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-warm-gray-800 mb-2">No trips yet</h3>
                    <p className="text-warm-gray-500 mb-4">Create your first personalized itinerary!</p>
                    <Link to="/planner" className="btn-primary" id="plan-trip-btn"><Plus className="w-4 h-4" />Plan a Trip</Link>
                  </div>
                ) : trips.map(trip => (
                  <div key={trip._id} className="card p-5 flex items-center justify-between" id={`trip-${trip._id}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 border border-brand-200"><Plane className="w-6 h-6" /></div>
                      <div>
                        <h3 className="font-semibold text-warm-gray-800">{trip.title || trip.destination}</h3>
                        <div className="flex items-center gap-3 text-sm text-warm-gray-500 mt-1">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{trip.destination}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{trip.days} days</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteTrip(trip._id)} className="p-2 rounded-lg text-warm-gray-400 hover:text-error-600 hover:bg-error-50 transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="card p-12 text-center" id="no-bookings">
                    <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-4 border border-amber-100">
                      <Users className="w-7 h-7 text-amber-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-warm-gray-800 mb-2">No bookings yet</h3>
                    <p className="text-warm-gray-500 mb-4">Find a local guide to enhance your trip!</p>
                    <Link to="/buddies" className="btn-primary" id="find-buddy-btn">Find a Guide</Link>
                  </div>
                ) : bookings.map(b => (
                  <div key={b._id} className="card p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-warm-gray-800">{b.buddy?.user?.name || 'Guide'}</h3>
                        <p className="text-sm text-warm-gray-500">{new Date(b.startDate).toLocaleDateString()} - {new Date(b.endDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-success-600 font-medium text-sm">₹{b.totalCost}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${statusColors[b.status]}`}>{b.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'requests' && (
              <div className="space-y-4">
                {requests.length === 0 ? (
                  <div className="card p-12 text-center" id="no-requests">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                      <Clock className="w-7 h-7 text-blue-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-warm-gray-800 mb-2">No requests yet</h3>
                    <p className="text-warm-gray-500">Requests from tourists will appear here.</p>
                  </div>
                ) : requests.map(r => (
                  <div key={r._id} className="card p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-warm-gray-800">{r.tourist?.name || 'Tourist'}</h3>
                        <p className="text-sm text-warm-gray-500">{new Date(r.startDate).toLocaleDateString()} - {new Date(r.endDate).toLocaleDateString()}</p>
                        {r.message && <p className="text-sm text-warm-gray-400 mt-1">"{r.message}"</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        {r.status === 'pending' ? (
                          <>
                            <button onClick={() => handleRequestAction(r._id, 'accepted')} className="p-2 rounded-lg bg-success-50 text-success-600 hover:bg-green-100 border border-green-100"><Check className="w-4 h-4" /></button>
                            <button onClick={() => handleRequestAction(r._id, 'rejected')} className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-red-100 border border-red-100"><X className="w-4 h-4" /></button>
                          </>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${statusColors[r.status]}`}>{r.status}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'profile' && user?.role === 'guide' && (
              <div className="space-y-6">
                {/* Profile Not Found State */}
                {!profile && !isEditingProfile ? (
                  <div className="card p-12 text-center" id="no-profile">
                    <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4 border border-brand-200">
                      <User className="w-7 h-7 text-brand-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-warm-gray-800 mb-2">Create Guide Profile</h3>
                    <p className="text-warm-gray-500 mb-6">Complete your guide profile to start receiving tourist booking requests!</p>
                    <button onClick={() => setIsEditingProfile(true)} className="btn-primary" id="create-profile-btn">
                      <Plus className="w-4 h-4" />Set Up Profile
                    </button>
                  </div>
                ) : null}

                {/* Profile Edit Mode or New Profile Creation Form */}
                {isEditingProfile && (
                  <form onSubmit={handleProfileSubmit} className="card p-6 space-y-6 animate-slide-up" id="guide-profile-form">
                    <div className="flex justify-between items-center border-b border-warm-gray-100 pb-3">
                      <h3 className="font-bold text-xl text-warm-gray-800">
                        {profile ? 'Edit Guide Profile' : 'Set Up Guide Profile'}
                      </h3>
                      {profile && (
                        <button 
                          type="button" 
                          onClick={() => setIsEditingProfile(false)} 
                          className="text-sm font-medium text-warm-gray-500 hover:text-warm-gray-800 transition"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-warm-gray-700 mb-1">City of Operations</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Jaipur, Goa, Delhi"
                          value={profileFormData.city}
                          onChange={e => setProfileFormData({ ...profileFormData, city: e.target.value })}
                          className="input-dark"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-warm-gray-700 mb-1">Languages (comma-separated)</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., English, Hindi, Spanish"
                          value={profileFormData.languages}
                          onChange={e => setProfileFormData({ ...profileFormData, languages: e.target.value })}
                          className="input-dark"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-warm-gray-700 mb-1">Price Per Day (INR)</label>
                        <input
                          type="number"
                          required
                          min="0"
                          placeholder="e.g., 1500"
                          value={profileFormData.pricePerDay}
                          onChange={e => setProfileFormData({ ...profileFormData, pricePerDay: e.target.value })}
                          className="input-dark"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-warm-gray-700 mb-1">Years of Experience</label>
                        <input
                          type="number"
                          required
                          min="0"
                          placeholder="e.g., 5"
                          value={profileFormData.experience}
                          onChange={e => setProfileFormData({ ...profileFormData, experience: e.target.value })}
                          className="input-dark"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-warm-gray-700 mb-1">Specialties (comma-separated)</label>
                      <input
                        type="text"
                        placeholder="e.g., Historical Walks, Food Tours, Photography"
                        value={profileFormData.specialties}
                        onChange={e => setProfileFormData({ ...profileFormData, specialties: e.target.value })}
                        className="input-dark"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-warm-gray-700 mb-1">Bio (max 500 characters)</label>
                      <textarea
                        rows="4"
                        maxLength="500"
                        placeholder="Write a warm greeting and brief background about your services..."
                        value={profileFormData.bio}
                        onChange={e => setProfileFormData({ ...profileFormData, bio: e.target.value })}
                        className="input-dark"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={profileSubmitLoading} 
                      className="btn-primary w-full py-3"
                      id="save-profile-btn"
                    >
                      {profileSubmitLoading ? 'Saving...' : 'Save Profile'}
                    </button>
                  </form>
                )}

                {/* Profile Details Mode */}
                {profile && !isEditingProfile && (
                  <div className="space-y-6">
                    {/* Header Summary Card */}
                    <div className="card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center border-2 border-brand-200">
                          <User className="w-8 h-8 text-brand-700" />
                        </div>
                        <div>
                          <h2 className="font-display font-bold text-2xl text-warm-gray-900 flex items-center gap-2">
                            {user?.name}
                            {profile.isVerified ? (
                              <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-50 text-success-600 border border-green-100">
                                <CheckCircle className="w-3 h-3" /> Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warm-gray-100 text-warm-gray-500 border border-warm-gray-200">
                                Pending Verification
                              </span>
                            )}
                          </h2>
                          <p className="text-warm-gray-500 text-sm">{profile.city} • Joined {new Date(profile.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <button 
                          onClick={() => setIsEditingProfile(true)} 
                          className="btn-secondary !py-2 !px-4 text-sm"
                        >
                          <Edit className="w-4 h-4" /> Edit Profile
                        </button>
                        <button
                          onClick={handleToggleAvailability}
                          disabled={toggleLoading}
                          className={`btn-accent !py-2 !px-4 text-sm ${profile.isAvailable ? 'bg-success-600 hover:bg-success-700' : 'bg-warm-gray-500 hover:bg-warm-gray-600'}`}
                        >
                          {profile.isAvailable ? 'Available' : 'Unavailable'}
                        </button>
                      </div>
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="card p-5 text-center">
                        <div className="text-amber-500 flex justify-center mb-1"><Star className="fill-amber-500 w-6 h-6" /></div>
                        <p className="text-2xl font-bold text-warm-gray-800">{profile.rating ? profile.rating.toFixed(1) : 'New'}</p>
                        <p className="text-xs text-warm-gray-400 mt-1">{profile.totalReviews || 0} reviews</p>
                      </div>
                      <div className="card p-5 text-center">
                        <div className="text-brand-600 flex justify-center mb-1"><Award className="w-6 h-6" /></div>
                        <p className="text-2xl font-bold text-warm-gray-800">{profile.experience} Years</p>
                        <p className="text-xs text-warm-gray-400 mt-1">Experience</p>
                      </div>
                      <div className="card p-5 text-center">
                        <div className="text-success-600 flex justify-center mb-1"><Plus className="w-6 h-6" /></div>
                        <p className="text-2xl font-bold text-warm-gray-800">₹{profile.pricePerDay.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-warm-gray-400 mt-1">Price Per Day</p>
                      </div>
                    </div>

                    {/* Detailed info card */}
                    <div className="card p-6 space-y-6">
                      {profile.bio && (
                        <div>
                          <h4 className="font-semibold text-warm-gray-800 mb-2">About Me</h4>
                          <p className="text-warm-gray-500 text-sm leading-relaxed">{profile.bio}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-warm-gray-100">
                        <div>
                          <h4 className="font-semibold text-warm-gray-800 mb-2 flex items-center gap-1">
                            <Languages className="w-4 h-4 text-brand-600" /> Languages Spoken
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {profile.languages?.map((lang, li) => (
                              <span key={li} className="px-2.5 py-1 bg-warm-gray-100 text-warm-gray-700 rounded-lg text-xs font-medium">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-warm-gray-800 mb-2 flex items-center gap-1">
                            <Award className="w-4 h-4 text-brand-600" /> Specialties & Tours
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {profile.specialties?.map((spec, si) => (
                              <span key={si} className="px-2.5 py-1 bg-brand-50 text-brand-700 border border-brand-100 rounded-lg text-xs font-medium">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
