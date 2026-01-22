import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import locations from '../data/locations.json';
import { getRecommendations } from '../utils/RecommendationEngine';
import { getImageProps } from '../utils/imageUtils';
import FavoriteButton from '../components/FavoriteButton';
import CompareButton from '../components/CompareButton';

const interestOptions = [
    { key: 'beaches', label: 'Beaches', emoji: '🏖️' },
    { key: 'temples', label: 'Temples', emoji: '🛕' },
    { key: 'wildlife', label: 'Wildlife', emoji: '🦁' },
    { key: 'adventure', label: 'Adventure', emoji: '🥾' },
    { key: 'culture', label: 'Culture', emoji: '🎭' },
    { key: 'food', label: 'Food', emoji: '🍽️' }
];

const travelStyles = [
    { key: 'relaxed', label: 'Relaxed', desc: 'Peaceful, less crowded spots' },
    { key: 'moderate', label: 'Moderate', desc: 'Mix of popular and quiet' },
    { key: 'adventure', label: 'Adventure', desc: 'Active exploration' }
];

const companions = [
    { key: 'solo', label: 'Solo', emoji: '🧑' },
    { key: 'couple', label: 'Couple', emoji: '❤️' },
    { key: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { key: 'friends', label: 'Friends', emoji: '👯' }
];

export default function Recommendations() {
    const [interests, setInterests] = useState([]);
    const [travelStyle, setTravelStyle] = useState('moderate');
    const [companionType, setCompanionType] = useState('');
    const [travelMonth, setTravelMonth] = useState(new Date().getMonth() + 1);
    const [showResults, setShowResults] = useState(false);

    const toggleInterest = (key) => {
        setInterests(prev =>
            prev.includes(key)
                ? prev.filter(i => i !== key)
                : [...prev, key]
        );
    };

    const recommendations = useMemo(() => {
        if (!showResults) return [];

        const preferences = {
            interests,
            travelStyle,
            companionType,
            travelMonth
        };

        return getRecommendations(locations, preferences, 12);
    }, [showResults, interests, travelStyle, companionType, travelMonth]);

    const getName = (name) => {
        if (typeof name === 'string') return name;
        if (typeof name === 'object') return name.en || Object.values(name)[0];
        return 'Unknown';
    };

    const handleGetRecommendations = () => {
        if (interests.length === 0) {
            alert('Please select at least one interest');
            return;
        }
        setShowResults(true);
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="page-content">
            <div className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <header style={{ textAlign: 'center', marginBottom: 40 }}>
                        <span className="hero-badge" style={{ marginBottom: 16 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                            Smart Recommendations
                        </span>
                        <h1 style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontFamily: "'Playfair Display', serif",
                            marginBottom: 12
                        }}>
                            Find Your Perfect Destination
                        </h1>
                        <p style={{ color: 'var(--txt-2)', maxWidth: 600, margin: '0 auto' }}>
                            Tell us what you love, and we'll recommend the best places in Odisha for you.
                        </p>
                    </header>

                    {/* Preferences Form */}
                    {!showResults && (
                        <motion.div
                            className="card"
                            style={{ padding: 32, maxWidth: 700, margin: '0 auto' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Interests */}
                            <div style={{ marginBottom: 28 }}>
                                <h3 style={{ marginBottom: 16, fontSize: '1.1rem' }}>
                                    What interests you? *
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                    {interestOptions.map(opt => (
                                        <button
                                            key={opt.key}
                                            onClick={() => toggleInterest(opt.key)}
                                            style={{
                                                padding: '12px 20px',
                                                background: interests.includes(opt.key)
                                                    ? 'rgba(74, 222, 128, 0.15)'
                                                    : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${interests.includes(opt.key)
                                                    ? 'rgba(74, 222, 128, 0.4)'
                                                    : 'rgba(255,255,255,0.1)'}`,
                                                borderRadius: 10,
                                                cursor: 'pointer',
                                                color: interests.includes(opt.key) ? '#4ade80' : 'var(--txt-1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <span style={{ fontSize: '1.2rem' }}>{opt.emoji}</span>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Travel Style */}
                            <div style={{ marginBottom: 28 }}>
                                <h3 style={{ marginBottom: 16, fontSize: '1.1rem' }}>
                                    Your travel style
                                </h3>
                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    {travelStyles.map(style => (
                                        <button
                                            key={style.key}
                                            onClick={() => setTravelStyle(style.key)}
                                            style={{
                                                flex: '1 1 150px',
                                                padding: '16px 20px',
                                                background: travelStyle === style.key
                                                    ? 'rgba(59, 130, 246, 0.15)'
                                                    : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${travelStyle === style.key
                                                    ? 'rgba(59, 130, 246, 0.4)'
                                                    : 'rgba(255,255,255,0.1)'}`,
                                                borderRadius: 10,
                                                cursor: 'pointer',
                                                color: travelStyle === style.key ? '#3b82f6' : 'var(--txt-1)',
                                                textAlign: 'left',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ fontWeight: 600, marginBottom: 4 }}>{style.label}</div>
                                            <div style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{style.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Companion Type */}
                            <div style={{ marginBottom: 28 }}>
                                <h3 style={{ marginBottom: 16, fontSize: '1.1rem' }}>
                                    Who's traveling?
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                    {companions.map(c => (
                                        <button
                                            key={c.key}
                                            onClick={() => setCompanionType(companionType === c.key ? '' : c.key)}
                                            style={{
                                                padding: '10px 18px',
                                                background: companionType === c.key
                                                    ? 'rgba(251, 191, 36, 0.15)'
                                                    : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${companionType === c.key
                                                    ? 'rgba(251, 191, 36, 0.4)'
                                                    : 'rgba(255,255,255,0.1)'}`,
                                                borderRadius: 8,
                                                cursor: 'pointer',
                                                color: companionType === c.key ? '#fbbf24' : 'var(--txt-1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <span>{c.emoji}</span>
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Travel Month */}
                            <div style={{ marginBottom: 32 }}>
                                <h3 style={{ marginBottom: 16, fontSize: '1.1rem' }}>
                                    When are you planning to visit?
                                </h3>
                                <select
                                    value={travelMonth}
                                    onChange={(e) => setTravelMonth(parseInt(e.target.value))}
                                    className="btn"
                                    style={{ width: '100%', padding: '12px 16px', maxWidth: 300 }}
                                >
                                    {months.map((month, idx) => (
                                        <option key={idx} value={idx + 1}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit */}
                            <button
                                onClick={handleGetRecommendations}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                Get Recommendations
                            </button>
                        </motion.div>
                    )}

                    {/* Results */}
                    {showResults && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Back button & summary */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 24,
                                flexWrap: 'wrap',
                                gap: 16
                            }}>
                                <button
                                    onClick={() => setShowResults(false)}
                                    className="btn"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                    Modify Preferences
                                </button>

                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {interests.map(i => (
                                        <span key={i} className="badge">
                                            {interestOptions.find(o => o.key === i)?.emoji} {interestOptions.find(o => o.key === i)?.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Results heading */}
                            <h2 style={{ marginBottom: 24 }}>
                                Top {recommendations.length} Recommendations for You
                            </h2>

                            {/* Results grid */}
                            <div className="destination-grid">
                                {recommendations.map((loc, index) => (
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
                                                        {...getImageProps(loc)}
                                                        alt={getName(loc.name)}
                                                        className="destination-image"
                                                        loading="lazy"
                                                    />
                                                    <div className="destination-image-overlay" />

                                                    {/* Match score */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 12,
                                                        left: 12,
                                                        background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.9), rgba(34, 197, 94, 0.9))',
                                                        padding: '6px 12px',
                                                        borderRadius: 6,
                                                        fontSize: '.8rem',
                                                        fontWeight: 600,
                                                        color: 'white'
                                                    }}>
                                                        {loc.matchScore}% Match
                                                    </div>

                                                    <div className="destination-rating">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                        </svg>
                                                        {loc.rating}
                                                    </div>
                                                </div>

                                                <div className="destination-content">
                                                    <h3 className="destination-title">{getName(loc.name)}</h3>
                                                    <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                                                        <span className="badge">{loc.crowd}</span>
                                                        <span style={{ color: 'var(--muted)', fontSize: '.8rem' }}>
                                                            {loc.best_time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>

                                            {/* Action buttons */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 12,
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
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
