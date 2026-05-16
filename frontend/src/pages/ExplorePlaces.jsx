import { useState, useEffect } from 'react';
import { getCities, getPlacesByCity } from '../services/api';
import Loading from '../components/Loading';
import { MapPin, Clock, IndianRupee, Lightbulb, ArrowLeft } from 'lucide-react';

const ExplorePlaces = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCities().then(({ data }) => { setCities(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleCityClick = async (cityId) => {
    setLoading(true);
    try {
      const { data } = await getPlacesByCity(cityId);
      setCityData(data);
      setSelectedCity(cityId);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const cityEmojis = { delhi: '🏛️', mumbai: '🌊', jaipur: '🏰', goa: '🏖️', varanasi: '🕉️', agra: '🕌' };

  if (loading) return <div className="pt-24"><Loading /></div>;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8" id="explore-page">
      <div className="max-w-6xl mx-auto">
        {!selectedCity ? (
          <>
            <div className="text-center mb-12 animate-slide-up">
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-warm-gray-800 mb-4">
                Explore <span className="heading-accent">India</span>
              </h1>
              <p className="text-warm-gray-500 text-lg">Discover popular destinations and hidden gems across India</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cities.map((city, i) => (
                <button key={city.id} onClick={() => handleCityClick(city.id)} className="card-interactive p-8 text-left group animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }} id={`explore-city-${city.id}`}>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cityEmojis[city.id] || '📍'}</div>
                  <h3 className="font-display font-bold text-2xl text-warm-gray-800 mb-2">{city.city}</h3>
                  <p className="text-warm-gray-500 text-sm mb-3">{city.description}</p>
                  <span className="text-brand-600 text-sm font-medium">{city.placeCount} attractions →</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button onClick={() => { setSelectedCity(null); setCityData(null); }} className="flex items-center gap-2 text-warm-gray-500 hover:text-warm-gray-800 transition mb-8" id="back-to-cities">
              <ArrowLeft className="w-4 h-4" /> Back to cities
            </button>
            <div className="mb-8 animate-slide-up">
              <h1 className="font-display font-bold text-4xl text-warm-gray-800 mb-2">{cityData?.city} {cityEmojis[selectedCity]}</h1>
              <p className="text-warm-gray-500 text-lg">{cityData?.description}</p>
            </div>
            <div className="space-y-5">
              {cityData?.places?.map((place, i) => (
                <div key={i} className="card p-6 animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }} id={`place-card-${i}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-warm-gray-800 mb-1">{place.name}</h3>
                      <span className="px-2.5 py-1 rounded-full bg-sand-100 text-brand-700 text-xs font-medium border border-sand-200">{place.category}</span>
                    </div>
                  </div>
                  <p className="text-warm-gray-500 mb-4">{place.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-warm-gray-600"><Clock className="w-4 h-4 text-brand-600" />{place.timings}</div>
                    <div className="flex items-center gap-2 text-sm text-warm-gray-600"><IndianRupee className="w-4 h-4 text-success-600" />{place.entryFee}</div>
                    <div className="flex items-center gap-2 text-sm text-warm-gray-600"><MapPin className="w-4 h-4 text-amber-600" />{place.coordinates.lat.toFixed(2)}, {place.coordinates.lng.toFixed(2)}</div>
                  </div>
                  {place.tips && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                      <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800">{place.tips}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorePlaces;
