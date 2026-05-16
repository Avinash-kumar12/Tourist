import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyTrips, deleteTrip, getMyBookings, getMyRequests, updateRequestStatus } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { MapPin as Plane, MapPin, Calendar, Trash2, Users, Check, XIcon, Clock, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('trips');
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    loadData();
  }, [user, tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === 'trips') { const { data } = await getMyTrips(); setTrips(data); }
      else if (tab === 'bookings') { const { data } = await getMyBookings(); setBookings(data); }
      else if (tab === 'requests') { const { data } = await getMyRequests(); setRequests(data); }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDeleteTrip = async (id) => {
    if (!confirm('Delete this trip?')) return;
    try { await deleteTrip(id); setTrips(trips.filter(t => t._id !== id)); } catch (err) { console.error(err); }
  };

  const handleRequestAction = async (id, status) => {
    try { await updateRequestStatus(id, status); loadData(); } catch (err) { console.error(err); }
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
    ...(user?.role === 'guide' ? [{ id: 'requests', label: 'Guide Requests', icon: Clock }] : [])
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
                            <button onClick={() => handleRequestAction(r._id, 'rejected')} className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-red-100 border border-red-100"><XIcon className="w-4 h-4" /></button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
