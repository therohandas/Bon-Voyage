/**
 * Image utility for handling location images with local fallback
 */

// Map of location slugs to their local image paths
const localImageMap = new Map();

// Initialize the map - will be populated on first use
let isInitialized = false;

/**
 * Get the image source for a location with fallback support
 * @param {Object} location - Location object with slug and image properties
 * @returns {Object} - { src, fallbackSrc, handleError }
 */
export function getLocationImage(location) {
    if (!location) {
        return {
            src: '/images/locations/placeholder.svg',
            fallbackSrc: '/images/locations/placeholder.svg',
            handleError: () => { }
        };
    }

    const localPath = `/images/locations/${location.slug}.jpg`;
    const externalUrl = location.image;

    return {
        // Try external first, fall back to local
        src: externalUrl || localPath,
        fallbackSrc: localPath,
        handleError: (e) => {
            // If external URL fails, switch to local
            if (e.target.src !== localPath && e.target.src !== window.location.origin + localPath) {
                e.target.src = localPath;
            } else {
                // If local also fails, use placeholder
                e.target.src = '/images/locations/placeholder.svg';
            }
        }
    };
}

/**
 * Simple hook-like function to get image props for a location
 * @param {Object} location - Location object
 * @returns {Object} - Props to spread on img element { src, onError }
 */
export function getImageProps(location) {
    const { src, handleError } = getLocationImage(location);
    return {
        src,
        onError: handleError
    };
}

/**
 * Get the local image path for a location slug
 * @param {string} slug - Location slug
 * @returns {string} - Local image path
 */
export function getLocalImagePath(slug) {
    return `/images/locations/${slug}.jpg`;
}

export default {
    getLocationImage,
    getImageProps,
    getLocalImagePath
};
