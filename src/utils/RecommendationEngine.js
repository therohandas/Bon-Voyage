/**
 * Recommendation Engine for Bon Voyage
 * Scores destinations based on user preferences and returns personalized recommendations
 */

// Interest category mappings to activities
const interestToActivities = {
    beaches: ['Beach visit', 'Beach relaxation', 'Beach walk', 'Swimming', 'Sunset viewing', 'Beach stroll', 'Dolphin watching'],
    temples: ['Pilgrimage', 'Temple tours', 'Temple visit', 'Darshan', 'Heritage walk', 'Architecture appreciation'],
    wildlife: ['Safari', 'Trekking', 'Birding', 'Birdwatching', 'Wildlife spotting', 'Dolphin watching', 'Nature viewing', 'Turtle watching'],
    adventure: ['Trekking', 'Hiking', 'Exploration', 'Boat ride', 'River safari', 'Cave exploration'],
    culture: ['Cultural tours', 'Craft shopping', 'Workshops', 'Cultural shows', 'Heritage walk', 'Block printing workshop', 'Local commerce'],
    food: ['Local food', 'Local cuisine', 'Traditional restaurant', 'Street food']
};

// Budget level mappings (estimated daily costs in INR)
const budgetRanges = {
    budget: { min: 0, max: 2000 },
    midRange: { min: 2000, max: 5000 },
    luxury: { min: 5000, max: Infinity }
};

// Travel style mappings to crowd preferences
const styleToPreferredCrowd = {
    relaxed: ['Low', 'Low to Moderate'],
    moderate: ['Low to Moderate', 'Moderate', 'Seasonal'],
    adventure: ['Moderate', 'Moderate to High', 'High']
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Score a destination based on user preferences
 * Returns a score from 0-100
 */
export function scoreDestination(destination, preferences) {
    let score = 0;
    let maxScore = 0;

    // 1. Interest matching (40 points max)
    const interestWeight = 40;
    maxScore += interestWeight;

    if (preferences.interests && preferences.interests.length > 0) {
        const activities = destination.activities || [];
        const activityText = Array.isArray(activities)
            ? activities.join(' ').toLowerCase()
            : String(activities).toLowerCase();

        let matchCount = 0;
        preferences.interests.forEach(interest => {
            const relatedActivities = interestToActivities[interest] || [];
            const hasMatch = relatedActivities.some(act =>
                activityText.includes(act.toLowerCase())
            );
            if (hasMatch) matchCount++;
        });

        score += (matchCount / preferences.interests.length) * interestWeight;
    }

    // 2. Rating bonus (20 points max)
    const ratingWeight = 20;
    maxScore += ratingWeight;
    const rating = parseFloat(destination.rating) || 0;
    score += (rating / 5) * ratingWeight;

    // 3. Crowd level preference (20 points max)
    const crowdWeight = 20;
    maxScore += crowdWeight;

    if (preferences.travelStyle) {
        const preferredCrowds = styleToPreferredCrowd[preferences.travelStyle] || [];
        const destCrowd = destination.crowd || '';

        if (preferredCrowds.includes(destCrowd)) {
            score += crowdWeight;
        } else if (preferredCrowds.some(c => destCrowd.includes(c) || c.includes(destCrowd))) {
            score += crowdWeight * 0.5;
        }
    }

    // 4. Best time match (10 points max)
    const timeWeight = 10;
    maxScore += timeWeight;

    if (preferences.travelMonth) {
        const bestTime = destination.best_time || '';
        const monthMap = {
            1: 'January', 2: 'February', 3: 'March', 4: 'April',
            5: 'May', 6: 'June', 7: 'July', 8: 'August',
            9: 'September', 10: 'October', 11: 'November', 12: 'December'
        };
        const monthName = monthMap[preferences.travelMonth];

        // Check if the month falls within the best time range
        if (bestTime.toLowerCase().includes(monthName?.toLowerCase())) {
            score += timeWeight;
        } else if (bestTime.toLowerCase().includes('all year') || bestTime.toLowerCase().includes('winter') && preferences.travelMonth >= 10) {
            score += timeWeight * 0.7;
        }
    }

    // 5. Companion type consideration (10 points max)
    const companionWeight = 10;
    maxScore += companionWeight;

    if (preferences.companionType) {
        const activities = destination.activities || [];
        const activityText = Array.isArray(activities)
            ? activities.join(' ').toLowerCase()
            : String(activities).toLowerCase();

        const companionPrefs = {
            solo: ['meditation', 'photography', 'trekking', 'hiking'],
            couple: ['beach', 'sunset', 'boat ride', 'relaxation'],
            family: ['zoo', 'wildlife', 'museum', 'temple'],
            friends: ['beach', 'nightlife', 'adventure', 'safari', 'trekking']
        };

        const preferred = companionPrefs[preferences.companionType] || [];
        const hasMatch = preferred.some(pref => activityText.includes(pref));
        if (hasMatch) score += companionWeight;
    }

    return Math.round((score / maxScore) * 100);
}

/**
 * Get personalized recommendations
 * @param {Array} locations - Array of all destinations
 * @param {Object} preferences - User preferences object
 * @param {number} limit - Maximum number of recommendations
 * @returns {Array} Sorted array of recommendations with scores
 */
export function getRecommendations(locations, preferences, limit = 10) {
    const scoredLocations = locations.map(loc => ({
        ...loc,
        matchScore: scoreDestination(loc, preferences)
    }));

    // Sort by score descending
    scoredLocations.sort((a, b) => b.matchScore - a.matchScore);

    // Return top results
    return scoredLocations.slice(0, limit);
}

/**
 * Find nearby destinations
 * @param {Object} currentLocation - Location with lat/lng
 * @param {Array} allLocations - All destinations
 * @param {number} radiusKm - Search radius in kilometers
 * @returns {Array} Nearby locations with distances
 */
export function findNearbyDestinations(currentLocation, allLocations, radiusKm = 50) {
    return allLocations
        .filter(loc => loc.id !== currentLocation.id)
        .map(loc => ({
            ...loc,
            distance: calculateDistance(
                currentLocation.lat, currentLocation.lng,
                loc.lat, loc.lng
            )
        }))
        .filter(loc => loc.distance <= radiusKm)
        .sort((a, b) => a.distance - b.distance);
}

/**
 * Calculate optimal route between multiple destinations
 * Uses a simple nearest neighbor algorithm
 */
export function optimizeRoute(destinations, startLat = 20.2961, startLng = 85.8245) {
    if (!destinations || destinations.length === 0) return [];
    if (destinations.length === 1) return destinations;

    const visited = [];
    const remaining = [...destinations];
    let currentLat = startLat;
    let currentLng = startLng;

    while (remaining.length > 0) {
        let nearestIdx = 0;
        let nearestDist = Infinity;

        remaining.forEach((dest, idx) => {
            const dist = calculateDistance(currentLat, currentLng, dest.lat, dest.lng);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestIdx = idx;
            }
        });

        const nearest = remaining.splice(nearestIdx, 1)[0];
        visited.push({
            ...nearest,
            distanceFromPrevious: nearestDist
        });
        currentLat = nearest.lat;
        currentLng = nearest.lng;
    }

    return visited;
}

export default {
    scoreDestination,
    getRecommendations,
    findNearbyDestinations,
    optimizeRoute,
    calculateDistance
};
