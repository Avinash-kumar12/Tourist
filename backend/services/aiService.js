const natural = require('natural');
const TravelKnowledge = require('../models/TravelKnowledge');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API client if the API key is present
const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;
let aiModel = null;
let chatModel = null;

if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.trim() !== '') {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    aiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    chatModel = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: "You are TouristBuddy, an AI-powered travel assistant specializing in travel across India. Provide helpful, structured, and warm advice about sightseeing, street food, budget estimations, safety precautions, and local culture. Keep your answers concise and readable with bullet points. Answer directly in markdown."
    });
    console.log('🤖 Google Gemini AI Client initialized successfully for TravelCompanion.');
  } catch (err) {
    console.error('❌ Gemini Client Init Error:', err.message);
  }
} else {
  console.log('⚠️ GEMINI_API_KEY missing or placeholder. Running in local database fallback mode.');
}

/**
 * Generate a local database-driven itinerary using string similarity matching
 */
const generateItinerary = async (destination, days, budget, interests) => {
  try {
    const targetDest = destination.trim().toLowerCase();

    // ----------------------------------------------------
    // GEMINI DYNAMIC GENERATOR (PREFERED)
    // ----------------------------------------------------
    if (aiModel) {
      try {
        console.log(`🤖 Requesting dynamic travel plan from Gemini for: ${destination} (${days} days)`);
        const prompt = `
        Generate a detailed day-by-day travel itinerary for a trip to: ${destination}.
        Duration: ${days} days.
        Budget level: ${budget}.
        Interests: ${interests.join(', ')}.

        You MUST output ONLY a valid JSON object matching the following structure (no markdown formatting, no comments, no backticks, just raw JSON):
        {
          "title": "A catchy title for the trip",
          "destination": "Destination name",
          "summary": "A 2-3 sentence overview of the trip and what makes it special",
          "days": [
            {
              "dayNumber": 1,
              "theme": "Theme of the day (e.g. Historic Exploration)",
              "activities": [
                {
                  "time": "09:30 AM",
                  "location": "Name of the attraction",
                  "description": "Short description of what to do there (2 sentences)",
                  "estimatedCost": "Approximate cost in INR e.g. ₹50 or Free",
                  "tips": "A helpful tip for visiting this spot",
                  "coordinates": {
                    "lat": 26.9124, 
                    "lng": 75.7873
                  }
                }
              ]
            }
          ],
          "totalEstimatedBudget": "Approximate total budget in INR e.g. ₹5,000",
          "packingTips": ["Tip 1", "Tip 2"],
          "bestTimeToVisit": "Best months to visit e.g. October to March"
        }

        Provide actual, realistic latitude and longitude values for the locations in India.
        `;

        const result = await aiModel.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        });

        const responseText = result.response.text();
        const parsedItinerary = JSON.parse(responseText);

        return {
          title: parsedItinerary.title || `${days}-Day Trip to ${parsedItinerary.destination || destination}`,
          destination: parsedItinerary.destination || destination,
          summary: parsedItinerary.summary,
          days: parsedItinerary.days,
          totalEstimatedBudget: parsedItinerary.totalEstimatedBudget,
          packingTips: parsedItinerary.packingTips || ["Walking shoes", "Water bottle"],
          bestTimeToVisit: parsedItinerary.bestTimeToVisit || "October to March"
        };
      } catch (geminiErr) {
        console.error('⚠️ Gemini generation failed, falling back to database matching:', geminiErr.message);
      }
    }

    // ----------------------------------------------------
    // LOCAL DATABASE FALLBACK
    // ----------------------------------------------------
    // Fetch all destination knowledges
    const records = await TravelKnowledge.find({ category: 'destination' });

    let bestMatch = null;
    let bestScore = 0;

    for (const record of records) {
      const keyword = record.keyword.toLowerCase();

      // Direct exact match
      if (targetDest === keyword || targetDest.includes(keyword)) {
        bestMatch = record;
        bestScore = 1.0;
        break;
      }

      // Jaro-Winkler similarity check
      const score = natural.JaroWinklerDistance(keyword, targetDest, { ignoreCase: true });
      if (score > bestScore) {
        bestScore = score;
        bestMatch = record;
      }
    }

    // If we have a good match, reconstruct the itinerary from seeded data
    if (bestMatch && bestScore >= 0.75 && bestMatch.itinerary.length > 0) {
      const parsedDays = bestMatch.itinerary.map(dayStr => JSON.parse(dayStr));
      const selectedDays = [];

      for (let i = 0; i < days; i++) {
        // Cycle through database days if requested days exceeds database itinerary length
        const dayTemplate = parsedDays[i % parsedDays.length];
        selectedDays.push({
          ...dayTemplate,
          dayNumber: i + 1
        });
      }

      const totalCostNum = days * (budget === 'budget' ? 1200 : budget === 'moderate' ? 2000 : 4500);

      return {
        title: bestMatch.title || `${days}-Day Trip to ${bestMatch.title}`,
        destination: bestMatch.title.replace('Itinerary', '').replace('Tour', '').trim(),
        summary: bestMatch.responseMarkdown,
        days: selectedDays,
        totalEstimatedBudget: `₹${totalCostNum.toLocaleString('en-IN')}`,
        packingTips: [
          "Comfortable walking shoes",
          "Sunscreen & sunglasses",
          "Water bottle",
          "Appropriate cultural clothing for monuments"
        ],
        bestTimeToVisit: "October to March"
      };
    }

    // Dynamic Fallback Generator for unknown destinations (offline fallback)
    const capitalizedDest = destination.charAt(0).toUpperCase() + destination.slice(1);
    const selectedDays = [];

    for (let i = 0; i < days; i++) {
      selectedDays.push({
        dayNumber: i + 1,
        theme: `Exploring Landmarks of ${capitalizedDest}`,
        activities: [
          {
            time: "09:30 AM",
            location: `Popular Attraction in ${capitalizedDest}`,
            description: `Start your day by visiting one of the most famous landmarks in ${capitalizedDest}.`,
            estimatedCost: "₹150",
            tips: "Visit early morning to avoid peak tourist crowds.",
            coordinates: { lat: 20.0 + (i * 0.15), lng: 77.0 + (i * 0.15) }
          },
          {
            time: "01:00 PM",
            location: "Local Traditional Diner",
            description: `Savor the authentic local cuisine and traditional dishes of ${capitalizedDest}.`,
            estimatedCost: "₹250",
            tips: "Ask locals for their favorite recommendation.",
            coordinates: { lat: 20.05 + (i * 0.15), lng: 77.05 + (i * 0.15) }
          },
          {
            time: "05:00 PM",
            location: "Scenic Sunset Point",
            description: "Unwind at a beautiful viewpoint watching the sunset over the city.",
            estimatedCost: "Free",
            tips: "Arrive 30 minutes early to capture the perfect view.",
            coordinates: { lat: 20.1 + (i * 0.15), lng: 77.1 + (i * 0.15) }
          }
        ]
      });
    }

    const totalCostNum = days * (budget === 'budget' ? 1000 : budget === 'moderate' ? 1800 : 4000);

    return {
      title: `${days}-Day Explorer Trip to ${capitalizedDest}`,
      destination: capitalizedDest,
      summary: `A dynamically generated itinerary highlighting the landmarks, local food, and views in ${capitalizedDest}.`,
      days: selectedDays,
      totalEstimatedBudget: `₹${totalCostNum.toLocaleString('en-IN')}`,
      packingTips: ["Walking shoes", "Travel guide", "Camera", "Local currency cash"],
      bestTimeToVisit: "November to February"
    };
  } catch (error) {
    console.error('Local Itinerary Generation Error:', error);
    throw new Error('Failed to generate itinerary. Please try again.');
  }
};

/**
 * Chat assistant matching user questions against travelknowledges using Jaro-Winkler string similarity
 */
const chatWithAssistant = async (messages) => {
  try {
    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user')?.content || '';
    if (!lastUserMessage.trim()) {
      return "Hello! How can I help you today?";
    }

    // ----------------------------------------------------
    // GEMINI DYNAMIC CHAT (PREFERED)
    // ----------------------------------------------------
    if (chatModel) {
      try {
        console.log(`🤖 Requesting chat response from Gemini for message: "${lastUserMessage.substring(0, 40)}..."`);
        
        // Map message history to Gemini format
        const history = messages.slice(0, -1).map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }));

        const chat = chatModel.startChat({
          history: history,
          generationConfig: {
            maxOutputTokens: 1000,
          },
        });

        const result = await chat.sendMessage(lastUserMessage);
        return result.response.text();
      } catch (geminiErr) {
        console.error('⚠️ Gemini Chat failed, falling back to local database search:', geminiErr.message);
      }
    }

    // ----------------------------------------------------
    // LOCAL DATABASE FALLBACK
    // ----------------------------------------------------
    const cleanedMessage = lastUserMessage.toLowerCase();

    // Fetch all matching records from the database
    const knowledges = await TravelKnowledge.find({});

    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(cleanedMessage);

    let bestMatch = null;
    let bestScore = 0;

    for (const record of knowledges) {
      const keyword = record.keyword.toLowerCase();

      // 1. Direct substring match (highest priority)
      if (cleanedMessage.includes(keyword)) {
        bestMatch = record;
        bestScore = 1.0;
        break; // Exit early on direct keyword match
      }

      // 2. Token-level similarity match
      for (const token of tokens) {
        const score = natural.JaroWinklerDistance(keyword, token, { ignoreCase: true });
        if (score > bestScore) {
          bestScore = score;
          bestMatch = record;
        }
      }

      // 3. Sentence-level similarity match
      const fullScore = natural.JaroWinklerDistance(keyword, cleanedMessage, { ignoreCase: true });
      if (fullScore > bestScore) {
        bestScore = fullScore;
        bestMatch = record;
      }
    }

    // Threshold check
    if (bestMatch && bestScore >= 0.75) {
      return bestMatch.responseMarkdown;
    }

    // Default Fallback Response
    return `Namaste! 🙏 I'm not completely sure about that. I can provide travel information regarding **Delhi, Mumbai, Jaipur, Goa, Varanasi, and Agra**. 

You can also ask me about:
- **Food**: Street food tips & regional specialties.
- **Budget**: Travel costs & daily expense estimations.
- **Safety**: Travel precautions & solo traveler tips.
- **Temples**: Spiritual sites & dress codes.
- **Beaches**: Coastal locations & beach guides.

*Tip: Try asking about a specific city or topic like "tell me about food in Delhi"!*`;
  } catch (error) {
    console.error('Local Chat Match Error:', error);
    throw new Error('Chat assistant is currently offline. Please try again.');
  }
};

module.exports = { generateItinerary, chatWithAssistant };
