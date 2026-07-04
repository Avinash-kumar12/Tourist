const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const TravelKnowledge = require('../models/TravelKnowledge');
const User = require('../models/User');
const TouristBuddy = require('../models/TouristBuddy');

// Load environment variables from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = [
  // 1. DELHI ITINERARY
  {
    keyword: 'delhi',
    category: 'destination',
    title: 'Delhi Heritage & Capital Tour',
    responseMarkdown: 'Explore the heart of India - a beautiful blend of history, architecture, and world-famous street food.',
    itinerary: [
      JSON.stringify({
        dayNumber: 1,
        theme: 'Historic Old Delhi',
        activities: [
          {
            time: '09:30 AM',
            location: 'Red Fort (Lal Qila)',
            description: 'Tour the massive 17th-century Mughal fort made of red sandstone.',
            estimatedCost: '₹35',
            tips: 'Visit early morning to beat the afternoon heat.',
            coordinates: { lat: 28.6562, lng: 77.2410 }
          },
          {
            time: '01:00 PM',
            location: 'Chandni Chowk Street Food',
            description: 'Try legendary Paranthas at Paranthe Wali Gali and Jalebis at Old Famous Jalebi Wala.',
            estimatedCost: '₹200',
            tips: 'Take a cycle rickshaw through the crowded alleys.',
            coordinates: { lat: 28.6506, lng: 77.2303 }
          },
          {
            time: '03:30 PM',
            location: 'Jama Masjid',
            description: 'Visit one of the largest mosques in India built by Shah Jahan.',
            estimatedCost: 'Free (camera fee extra)',
            tips: 'Dress modestly, robes are available at the entrance.',
            coordinates: { lat: 28.6507, lng: 77.2334 }
          }
        ]
      }),
      JSON.stringify({
        dayNumber: 2,
        theme: 'Colonial & Modern Delhi',
        activities: [
          {
            time: '09:30 AM',
            location: 'Qutub Minar',
            description: 'Marvel at the tallest brick minaret in the world, built in 1193.',
            estimatedCost: '₹35',
            tips: 'Look out for the ancient Rust-Resistant Iron Pillar in the courtyard.',
            coordinates: { lat: 28.5245, lng: 77.1855 }
          },
          {
            time: '01:00 PM',
            location: 'Connaught Place',
            description: 'Lunch at a historic restaurant in Delhi\'s colonial shopping hub.',
            estimatedCost: '₹500',
            tips: 'Great place for currency exchange and book shopping.',
            coordinates: { lat: 28.6304, lng: 77.2177 }
          },
          {
            time: '04:00 PM',
            location: 'India Gate & Rajpath',
            description: 'Walk around the iconic war memorial arch, best viewed in the evening.',
            estimatedCost: 'Free',
            tips: 'Enjoy local street snacks like bhel puri from local vendors nearby.',
            coordinates: { lat: 28.6129, lng: 77.2295 }
          }
        ]
      }),
      JSON.stringify({
        dayNumber: 3,
        theme: 'Spiritual Delhi',
        activities: [
          {
            time: '09:30 AM',
            location: 'Lotus Temple',
            description: 'Meditate in the beautiful lotus-shaped Baha\'i House of Worship.',
            estimatedCost: 'Free',
            tips: 'Absolute silence must be maintained inside.',
            coordinates: { lat: 28.5535, lng: 77.2588 }
          },
          {
            time: '01:00 PM',
            location: 'Humayun\'s Tomb',
            description: 'Visit the stunning garden tomb that inspired the design of the Taj Mahal.',
            estimatedCost: '₹35',
            tips: 'Great spots for sunset photography.',
            coordinates: { lat: 28.5933, lng: 77.2507 }
          }
        ]
      })
    ]
  },
  // 2. MUMBAI ITINERARY
  {
    keyword: 'mumbai',
    category: 'destination',
    title: 'Mumbai City of Dreams Tour',
    responseMarkdown: 'Discover the fast-paced financial capital, beautiful coastlines, colonial architecture, and local life.',
    itinerary: [
      JSON.stringify({
        dayNumber: 1,
        theme: 'Colonial & Coastline walk',
        activities: [
          {
            time: '09:00 AM',
            location: 'Gateway of India',
            description: 'Walk around the historic arch built to commemorate the visit of King George V.',
            estimatedCost: 'Free',
            tips: 'Great starting spot for ferry rides to Elephanta Caves.',
            coordinates: { lat: 18.9220, lng: 72.8347 }
          },
          {
            time: '11:00 AM',
            location: 'Chhatrapati Shivaji Terminus (CST)',
            description: 'Admire the UNESCO World Heritage Victorian Gothic railway station.',
            estimatedCost: 'Free',
            tips: 'Look at the detailed gargoyles and relief work on the building facade.',
            coordinates: { lat: 18.9400, lng: 72.8354 }
          },
          {
            time: '05:00 PM',
            location: 'Marine Drive Sunset',
            description: 'Walk along the beautiful C-shaped seaside promenade (Queen\'s Necklace).',
            estimatedCost: 'Free',
            tips: 'Grab roasted corn (bhutta) during the walk.',
            coordinates: { lat: 18.9432, lng: 72.8235 }
          }
        ]
      }),
      JSON.stringify({
        dayNumber: 2,
        theme: 'Caves & Culture',
        activities: [
          {
            time: '09:30 AM',
            location: 'Elephanta Caves',
            description: 'Take a ferry from Gateway of India to see rock-cut cave temples dedicated to Shiva.',
            estimatedCost: '₹300 (ferry + entry)',
            tips: 'Beware of wild monkeys; keep food and drink items inside bags.',
            coordinates: { lat: 18.9633, lng: 72.9315 }
          },
          {
            time: '04:00 PM',
            location: 'Colaba Causeway Shopping',
            description: 'Browse street stalls selling jewelry, clothes, and vintage items.',
            estimatedCost: 'Varies',
            tips: 'Bargain aggressively, usually start at half the quoted price.',
            coordinates: { lat: 18.9140, lng: 72.8278 }
          }
        ]
      })
    ]
  },
  // 3. JAIPUR ITINERARY
  {
    keyword: 'jaipur',
    category: 'destination',
    title: 'Jaipur Pink City Heritage Tour',
    responseMarkdown: 'Experience royalty, majestic hill forts, palaces, and colorful bazaar culture in Rajasthan\'s capital.',
    itinerary: [
      JSON.stringify({
        dayNumber: 1,
        theme: 'Royal Forts & Palaces',
        activities: [
          {
            time: '09:00 AM',
            location: 'Amber Fort',
            description: 'Visit the massive fort on the hill, showcasing artistic Hindu elements.',
            estimatedCost: '₹100',
            tips: 'Hire a guide to explain the mirror work in Sheesh Mahal.',
            coordinates: { lat: 26.9855, lng: 75.8513 }
          },
          {
            time: '01:30 PM',
            location: 'Hawa Mahal (Palace of Winds)',
            description: 'See the iconic pink five-story facade with 953 small windows.',
            estimatedCost: '₹50',
            tips: 'Best photographed from Wind View Cafe across the street.',
            coordinates: { lat: 26.9239, lng: 75.8267 }
          },
          {
            time: '03:30 PM',
            location: 'City Palace',
            description: 'Explore courtyards, museums, and royal residences still occupied by the royal family.',
            estimatedCost: '₹200',
            tips: 'Do not miss the beautiful Peacock Gate.',
            coordinates: { lat: 26.9258, lng: 75.8237 }
          }
        ]
      })
    ]
  },
  // 4. GOA ITINERARY
  {
    keyword: 'goa',
    category: 'destination',
    title: 'Goa Beaches & Heritage Tour',
    responseMarkdown: 'Relax on beautiful sandy beaches, enjoy water sports, and explore old Portuguese churches.',
    itinerary: [
      JSON.stringify({
        dayNumber: 1,
        theme: 'North Goa Beach Hopping',
        activities: [
          {
            time: '09:30 AM',
            location: 'Baga & Calangute Beaches',
            description: 'Soak in the sun, join water sports, and eat at beach shacks.',
            estimatedCost: 'Free (activities extra)',
            tips: 'Avoid swimming in deep areas; follow lifeguard warnings.',
            coordinates: { lat: 15.5551, lng: 73.7513 }
          },
          {
            time: '04:00 PM',
            location: 'Fort Aguada',
            description: 'Walk around the 17th-century Portuguese lighthouse and fort overlooking the sea.',
            estimatedCost: 'Free',
            tips: 'Excellent spot for sunset views.',
            coordinates: { lat: 15.4921, lng: 73.7737 }
          }
        ]
      }),
      JSON.stringify({
        dayNumber: 2,
        theme: 'Old Goa Heritage Walk',
        activities: [
          {
            time: '09:30 AM',
            location: 'Basilica of Bom Jesus',
            description: 'Visit the UNESCO World Heritage site containing the tomb of St. Francis Xavier.',
            estimatedCost: 'Free',
            tips: 'Dress respectfully; cover shoulders and knees.',
            coordinates: { lat: 15.5009, lng: 73.9116 }
          }
        ]
      })
    ]
  },
  // 5. AGRA ITINERARY
  {
    keyword: 'agra',
    category: 'destination',
    title: 'Agra Taj Mahal & Historical Tour',
    responseMarkdown: 'Home of the Taj Mahal, experience the architectural grandeur of the Mughal Empire.',
    itinerary: [
      JSON.stringify({
        dayNumber: 1,
        theme: 'The Wonder of India',
        activities: [
          {
            time: '06:00 AM',
            location: 'Taj Mahal Sunrise',
            description: 'Witness the breathtaking beauty of the marble mausoleum at sunrise.',
            estimatedCost: '₹50 (Indians), ₹1100 (Foreigners)',
            tips: 'Arrive early to avoid security queues. No big bags or food allowed inside.',
            coordinates: { lat: 27.1751, lng: 78.0421 }
          },
          {
            time: '11:00 AM',
            location: 'Agra Fort',
            description: 'Tour the massive red sandstone walled city containing beautiful palaces.',
            estimatedCost: '₹40',
            tips: 'Look at the Taj Mahal through the jail window where Shah Jahan was imprisoned.',
            coordinates: { lat: 27.1795, lng: 78.0211 }
          }
        ]
      })
    ]
  },
  // 6. VARANASI ITINERARY
  {
    keyword: 'varanasi',
    category: 'destination',
    title: 'Varanasi Spiritual Capital Tour',
    responseMarkdown: 'Experience the spiritual soul of India along the sacred banks of the River Ganges.',
    itinerary: [
      JSON.stringify({
        dayNumber: 1,
        theme: 'Ghats & Spiritual Aarti',
        activities: [
          {
            time: '05:30 AM',
            location: 'Ganga Sunrise Boat Ride',
            description: 'Take a peaceful rowing boat ride to witness morning rituals at the Ghats.',
            estimatedCost: '₹300',
            tips: 'Negotiate the boat price before boarding.',
            coordinates: { lat: 25.3109, lng: 83.0107 }
          },
          {
            time: '06:30 PM',
            location: 'Dashashwamedh Ghat Aarti',
            description: 'Watch the grand evening ritual offering prayers to the River Ganges with lamps and chants.',
            estimatedCost: 'Free',
            tips: 'Arrive by 6:00 PM to get a good viewing spot on the steps or on a boat.',
            coordinates: { lat: 25.3060, lng: 83.0104 }
          }
        ]
      })
    ]
  },
  // 7. GENERAL CHAT KEYWORDS
  {
    keyword: 'food',
    category: 'general',
    title: 'Indian Food & Hygiene Advice',
    responseMarkdown: `### 🍛 Street Food & Cuisine Tips for India
India is a culinary paradise! Here is some expert advice:
- **Delhi**: Don't miss *Chole Bhature* in Chandni Chowk or butter chicken in Daryaganj.
- **Mumbai**: Try *Vada Pav*, *Bhel Puri*, and *Pav Bhaji* at Juhu Beach.
- **Jaipur**: Savor the traditional Rajasthani *Dal Baati Churma*.
- **Goa**: Sample fresh sea bass and local *Goan Fish Curry*.
- **Hygiene Rule**: Always choose busy food stalls where ingredients are cooked fresh. Drink **bottled mineral water only** (ensure the seal is intact).`,
    itinerary: []
  },
  {
    keyword: 'budget',
    category: 'general',
    title: 'Budget Planning for Travelers in India',
    responseMarkdown: `### 💰 Budget Planning & Money Tips
India offers exceptional value for travelers. Here is a breakdown of average daily costs:
- **Low Budget (Backpacker)**: ₹1,500 - ₹2,500/day ($20 - $30 USD). Includes hostels, street food, and sleeper trains.
- **Mid-Range**: ₹4,000 - ₹8,000/day ($50 - $100 USD). Includes standard hotels, private auto-rickshaws, and sit-down dinners.
- **Tips**:
  - Use public transport like Metro systems (Delhi, Mumbai, Bengaluru) for cheap travel.
  - Download transport apps (Uber/Ola) for fixed rates to avoid bargaining.
  - Always carry cash (₹100, ₹200, and ₹500 notes) as small shops and rickshaws do not accept cards.`,
    itinerary: []
  },
  {
    keyword: 'safety',
    category: 'general',
    title: 'Safety Tips for Travelers in India',
    responseMarkdown: `### 🛡️ Safety & Travel Precautions in India
Travel in India is generally very safe and welcoming, but standard precautions apply:
- **Transport**: Avoid unmarked taxis. Use app-based ride services (Uber/Ola) or prepaid taxi counters at airports/railway stations.
- **Dress Code**: Dress modestly, especially at spiritual sites. Covering shoulders and legs is recommended.
- **Solo Female Travelers**: Avoid walking alone in poorly lit or isolated areas late at night. Plan to arrive at new cities during daylight hours.
- **Scams**: Be wary of strangers offering "free tours" or claiming tourist offices are closed.`,
    itinerary: []
  },
  {
    keyword: 'temples',
    category: 'general',
    title: 'Temple & Mosque Etiquette in India',
    responseMarkdown: `### 🕌 Spiritual & Temple Custom Guidelines
When visiting temples, mosques, or Gurudwaras:
1. **Shoes**: Always remove your shoes at the designated shoe stand before entering.
2. **Attire**: Keep shoulders and legs covered. Gurudwaras and Mosques require covering your head (headscarves are usually provided free at the entrance).
3. **Respect**: Do not photograph the main inner sanctum deity unless permitted. Walk clockwise around shrines.
4. **Offerings**: You can buy flower garlands or sweets at entrance stalls to offer inside.`,
    itinerary: []
  },
  {
    keyword: 'beaches',
    category: 'general',
    title: 'Beach Destinations & Activities',
    responseMarkdown: `### 🏖️ Top Beaches in India
India boasts a stunning 7,500 km coastline:
- **Goa**: The center of beach life. North Goa (Baga, Anjuna) is great for parties; South Goa (Palolem, Agonda) is peaceful.
- **Kerala**: *Varkala Beach* offers dramatic red cliffs overlooking the Arabian Sea.
- **Gokarna (Karnataka)**: A quiet alternative to Goa with beautiful half-moon beaches and scenic hiking trails.
- **Safety**: Pay attention to ocean currents and red flags. Swim only in designated zones.`,
    itinerary: []
  },
  {
    keyword: 'hello',
    category: 'general',
    title: 'Welcome to TouristBuddy!',
    responseMarkdown: `### Namaste! 🙏 Welcome to AI Travel Companion India
I am your localized smart travel assistant. Since I run completely locally, I do not need cloud APIs to help you!
- You can plan itineraries using the **Trip Planner** page.
- You can look up details for attractions under **Explore Places**.
- You can find verified local guides on the **Find a Guide** page.

How can I help you explore India today?`,
    itinerary: []
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing travel knowledge records
    await TravelKnowledge.deleteMany({});
    console.log('🧹 Cleared existing TravelKnowledge collection.');

    // Seed travel knowledge
    await TravelKnowledge.insertMany(seedData);
    console.log('🌱 Successfully seeded TravelKnowledge collection with local NLP resources!');

    // Clear and Seed real guide users and profiles
    console.log('🧹 Cleaning up mock guide user and buddy accounts...');
    await TouristBuddy.deleteMany({});
    await User.deleteMany({ email: { $regex: /@touristbuddy\.com$/i } });

    const guidesData = [
      { name: 'Rajesh Kumar', email: 'rajesh@touristbuddy.com', city: 'Jaipur', languages: ['Hindi', 'English', 'French'], pricePerDay: 1500, rating: 4.8, totalReviews: 42, bio: 'Born and raised in Jaipur. I know every hidden gem in the Pink City!', specialties: ['Heritage Walks', 'Food Tours', 'Photography'], experience: 5, isAvailable: true, isVerified: true },
      { name: 'Priya Sharma', email: 'priya@touristbuddy.com', city: 'Delhi', languages: ['Hindi', 'English'], pricePerDay: 2000, rating: 4.9, totalReviews: 67, bio: 'History enthusiast and certified guide. Let me show you the real Delhi!', specialties: ['Historical Tours', 'Street Food', 'Markets'], experience: 8, isAvailable: true, isVerified: true },
      { name: 'Arjun Nair', email: 'arjun@touristbuddy.com', city: 'Goa', languages: ['English', 'Hindi', 'Konkani'], pricePerDay: 1800, rating: 4.7, totalReviews: 35, bio: 'Beach lover and adventure guide. From hidden beaches to best nightlife spots.', specialties: ['Beach Tours', 'Water Sports', 'Nightlife'], experience: 4, isAvailable: true, isVerified: false },
      { name: 'Meera Patel', email: 'meera@touristbuddy.com', city: 'Varanasi', languages: ['Hindi', 'English', 'Sanskrit'], pricePerDay: 1200, rating: 4.6, totalReviews: 28, bio: 'Spiritual guide specializing in temple tours and Ganga Aarti experiences.', specialties: ['Temple Tours', 'Spiritual Walks', 'Yoga'], experience: 6, isAvailable: true, isVerified: true },
      { name: 'Vikram Singh', email: 'vikram@touristbuddy.com', city: 'Mumbai', languages: ['Hindi', 'English', 'Marathi'], pricePerDay: 2500, rating: 4.5, totalReviews: 53, bio: 'Bollywood insider and city explorer. Experience Mumbai like a local!', specialties: ['Bollywood Tours', 'Street Food', 'Nightlife'], experience: 7, isAvailable: true, isVerified: true },
      { name: 'Ananya Reddy', email: 'ananya@touristbuddy.com', city: 'Agra', languages: ['Hindi', 'English', 'Telugu'], pricePerDay: 1000, rating: 4.4, totalReviews: 19, bio: 'Taj Mahal expert. I\'ll help you capture the perfect sunrise shot!', specialties: ['Photography', 'History', 'Architecture'], experience: 3, isAvailable: false, isVerified: false }
    ];

    for (const guide of guidesData) {
      // Create user with standard password
      const user = await User.create({
        name: guide.name,
        email: guide.email,
        password: 'password123',
        role: 'guide'
      });

      // Create buddy profile linked to user
      await TouristBuddy.create({
        user: user._id,
        city: guide.city,
        languages: guide.languages,
        pricePerDay: guide.pricePerDay,
        rating: guide.rating,
        totalReviews: guide.totalReviews,
        bio: guide.bio,
        specialties: guide.specialties,
        experience: guide.experience,
        isAvailable: guide.isAvailable,
        isVerified: guide.isVerified
      });
    }
    console.log('👥 Successfully seeded mock guide users and profiles!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
