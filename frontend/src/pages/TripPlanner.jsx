import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateTrip } from '../services/api';
import Loading from '../components/Loading';
import { MapPin, Calendar, Wallet, Heart, Clock, IndianRupee, Lightbulb, ChevronDown, ChevronUp, Send } from 'lucide-react';

const interestOptions = ['Historical Sites', 'Temples & Religion', 'Nature & Wildlife', 'Food & Street Food', 'Markets & Shopping', 'Adventure Sports', 'Art & Culture', 'Photography', 'Nightlife', 'Beaches', 'Mountains', 'Architecture'];

const TripPlanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ destination: '', days: 3, budget: 'moderate', interests: [] });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');
  const [expandedDay, setExpandedDay] = useState(null);

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setLoading(true); setError(''); setItinerary(null);
    try {
      const { data } = await generateTrip(formData);
      setItinerary(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate itinerary.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8" id="trip-planner-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-warm-gray-800 mb-4">
            Plan Your <span className="heading-accent">Dream Trip</span>
          </h1>
          <p className="text-warm-gray-500 text-lg max-w-xl mx-auto">
            Tell us where you want to go, and we'll craft a personalized itinerary just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-6 space-y-5 sticky top-24" id="trip-form">
              <div>
                <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />Destination
                </label>
                <input
                  type="text" placeholder="e.g., Jaipur, Kerala"
                  value={formData.destination}
                  onChange={e => setFormData({ ...formData, destination: e.target.value })}
                  className="input-dark" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />Days
                </label>
                <input
                  type="number" min="1" max="15"
                  value={formData.days}
                  onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) })}
                  className="input-dark" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                  <Wallet className="w-4 h-4 inline mr-1" />Budget
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['budget', 'moderate', 'luxury'].map(b => (
                    <button
                      key={b} type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                        formData.budget === b
                          ? 'bg-brand-600 text-white'
                          : 'bg-warm-gray-100 text-warm-gray-500 hover:bg-warm-gray-200 border border-warm-gray-200'
                      }`}
                    >{b}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                  <Heart className="w-4 h-4 inline mr-1" />Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(i => (
                    <button
                      key={i} type="button"
                      onClick={() => toggleInterest(i)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        formData.interests.includes(i)
                          ? 'bg-brand-600 text-white'
                          : 'bg-warm-gray-100 text-warm-gray-500 hover:bg-warm-gray-200 border border-warm-gray-200'
                      }`}
                    >{i}</button>
                  ))}
                </div>
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-error-50 border border-red-200 text-error-600 text-sm">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading || !formData.destination}
                className="w-full btn-primary !py-3.5 disabled:opacity-50"
                id="generate-btn"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate Itinerary
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-3">
            {loading && <Loading text="Crafting your itinerary..." />}
            {itinerary?.itineraryData && (
              <div className="animate-slide-up space-y-5">
                <div className="card p-6">
                  <h2 className="font-display font-bold text-2xl text-warm-gray-800 mb-2">
                    {itinerary.itineraryData.title || `Trip to ${itinerary.destination}`}
                  </h2>
                  {itinerary.itineraryData.summary && (
                    <p className="text-warm-gray-500 mb-4">{itinerary.itineraryData.summary}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-brand-600 font-medium">
                      <MapPin className="w-4 h-4" />{itinerary.destination}
                    </span>
                    <span className="flex items-center gap-1.5 text-success-600 font-medium">
                      <Calendar className="w-4 h-4" />{itinerary.days} Days
                    </span>
                    {itinerary.itineraryData.totalEstimatedBudget && (
                      <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                        <IndianRupee className="w-4 h-4" />{itinerary.itineraryData.totalEstimatedBudget}
                      </span>
                    )}
                  </div>
                </div>
                {itinerary.itineraryData.days?.map((day, di) => (
                  <div key={di} className="card overflow-hidden">
                    <button
                      onClick={() => setExpandedDay(expandedDay === di ? null : di)}
                      className="w-full flex items-center justify-between p-5 hover:bg-warm-gray-50 transition-colors"
                      id={`day-toggle-${di}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm border border-brand-200">
                          D{day.dayNumber}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-warm-gray-800">Day {day.dayNumber}</h3>
                          {day.theme && <p className="text-xs text-warm-gray-400">{day.theme}</p>}
                        </div>
                      </div>
                      {expandedDay === di
                        ? <ChevronUp className="w-5 h-5 text-warm-gray-400" />
                        : <ChevronDown className="w-5 h-5 text-warm-gray-400" />
                      }
                    </button>
                    {(expandedDay === di || expandedDay === null) && (
                      <div className="px-5 pb-5 space-y-4 border-t border-warm-gray-100 pt-4">
                        {day.activities?.map((a, ai) => (
                          <div key={ai} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-lg bg-warm-gray-100 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-brand-600" />
                              </div>
                              {ai < day.activities.length - 1 && (
                                <div className="w-0.5 flex-1 bg-warm-gray-200 mt-2" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="text-xs text-brand-600 font-medium mb-1">{a.time}</p>
                              <h4 className="font-semibold text-warm-gray-800">{a.location}</h4>
                              <p className="text-sm text-warm-gray-500 mt-1">{a.description}</p>
                              {a.tips && (
                                <p className="text-xs text-amber-700 mt-2 flex items-start gap-1 bg-amber-50 rounded-lg p-2">
                                  <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />{a.tips}
                                </p>
                              )}
                              {a.estimatedCost && (
                                <span className="inline-block mt-2 text-xs text-success-600 font-medium bg-success-50 px-2 py-1 rounded-lg">
                                  {a.estimatedCost}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {!loading && !itinerary && (
              <div className="card p-16 text-center" id="planner-placeholder">
                <div className="w-16 h-16 rounded-2xl bg-sand-100 flex items-center justify-center mx-auto mb-6 border border-sand-200">
                  <MapPin className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-gray-800 mb-2">Ready to Plan?</h3>
                <p className="text-warm-gray-500">Fill in your trip details and we'll create the perfect itinerary for you.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
