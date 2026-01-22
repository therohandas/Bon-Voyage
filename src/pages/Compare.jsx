import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCompare } from '../contexts/CompareContext';
import { getImageProps } from '../utils/imageUtils';

export default function Compare() {
    const { compareList, removeFromCompare, clearCompare } = useCompare();

    const getName = (name) => {
        if (typeof name === 'string') return name;
        if (typeof name === 'object') return name.en || Object.values(name)[0];
        return 'Unknown';
    };

    const getActivities = (activities) => {
        if (Array.isArray(activities)) return activities;
        if (typeof activities === 'string') return [activities];
        return [];
    };

    const comparisonFields = [
        { key: 'rating', label: 'Rating', icon: '⭐', format: (v) => v },
        { key: 'crowd', label: 'Crowd Level', icon: '👥', format: (v) => v },
        { key: 'best_time', label: 'Best Time', icon: '📅', format: (v) => v },
        { key: 'timings', label: 'Timings', icon: '🕐', format: (v) => v },
        { key: 'entry_fee', label: 'Entry Fee', icon: '🎫', format: (v) => v },
        { key: 'activities', label: 'Activities', icon: '🎯', format: (v) => getActivities(v).join(', ') }
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
                    <header style={{ marginBottom: 32 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <div>
                                <h1 style={{
                                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                    fontFamily: "'Playfair Display', serif",
                                    marginBottom: 8
                                }}>
                                    Compare Destinations
                                </h1>
                                <p style={{ color: 'var(--txt-2)' }}>
                                    {compareList.length === 0
                                        ? 'Add up to 3 destinations to compare'
                                        : `Comparing ${compareList.length} destination${compareList.length !== 1 ? 's' : ''}`
                                    }
                                </p>
                            </div>

                            {compareList.length > 0 && (
                                <button
                                    onClick={() => clearCompare()}
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
                    {compareList.length === 0 && (
                        <motion.div
                            className="card"
                            style={{ padding: 60, textAlign: 'center' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div style={{ fontSize: '4rem', marginBottom: 16 }}>⚖️</div>
                            <h2 style={{ marginBottom: 12 }}>No destinations to compare</h2>
                            <p style={{ color: 'var(--txt-2)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                                Browse destinations and click the compare button to add them to your comparison list.
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

                    {/* Comparison Table */}
                    {compareList.length > 0 && (
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                                    {/* Header with images */}
                                    <thead>
                                        <tr>
                                            <th style={{
                                                padding: 16,
                                                background: 'rgba(255,255,255,0.03)',
                                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                                textAlign: 'left',
                                                fontWeight: 600,
                                                width: 140
                                            }}>
                                                Destination
                                            </th>
                                            {compareList.map(dest => (
                                                <th
                                                    key={dest.id}
                                                    style={{
                                                        padding: 0,
                                                        background: 'rgba(255,255,255,0.03)',
                                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                                        position: 'relative',
                                                        verticalAlign: 'top'
                                                    }}
                                                >
                                                    {/* Remove button */}
                                                    <button
                                                        onClick={() => removeFromCompare(dest.id)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: 8,
                                                            right: 8,
                                                            background: 'rgba(0,0,0,0.5)',
                                                            border: 'none',
                                                            borderRadius: '50%',
                                                            width: 28,
                                                            height: 28,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer',
                                                            color: 'white',
                                                            zIndex: 10
                                                        }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <line x1="18" y1="6" x2="6" y2="18" />
                                                            <line x1="6" y1="6" x2="18" y2="18" />
                                                        </svg>
                                                    </button>

                                                    {/* Image */}
                                                    <div style={{ height: 140, overflow: 'hidden' }}>
                                                        <img
                                                            {...getImageProps(dest)}
                                                            alt={getName(dest.name)}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    </div>

                                                    {/* Name */}
                                                    <div style={{ padding: '12px 16px' }}>
                                                        <Link
                                                            to={`/location/${dest.slug}`}
                                                            style={{
                                                                color: 'inherit',
                                                                textDecoration: 'none',
                                                                fontWeight: 600,
                                                                fontSize: '1rem'
                                                            }}
                                                        >
                                                            {getName(dest.name)}
                                                        </Link>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    {/* Comparison rows */}
                                    <tbody>
                                        {comparisonFields.map((field, idx) => (
                                            <tr key={field.key}>
                                                <td style={{
                                                    padding: '14px 16px',
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                                                    fontWeight: 500,
                                                    color: 'var(--txt-2)'
                                                }}>
                                                    <span style={{ marginRight: 8 }}>{field.icon}</span>
                                                    {field.label}
                                                </td>
                                                {compareList.map(dest => (
                                                    <td
                                                        key={dest.id}
                                                        style={{
                                                            padding: '14px 16px',
                                                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                            background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        {field.key === 'rating' ? (
                                                            <span style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: 4,
                                                                background: 'rgba(251, 191, 36, 0.15)',
                                                                padding: '4px 10px',
                                                                borderRadius: 6
                                                            }}>
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                                </svg>
                                                                {dest[field.key]}
                                                            </span>
                                                        ) : (
                                                            <span style={{ fontSize: '.9rem' }}>
                                                                {field.format(dest[field.key]) || '—'}
                                                            </span>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Add more prompt */}
                    {compareList.length > 0 && compareList.length < 3 && (
                        <motion.div
                            style={{
                                marginTop: 24,
                                textAlign: 'center',
                                padding: 20,
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 12,
                                border: '1px dashed rgba(255,255,255,0.1)'
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p style={{ color: 'var(--muted)', marginBottom: 12 }}>
                                Add {3 - compareList.length} more destination{3 - compareList.length !== 1 ? 's' : ''} to compare
                            </p>
                            <Link to="/explore" className="btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                Add Destination
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
