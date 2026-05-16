const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic.default({
  apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Generate a day-wise itinerary using Claude
 */
const generateItinerary = async (destination, days, budget, interests) => {
  const prompt = `You are an expert travel planner specializing in India. Create a detailed, day-by-day itinerary for a ${days}-day trip to ${destination}, India.

Budget level: ${budget}
Interests: ${interests.join(', ')}

IMPORTANT: Return ONLY valid JSON. No markdown, no explanations, no backticks. Just pure JSON.

The JSON structure must be:
{
  "title": "A catchy title for this trip",
  "destination": "${destination}",
  "summary": "A brief 2-sentence trip summary",
  "days": [
    {
      "dayNumber": 1,
      "theme": "Theme for the day",
      "activities": [
        {
          "time": "9:00 AM",
          "location": "Place name",
          "description": "What to do here",
          "estimatedCost": "₹500",
          "tips": "Any helpful tips",
          "coordinates": { "lat": 0.0, "lng": 0.0 }
        }
      ]
    }
  ],
  "totalEstimatedBudget": "₹XX,XXX",
  "packingTips": ["tip1", "tip2"],
  "bestTimeToVisit": "Month range"
}

Include real coordinates for Google Maps. Include 3-5 activities per day. Make costs realistic for India in INR.`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = response.content[0].text;

    // Try to parse the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('AI Itinerary Error:', error.message);
    throw new Error('Failed to generate itinerary. Please try again.');
  }
};

/**
 * Chat assistant for Indian travel queries
 */
const chatWithAssistant = async (messages) => {
  const systemPrompt = `You are "AI Travel Companion India", a helpful and knowledgeable assistant specializing in Indian tourism.

Your expertise covers:
- Tourist destinations across all Indian states
- Cultural practices, festivals, and local customs
- Transportation options (trains, flights, buses, auto-rickshaws)
- Food recommendations and dietary considerations
- Safety tips for travelers
- Budget planning and money-saving tips
- Visa and documentation requirements
- Weather and best times to visit

Guidelines:
- Keep responses concise, friendly, and informative
- Use Indian currency (INR/₹) for prices
- If asked about local guides, recommend the "Tourist Buddy" feature in this app
- Include practical tips that only a local would know
- Be culturally sensitive and respectful`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    });

    return response.content[0].text;
  } catch (error) {
    console.error('AI Chat Error:', error.message);
    throw new Error('Chat assistant is unavailable. Please try again.');
  }
};

module.exports = { generateItinerary, chatWithAssistant };
