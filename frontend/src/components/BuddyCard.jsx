import { Star, MapPin, Languages, IndianRupee, BadgeCheck } from 'lucide-react';

const BuddyCard = ({ buddy, onConnect }) => {
  const { user: buddyUser, city, languages, pricePerDay, rating, totalReviews, bio, specialties, isVerified, isAvailable } = buddy;

  return (
    <div className="card p-6 flex flex-col h-full animate-slide-up" id={`buddy-card-${buddy._id}`}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xl flex-shrink-0 border-2 border-brand-200">
          {buddyUser?.name?.charAt(0)?.toUpperCase() || 'G'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-warm-gray-800 text-lg truncate">{buddyUser?.name || 'Guide'}</h3>
            {isVerified && <BadgeCheck className="w-5 h-5 text-brand-600 flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-1 text-warm-gray-500 text-sm mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{city}</span>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${isAvailable ? 'bg-success-50 text-success-600' : 'bg-error-50 text-error-600'}`}>
          {isAvailable ? 'Available' : 'Busy'}
        </div>
      </div>

      {/* Bio */}
      {bio && <p className="text-warm-gray-500 text-sm mb-4 line-clamp-2">{bio}</p>}

      {/* Tags */}
      {specialties && specialties.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {specialties.slice(0, 3).map((s, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full bg-sand-100 text-brand-700 text-xs font-medium border border-sand-200">
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4 mt-auto">
        <div className="text-center p-2.5 rounded-lg bg-warm-gray-50">
          <div className="flex items-center justify-center gap-1 text-amber-600 mb-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-semibold text-sm">{rating?.toFixed(1) || '0.0'}</span>
          </div>
          <p className="text-warm-gray-400 text-xs">{totalReviews || 0} reviews</p>
        </div>
        <div className="text-center p-2.5 rounded-lg bg-warm-gray-50">
          <div className="flex items-center justify-center gap-1 text-success-600 mb-0.5">
            <IndianRupee className="w-3.5 h-3.5" />
            <span className="font-semibold text-sm">{pricePerDay}</span>
          </div>
          <p className="text-warm-gray-400 text-xs">per day</p>
        </div>
        <div className="text-center p-2.5 rounded-lg bg-warm-gray-50">
          <div className="flex items-center justify-center gap-1 text-brand-600 mb-0.5">
            <Languages className="w-3.5 h-3.5" />
            <span className="font-semibold text-sm">{languages?.length || 0}</span>
          </div>
          <p className="text-warm-gray-400 text-xs">langs</p>
        </div>
      </div>

      {/* Languages */}
      {languages && languages.length > 0 && (
        <p className="text-warm-gray-400 text-xs mb-4">
          <span className="text-warm-gray-600 font-medium">Speaks:</span> {languages.join(', ')}
        </p>
      )}

      {/* Connect Button */}
      <button
        onClick={() => onConnect && onConnect(buddy)}
        disabled={!isAvailable}
        className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
          isAvailable
            ? 'btn-primary !rounded-lg'
            : 'bg-warm-gray-100 text-warm-gray-400 cursor-not-allowed border border-warm-gray-200'
        }`}
        id={`connect-btn-${buddy._id}`}
      >
        {isAvailable ? 'Connect with Guide' : 'Currently Unavailable'}
      </button>
    </div>
  );
};

export default BuddyCard;
