// Static data for popular Indian tourist places
// In a production app, this would come from a database or external API

const placesData = {
  delhi: {
    city: 'Delhi',
    description: 'The capital of India, a blend of ancient history and modern life.',
    places: [
      {
        name: 'Red Fort',
        description: 'A historic fort that served as the main residence of the Mughal emperors. UNESCO World Heritage Site.',
        timings: '9:30 AM - 4:30 PM (Closed on Mondays)',
        entryFee: '₹35 (Indians), ₹500 (Foreigners)',
        tips: 'Visit early morning to avoid crowds. Light and Sound show in evenings is worth watching.',
        coordinates: { lat: 28.6562, lng: 77.2410 },
        category: 'Historical'
      },
      {
        name: 'Qutub Minar',
        description: 'A 73-meter tall tower built in 1193, the tallest brick minaret in the world.',
        timings: '7:00 AM - 5:00 PM',
        entryFee: '₹35 (Indians), ₹550 (Foreigners)',
        tips: 'Best visited during sunset. Combine with Mehrauli Archaeological Park.',
        coordinates: { lat: 28.5245, lng: 77.1855 },
        category: 'Historical'
      },
      {
        name: 'India Gate',
        description: 'A war memorial and iconic landmark of Delhi, perfect for evening strolls.',
        timings: 'Open 24 hours',
        entryFee: 'Free',
        tips: 'Visit in the evening for beautiful lighting. Street food nearby is excellent.',
        coordinates: { lat: 28.6129, lng: 77.2295 },
        category: 'Monument'
      },
      {
        name: 'Lotus Temple',
        description: 'A Bahá\'í House of Worship shaped like a lotus flower. Known for its stunning architecture.',
        timings: '9:00 AM - 5:30 PM (Closed on Mondays)',
        entryFee: 'Free',
        tips: 'Silence is maintained inside. Photography not allowed indoors.',
        coordinates: { lat: 28.5535, lng: 77.2588 },
        category: 'Religious'
      }
    ]
  },
  mumbai: {
    city: 'Mumbai',
    description: 'The financial capital of India, known for Bollywood, street food, and colonial architecture.',
    places: [
      {
        name: 'Gateway of India',
        description: 'An arch-monument overlooking the Arabian Sea, built during the British Raj.',
        timings: 'Open 24 hours',
        entryFee: 'Free',
        tips: 'Take a ferry to Elephanta Caves from here. Best visited during sunrise.',
        coordinates: { lat: 18.9220, lng: 72.8347 },
        category: 'Monument'
      },
      {
        name: 'Marine Drive',
        description: 'A 3.6 km long boulevard along the coastline, also known as the Queen\'s Necklace.',
        timings: 'Open 24 hours',
        entryFee: 'Free',
        tips: 'Visit during sunset. Try the local street food at Chowpatty Beach nearby.',
        coordinates: { lat: 18.9432, lng: 72.8235 },
        category: 'Nature'
      },
      {
        name: 'Elephanta Caves',
        description: 'UNESCO World Heritage Site with rock-cut cave temples dedicated to Lord Shiva.',
        timings: '9:00 AM - 5:30 PM (Closed on Mondays)',
        entryFee: '₹40 (Indians), ₹600 (Foreigners)',
        tips: 'Take the toy train from the jetty. Carry water and wear comfortable shoes.',
        coordinates: { lat: 18.9633, lng: 72.9315 },
        category: 'Historical'
      },
      {
        name: 'Siddhivinayak Temple',
        description: 'One of the most famous Ganesh temples in Mumbai, attracting thousands daily.',
        timings: '5:30 AM - 10:00 PM',
        entryFee: 'Free',
        tips: 'Visit early morning on Tuesdays for special darshan. Long queues expected.',
        coordinates: { lat: 19.0168, lng: 72.8302 },
        category: 'Religious'
      }
    ]
  },
  jaipur: {
    city: 'Jaipur',
    description: 'The Pink City, capital of Rajasthan, famous for its forts, palaces, and vibrant culture.',
    places: [
      {
        name: 'Amber Fort',
        description: 'A majestic fort overlooking Maota Lake, known for its artistic Hindu style elements.',
        timings: '8:00 AM - 5:30 PM',
        entryFee: '₹100 (Indians), ₹500 (Foreigners)',
        tips: 'Elephant rides available but consider ethical concerns. Light and Sound show is excellent.',
        coordinates: { lat: 26.9855, lng: 75.8513 },
        category: 'Historical'
      },
      {
        name: 'Hawa Mahal',
        description: 'The Palace of Winds with its stunning honeycomb facade of 953 small windows.',
        timings: '9:00 AM - 5:00 PM',
        entryFee: '₹50 (Indians), ₹200 (Foreigners)',
        tips: 'Best photographed from the street opposite. Visit early morning for the best light.',
        coordinates: { lat: 26.9239, lng: 75.8267 },
        category: 'Historical'
      },
      {
        name: 'City Palace',
        description: 'A stunning complex of courtyards, gardens, and buildings blending Rajput and Mughal architecture.',
        timings: '9:30 AM - 5:00 PM',
        entryFee: '₹200 (Indians), ₹700 (Foreigners)',
        tips: 'Hire a local guide for the best experience. The museum inside is worth exploring.',
        coordinates: { lat: 26.9258, lng: 75.8237 },
        category: 'Historical'
      },
      {
        name: 'Jantar Mantar',
        description: 'UNESCO World Heritage Site featuring the world\'s largest stone sundial.',
        timings: '9:00 AM - 5:00 PM',
        entryFee: '₹50 (Indians), ₹200 (Foreigners)',
        tips: 'Get a guide to explain the astronomical instruments. Located near City Palace.',
        coordinates: { lat: 26.9248, lng: 75.8246 },
        category: 'Historical'
      }
    ]
  },
  goa: {
    city: 'Goa',
    description: 'India\'s beach paradise, known for its stunning coastline, Portuguese heritage, and nightlife.',
    places: [
      {
        name: 'Baga Beach',
        description: 'One of the most popular beaches in North Goa, famous for water sports and nightlife.',
        timings: 'Open 24 hours',
        entryFee: 'Free',
        tips: 'Try parasailing and jet skiing. Tito\'s Lane nearby is famous for nightlife.',
        coordinates: { lat: 15.5551, lng: 73.7513 },
        category: 'Beach'
      },
      {
        name: 'Basilica of Bom Jesus',
        description: 'A UNESCO World Heritage Site housing the mortal remains of St. Francis Xavier.',
        timings: '9:00 AM - 6:30 PM',
        entryFee: 'Free',
        tips: 'Combine with Se Cathedral nearby. Photography allowed outside only.',
        coordinates: { lat: 15.5009, lng: 73.9116 },
        category: 'Religious'
      },
      {
        name: 'Dudhsagar Falls',
        description: 'A four-tiered waterfall on the Mandovi River, one of India\'s tallest waterfalls.',
        timings: 'Best visited during monsoon (June-September)',
        entryFee: '₹400 (Jeep safari)',
        tips: 'Only accessible by jeep or trek during monsoon. Carry waterproof bags.',
        coordinates: { lat: 15.3144, lng: 74.3143 },
        category: 'Nature'
      },
      {
        name: 'Fort Aguada',
        description: 'A well-preserved 17th-century Portuguese fort with stunning sea views.',
        timings: '9:00 AM - 5:30 PM',
        entryFee: 'Free',
        tips: 'Visit during sunset for spectacular views. Sinquerim Beach is at the base.',
        coordinates: { lat: 15.4921, lng: 73.7737 },
        category: 'Historical'
      }
    ]
  },
  varanasi: {
    city: 'Varanasi',
    description: 'One of the world\'s oldest living cities, the spiritual capital of India on the banks of the Ganges.',
    places: [
      {
        name: 'Dashashwamedh Ghat',
        description: 'The main ghat in Varanasi, famous for the spectacular Ganga Aarti ceremony every evening.',
        timings: 'Open 24 hours (Aarti at 7:00 PM)',
        entryFee: 'Free',
        tips: 'Arrive 30 minutes early for Ganga Aarti to get a good spot. Take a boat ride.',
        coordinates: { lat: 25.3109, lng: 83.0107 },
        category: 'Religious'
      },
      {
        name: 'Kashi Vishwanath Temple',
        description: 'One of the most famous Hindu temples dedicated to Lord Shiva, one of the 12 Jyotirlingas.',
        timings: '3:00 AM - 11:00 PM',
        entryFee: 'Free',
        tips: 'ID proof required. No electronic devices allowed inside. Early morning visit recommended.',
        coordinates: { lat: 25.3109, lng: 83.0107 },
        category: 'Religious'
      },
      {
        name: 'Sarnath',
        description: 'The place where Buddha gave his first sermon. Features ancient ruins and museums.',
        timings: '9:00 AM - 5:00 PM',
        entryFee: '₹25 (Indians)',
        tips: 'Hire a guide for historical context. The Sarnath Museum has remarkable Buddhist artifacts.',
        coordinates: { lat: 25.3814, lng: 83.0246 },
        category: 'Historical'
      },
      {
        name: 'Assi Ghat',
        description: 'A peaceful ghat popular with tourists, known for morning yoga sessions and cafes.',
        timings: 'Open 24 hours',
        entryFee: 'Free',
        tips: 'Great place for morning walks. Many good cafes and bookshops nearby.',
        coordinates: { lat: 25.2878, lng: 83.0023 },
        category: 'Religious'
      }
    ]
  },
  agra: {
    city: 'Agra',
    description: 'Home to the iconic Taj Mahal, one of the Seven Wonders of the World.',
    places: [
      {
        name: 'Taj Mahal',
        description: 'An ivory-white marble mausoleum, a UNESCO World Heritage Site and symbol of love.',
        timings: '6:00 AM - 6:30 PM (Closed on Fridays)',
        entryFee: '₹50 (Indians), ₹1,100 (Foreigners)',
        tips: 'Visit at sunrise for the best experience and fewer crowds. Mehtab Bagh offers great sunset views.',
        coordinates: { lat: 27.1751, lng: 78.0421 },
        category: 'Monument'
      },
      {
        name: 'Agra Fort',
        description: 'A UNESCO World Heritage Site, a historical fort and palace complex of the Mughal dynasty.',
        timings: '6:00 AM - 6:00 PM',
        entryFee: '₹40 (Indians), ₹550 (Foreigners)',
        tips: 'Hire an audio guide. You can see the Taj Mahal from Musamman Burj inside the fort.',
        coordinates: { lat: 27.1795, lng: 78.0211 },
        category: 'Historical'
      },
      {
        name: 'Fatehpur Sikri',
        description: 'A 16th-century city built by Emperor Akbar, now a ghost town and UNESCO site.',
        timings: '6:00 AM - 6:00 PM',
        entryFee: '₹40 (Indians), ₹550 (Foreigners)',
        tips: '40 km from Agra. Plan half a day. The Buland Darwaza is the tallest gateway in the world.',
        coordinates: { lat: 27.0945, lng: 77.6679 },
        category: 'Historical'
      }
    ]
  }
};

// @desc    Get all cities
// @route   GET /api/places
const getCities = async (req, res) => {
  const cities = Object.keys(placesData).map(key => ({
    id: key,
    city: placesData[key].city,
    description: placesData[key].description,
    placeCount: placesData[key].places.length
  }));
  res.json(cities);
};

// @desc    Get places by city
// @route   GET /api/places/:city
const getPlacesByCity = async (req, res) => {
  const cityKey = req.params.city.toLowerCase();
  const cityData = placesData[cityKey];

  if (!cityData) {
    return res.status(404).json({ message: 'City not found' });
  }

  res.json(cityData);
};

module.exports = { getCities, getPlacesByCity };
