import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import FavoriteButton from '../components/FavoriteButton';
import CompareButton from '../components/CompareButton';

export default function Favorites() {
    const { favorites, clearFavorites } = useFavorites();

    const getName = (name) => {
        if (typeof name === 'string') return name;
        if (typeof name === 'object') return name.en || Object.values(name)[0];
        return 'Unknown';
    };

    return (
        <div className="page-content">
            <div className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <header style={{ marginBottom: 32 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <div>
                                <h1 style={{
                                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                    fontFamily: "'Playfair Display', serif",
                                    marginBottom: 8
                                }}>
                                    My Favorites
                                </h1>
                                <p style={{ color: 'var(--txt-2)' }}>
                                    {favorites.length === 0
                                        ? 'Save destinations you want to visit!'
                                        : `${favorites.length} saved destination${favorites.length !== 1 ? 's' : ''}`
                                    }
                                </p>
                            </div>

                            {favorites.length > 0 && (
                                <button
                                    onClick={() => {
                                        if (confirm('Clear all favorites?')) {
                                            clearFavorites();
                                        }
                                    }}
                                    className="btn"
                                    style={{ color: '#ef4444' }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                    Clear All
                                </button>
                            )}
                        </div>
                    </header>

                    {/* Empty state */}
                    {favorites.length === 0 && (
                        <motion.div
                            className="card"
                            style={{ padding: 60, textAlign: 'center' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div style={{ fontSize: '4rem', marginBottom: 16 }}>❤️</div>
                            <h2 style={{ marginBottom: 12 }}>No favorites yet</h2>
                            <p style={{ color: 'var(--txt-2)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                                Explore destinations and tap the heart icon to save places you want to visit later.
                            </p>
                            <Link to="/explore" className="btn btn-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                Explore Destinations
                            </Link>
                        </motion.div>
                    )}

                    {/* Favorites Grid */}
                    {favorites.length > 0 && (
                        <div className="destination-grid">
                            {favorites.map((loc, index) => (
                                <motion.div
                                    key={loc.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <div className="destination-card" style={{ display: 'block', position: 'relative' }}>
                                        <Link to={`/location/${loc.slug}`}>
                                            <div className="destination-image-wrap">
                                                <img
                                                    src={loc.image}
                                                    alt={getName(loc.name)}
                                                    className="destination-image"
                                                    loading="lazy"
                                                />
                                                <div className="destination-image-overlay" />
                                                <div className="destination-rating">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                    </svg>
                                                    {loc.rating}
                                                </div>
                                            </div>

                                            <div className="destination-content">
                                                <h3 className="destination-title">{getName(loc.name)}</h3>
                                                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                                    <span className="badge">{loc.crowd}</span>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Action buttons */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            display: 'flex',
                                            gap: 8
                                        }}>
                                            <CompareButton destination={loc} size="small" />
                                            <FavoriteButton destination={loc} size="small" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    {favorites.length > 0 && (
                        <motion.div
                            style={{
                                marginTop: 40,
                                display: 'flex',
                                gap: 16,
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link to="/compare" className="btn btn-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7" rx="1" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" />
                                </svg>
                                Compare Destinations
                            </Link>
                            <Link to="/itinerary-generator" className="btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <polyline points="14,2 14,8 20,8" />
                                </svg>
                                Plan a Trip
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
