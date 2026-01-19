/**
 * Groq AI Service
 * Uses Groq's free API for realistic travel planning
 */

import locations from '../data/locations.json';
import seasonalData from '../data/seasonalData.json';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Using LLaMA 3 70B for best quality
const MODEL = 'llama-3.3-70b-versatile';

// Helper to get name from object or string
const getName = (name) => {
    if (typeof name === 'string') return name;
    if (typeof name === 'object') return name.en || Object.values(name)[0];
    return 'Unknown';
};

/**
 * Call Groq API
 */
async function callGroq(messages, options = {}) {
    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL,
                messages,
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 4000,
                response_format: options.json ? { type: "json_object" } : undefined
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Groq API error:', error);
            throw new Error(error.error?.message || 'AI request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Groq API call failed:', error);
        throw error;
    }
}

/**
 * Generate AI Itinerary using Groq
 */
export async function generateAIItinerary(preferences) {
    const {
        destinations = [],
        duration = 3,
        travelStyle = 'moderate',
        interests = [],
        budget = 'midRange',
        companions = 'couple',
        specialRequests = ''
    } = preferences;

    // Get destination names
    const destinationNames = destinations.length > 0
        ? destinations.map(d => getName(d.name)).join(', ')
        : 'popular destinations in Odisha (recommend Puri, Konark, Bhubaneswar area)';

    const prompt = `You are an expert travel planner specializing in Odisha, India. Create a realistic, detailed day-by-day travel itinerary. Make sure that the places are not repeated. There is space and time given for travel.

TRIP REQUIREMENTS:
- Destinations: ${destinationNames}
- Duration: ${duration} days
- Travel Style: ${travelStyle} (${travelStyle === 'relaxed' ? 'slow pace, rest between activities' : travelStyle === 'adventure' ? 'active, maximize experiences' : 'balanced pace'})
- Interests: ${interests.length > 0 ? interests.join(', ') : 'general sightseeing, culture, food'}
- Budget: ${budget === 'budget' ? 'Budget-friendly (₹1500-2500/day)' : budget === 'luxury' ? 'Premium (₹8000+/day)' : 'Mid-range comfortable (₹4000-6000/day)'}
- Travelers: ${companions}
${specialRequests ? `- Special Requests: ${specialRequests}` : ''}

IMPORTANT GUIDELINES:
1. Consider real travel distances between places 
2. Don't repeat the same activities on different days
3. Include travel/transit time when moving between cities
4. Suggest realistic timings (temples early morning, beaches for sunset, etc.)
5. Include specific restaurant/food recommendations
6. Add transport options with estimated costs
7. Mention the time taken to travel between places.
8. Keep the itinery in order.
9. When starting the itinery, start with travel to hotel or accommodation. The user has to first arrive in the place.
10. Keep some time for rest. 
11. Don't keep the itinery short. Add as much information as possible.
12. Take time to make sure that you are mentioning authentic and physically present restaurants and places.
13. Keep the activities for a day at least 4-5
Return a valid JSON object with this EXACT structure:
{
  "title": "Catchy trip title",
  "summary": "2-3 sentence overview",
  "days": [
    {
      "day": 1,
      "title": "Day theme including location name",
      "activities": [
        {
          "time": "6:00 AM",
          "activity": "Activity name",
          "description": "Details about what to do",
          "duration": "2 hours",
          "tips": "Practical tip",
          "cost": "Entry fee or cost if applicable"
        }
      ],
      "meals": {
        "breakfast": "Specific recommendation with place name",
        "lunch": "Specific recommendation",
        "dinner": "Specific recommendation"
      },
      "transport": "How to get around today",
      "budget": {
        "accommodation": 2500,
        "food": 1000,
        "transport": 800,
        "activities": 500
      }
    }
  ],
  "packingTips": ["tip1", "tip2", "tip3"],
  "totalBudget": 15000,
  "bestTimeToVisit": "October to February",
  "importantNotes": ["note1", "note2"]
}`;

    try {
        const response = await callGroq([
            {
                role: 'system',
                content: 'You are an expert Odisha travel planner. You must respond with valid JSON only. No markdown, no code blocks, just pure JSON.'
            },
            { role: 'user', content: prompt }
        ], { temperature: 0.7, json: true });

        // Parse JSON response
        let parsed;
        try {
            // Try direct parse first
            parsed = JSON.parse(response);
        } catch {
            // Clean up if there's any markdown
            const cleaned = response.replace(/```json\n?|\n?```/g, '').trim();
            parsed = JSON.parse(cleaned);
        }

        return parsed;
    } catch (error) {
        console.error('AI Itinerary generation failed:', error);
        throw error;
    }
}

/**
 * Get AI destination insights
 */
export async function getAIDestinationInsights(destination) {
    const name = getName(destination.name);

    const prompt = `You are a local Odisha travel expert. Provide insider tips for "${name}" in Odisha, India.

Include practical, specific information that tourists won't find in guidebooks.

Return valid JSON:
{
  "highlight": "2-3 sentences about what makes this place special",
  "bestTime": {
    "months": "Best months to visit",
    "reason": "Why these months"
  },
  "hiddenGems": ["3-4 specific lesser-known spots or tips"],
  "foodMustTry": ["3-4 specific local dishes to try here"],
  "photoTips": ["2-3 photography tips for this location"],
  "etiquette": ["2-3 cultural rules to follow"],
  "savingTips": ["2-3 money-saving tips"]
}`;

    try {
        const response = await callGroq([
            { role: 'system', content: 'You are a local Odisha expert. Respond with valid JSON only.' },
            { role: 'user', content: prompt }
        ], { temperature: 0.7, maxTokens: 1500, json: true });

        let parsed;
        try {
            parsed = JSON.parse(response);
        } catch {
            const cleaned = response.replace(/```json\n?|\n?```/g, '').trim();
            parsed = JSON.parse(cleaned);
        }

        return parsed;
    } catch (error) {
        console.error('AI insights failed:', error);
        throw error;
    }
}

/**
 * Chat with AI assistant
 */
export async function chatWithAssistant(userMessage, context = {}) {
    const { destinations = [], currentPage = '', previousMessages = [] } = context;

    const systemPrompt = `You are "Voyage", a friendly and knowledgeable AI travel assistant for Bon Voyage - an Odisha tourism website.

Your personality:
- Warm, helpful, and enthusiastic about Odisha
- Use occasional Hindi/Odia phrases for authenticity (with translations)
- Give specific, actionable advice with real details
- Keep responses concise but informative (under 200 words unless detailed planning requested)

Key Odisha knowledge:
- Distances: Bhubaneswar-Puri: 60km (1.5hr), Puri-Konark: 35km (1hr), Puri-Chilika: 50km (1.5hr)
- Best time: October-February (winter, pleasant weather)
- Must-try food: Dalma, Chhena Poda, Dahi Bara Aloo Dum, Pakhala, Machha Besara
- Famous for: Jagannath Temple (Puri), Sun Temple (Konark), Chilika Lake (dolphins), tribal culture

Context:
- User is on: ${currentPage}
- Destinations of interest: ${destinations.map(d => getName(d.name)).join(', ') || 'exploring'}`;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...previousMessages.slice(-8).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage }
    ];

    try {
        return await callGroq(messages, { temperature: 0.8, maxTokens: 800 });
    } catch (error) {
        console.error('AI chat failed:', error);
        return "I'm having trouble connecting right now. Please try again in a moment! 🙏";
    }
}

/**
 * Get smart suggestions
 */
export async function getSmartSuggestions(userContext) {
    const { favorites = [], viewedDestinations = [] } = userContext;

    const viewed = viewedDestinations.join(', ') || 'nothing yet';
    const saved = favorites.map(f => getName(f.name)).join(', ') || 'nothing yet';

    const prompt = `Based on a user exploring Odisha tourism:
- Viewed: ${viewed}
- Favorites: ${saved}

Suggest 3 destinations they might like. Return JSON array:
[
  {"destination": "Name", "reason": "Short reason", "matchScore": 85}
]`;

    try {
        const response = await callGroq([
            { role: 'system', content: 'Travel recommendation AI. Return valid JSON array only.' },
            { role: 'user', content: prompt }
        ], { temperature: 0.7, maxTokens: 500, json: true });

        let parsed;
        try {
            parsed = JSON.parse(response);
        } catch {
            const cleaned = response.replace(/```json\n?|\n?```/g, '').trim();
            parsed = JSON.parse(cleaned);
        }

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Smart suggestions failed:', error);
        return [];
    }
}

export default {
    generateAIItinerary,
    getAIDestinationInsights,
    chatWithAssistant,
    getSmartSuggestions
};
