import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAIDestinationInsights } from '../services/aiService';

export default function AIInsights({ destination }) {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const name = typeof destination?.name === 'object'
        ? destination.name.en
        : destination?.name;

    const fetchInsights = async () => {
        if (!destination || insights) return;

        setLoading(true);
        setError(null);

        try {
            const data = await getAIDestinationInsights(destination);
            setInsights(data);
        } catch (err) {
            setError('Could not load AI insights');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isExpanded && !insights && !loading) {
            fetchInsights();
        }
    }, [isExpanded]);

    return (
        <motion.div
            className="card"
            style={{ padding: 24 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'inherit',
                    padding: 0
                }}
            >
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        ✨
                    </span>
                    AI Travel Tips
                    <span style={{
                        fontSize: '.7rem',
                        padding: '2px 8px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 12,
                        color: 'white'
                    }}>
                        BETA
                    </span>
                </h3>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                    }}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    style={{ marginTop: 20 }}
                >
                    {loading && (
                        <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                style={{ display: 'inline-block', marginBottom: 12 }}
                            >
                                ✨
                            </motion.div>
                            <p>Getting AI-powered insights for {name}...</p>
                        </div>
                    )}

                    {error && (
                        <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)' }}>
                            <p>{error}</p>
                            <button className="btn" onClick={fetchInsights} style={{ marginTop: 12 }}>
                                Try Again
                            </button>
                        </div>
                    )}

                    {insights && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* Highlight */}
                            <div style={{
                                padding: 16,
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                borderRadius: 12,
                                border: '1px solid rgba(102, 126, 234, 0.2)'
                            }}>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                                    💡 {insights.highlight}
                                </p>
                            </div>

                            {/* Best Time */}
                            {insights.bestTime && (
                                <div>
                                    <h4 style={{ marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                                        📅 Best Time to Visit
                                    </h4>
                                    <p>
                                        <strong>{insights.bestTime.months}</strong> - {insights.bestTime.reason}
                                    </p>
                                </div>
                            )}

                            {/* Hidden Gems */}
                            {insights.hiddenGems?.length > 0 && (
                                <div>
                                    <h4 style={{ marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                                        💎 Hidden Gems
                                    </h4>
                                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                                        {insights.hiddenGems.map((gem, i) => (
                                            <li key={i} style={{ marginBottom: 4 }}>{gem}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Food */}
                            {insights.foodMustTry?.length > 0 && (
                                <div>
                                    <h4 style={{ marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                                        🍽️ Must-Try Food
                                    </h4>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        {insights.foodMustTry.map((food, i) => (
                                            <span key={i} className="badge" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                                                {food}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Photo Tips */}
                            {insights.photoTips?.length > 0 && (
                                <div>
                                    <h4 style={{ marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                                        📸 Photography Tips
                                    </h4>
                                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                                        {insights.photoTips.map((tip, i) => (
                                            <li key={i} style={{ marginBottom: 4 }}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Etiquette */}
                            {insights.etiquette?.length > 0 && (
                                <div>
                                    <h4 style={{ marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                                        🙏 Cultural Etiquette
                                    </h4>
                                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                                        {insights.etiquette.map((rule, i) => (
                                            <li key={i} style={{ marginBottom: 4 }}>{rule}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Saving Tips */}
                            {insights.savingTips?.length > 0 && (
                                <div>
                                    <h4 style={{ marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                                        💰 Money-Saving Tips
                                    </h4>
                                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                                        {insights.savingTips.map((tip, i) => (
                                            <li key={i} style={{ marginBottom: 4 }}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <p style={{ fontSize: '.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>
                                ✨ Generated by AI. Information may not always be accurate.
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}
