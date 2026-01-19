import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { calculateDistance } from '../utils/RecommendationEngine';
import locations from '../data/locations.json';

export default function NearbyAttractions({ currentLocation, maxDistance = 50 }) {
    const nearby = useMemo(() => {
        if (!currentLocation?.lat || !currentLocation?.lng) return [];

        return locations
            .filter(loc => loc.id !== currentLocation.id && loc.lat && loc.lng)
            .map(loc => ({
                ...loc,
                distance: calculateDistance(
                    currentLocation.lat,
                    currentLocation.lng,
                    loc.lat,
                    loc.lng
                )
            }))
            .filter(loc => loc.distance <= maxDistance)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 6);
    }, [currentLocation, maxDistance]);

    if (nearby.length === 0) return null;

    const getName = (name) => {
        if (typeof name === 'string') return name;
        if (typeof name === 'object') return name.en || Object.values(name)[0];
        return 'Unknown';
    };

    return (
        <motion.div
            className="card"
            style={{ padding: 24 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                </svg>
                Nearby Attractions
                <span style={{ fontSize: '.8rem', color: 'var(--muted)', fontWeight: 400 }}>
                    (within {maxDistance}km)
                </span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {nearby.map((loc, idx) => (
                    <motion.div
                        key={loc.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Link
                            to={`/location/${loc.slug}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                padding: '12px 16px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 10,
                                border: '1px solid rgba(255,255,255,0.05)',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.2s'
                            }}
                            className="nearby-card"
                        >
                            {/* Thumbnail */}
                            <div style={{
                                width: 56,
                                height: 56,
                                borderRadius: 8,
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                <img
                                    src={loc.image}
                                    alt={getName(loc.name)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    loading="lazy"
                                />
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontWeight: 600,
                                    fontSize: '.95rem',
                                    marginBottom: 4,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {getName(loc.name)}
                                </div>
                                <div style={{ display: 'flex', gap: 12, fontSize: '.8rem', color: 'var(--muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                        {loc.rating}
                                    </span>
                                    <span>{loc.crowd}</span>
                                </div>
                            </div>

                            {/* Distance */}
                            <div style={{
                                textAlign: 'right',
                                flexShrink: 0
                            }}>
                                <div style={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: 'var(--p-2)'
                                }}>
                                    {loc.distance < 1
                                        ? `${Math.round(loc.distance * 1000)}m`
                                        : `${loc.distance.toFixed(1)}km`
                                    }
                                </div>
                                <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>
                                    ~{Math.round(loc.distance / 40 * 60)}min drive
                                </div>
                            </div>

                            {/* Arrow */}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{ color: 'var(--muted)', flexShrink: 0 }}
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <style>{`
        .nearby-card:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
      `}</style>
        </motion.div>
    );
}
