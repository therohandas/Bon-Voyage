import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BudgetCalculator from '../components/BudgetCalculator';
import PackingList from '../components/PackingList';

export default function TravelTools() {
    const [activeTab, setActiveTab] = useState('budget');
    const [season, setSeason] = useState('winter');
    const [activities, setActivities] = useState(['temples']);
    const [days, setDays] = useState(3);

    const activityOptions = ['beaches', 'temples', 'wildlife', 'adventure', 'culture'];

    const toggleActivity = (act) => {
        setActivities(prev =>
            prev.includes(act)
                ? prev.filter(a => a !== act)
                : [...prev, act]
        );
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
                    <header style={{ textAlign: 'center', marginBottom: 40 }}>
                        <span className="hero-badge" style={{ marginBottom: 16 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                            </svg>
                            Travel Tools
                        </span>
                        <h1 style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontFamily: "'Playfair Display', serif",
                            marginBottom: 12
                        }}>
                            Plan Your Trip
                        </h1>
                        <p style={{ color: 'var(--txt-2)', maxWidth: 600, margin: '0 auto' }}>
                            Use these handy tools to estimate your budget, pack smartly, and discover personalized destinations.
                        </p>
                    </header>

                    {/* Tab Navigation */}
                    <div style={{
                        display: 'flex',
                        gap: 8,
                        marginBottom: 32,
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={() => setActiveTab('budget')}
                            className={`btn ${activeTab === 'budget' ? 'btn-primary' : ''}`}
                            style={{ padding: '12px 24px' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M12 8v8M8 12h8" />
                            </svg>
                            Budget Calculator
                        </button>
                        <button
                            onClick={() => setActiveTab('packing')}
                            className={`btn ${activeTab === 'packing' ? 'btn-primary' : ''}`}
                            style={{ padding: '12px 24px' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                            Packing List
                        </button>
                        <button
                            onClick={() => setActiveTab('picks')}
                            className={`btn ${activeTab === 'picks' ? 'btn-primary' : ''}`}
                            style={{ padding: '12px 24px' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Personalized Picks
                        </button>
                    </div>

                    {/* Budget Calculator */}
                    {activeTab === 'budget' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ maxWidth: 900, margin: '0 auto' }}
                        >
                            <BudgetCalculator selectedDestinations={[]} />
                        </motion.div>
                    )}

                    {/* Personalized Picks */}
                    {activeTab === 'picks' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ maxWidth: 900, margin: '0 auto' }}
                        >
                            <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✨</div>
                                <h3 style={{ marginBottom: 12 }}>Personalized Destination Picks</h3>
                                <p style={{ color: 'var(--txt-2)', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
                                    Answer a few questions about your travel preferences and get AI-powered recommendations tailored just for you.
                                </p>
                                <Link to="/recommendations" className="btn btn-primary" style={{ padding: '14px 32px' }}>
                                    Get Personalized Recommendations
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* Packing List */}
                    {activeTab === 'packing' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ maxWidth: 900, margin: '0 auto' }}
                        >
                            {/* Packing List Options */}
                            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                                <h3 style={{ marginBottom: 20 }}>Customize Your Packing List</h3>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                                    {/* Season */}
                                    <div>
                                        <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.85rem' }}>
                                            Season
                                        </label>
                                        <select
                                            value={season}
                                            onChange={(e) => setSeason(e.target.value)}
                                            className="btn"
                                            style={{ width: '100%', padding: '10px 12px' }}
                                        >
                                            <option value="summer">Summer (Mar-Jun)</option>
                                            <option value="monsoon">Monsoon (Jul-Sep)</option>
                                            <option value="winter">Winter (Oct-Feb)</option>
                                        </select>
                                    </div>

                                    {/* Days */}
                                    <div>
                                        <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.85rem' }}>
                                            Trip Duration
                                        </label>
                                        <select
                                            value={days}
                                            onChange={(e) => setDays(parseInt(e.target.value))}
                                            className="btn"
                                            style={{ width: '100%', padding: '10px 12px' }}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 10, 14].map(d => (
                                                <option key={d} value={d}>{d} day{d !== 1 ? 's' : ''}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Activities */}
                                <div style={{ marginTop: 20 }}>
                                    <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.85rem' }}>
                                        Activities Planned
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {activityOptions.map(act => (
                                            <button
                                                key={act}
                                                onClick={() => toggleActivity(act)}
                                                style={{
                                                    padding: '8px 16px',
                                                    background: activities.includes(act)
                                                        ? 'rgba(74, 222, 128, 0.15)'
                                                        : 'rgba(255,255,255,0.05)',
                                                    border: `1px solid ${activities.includes(act)
                                                        ? 'rgba(74, 222, 128, 0.4)'
                                                        : 'rgba(255,255,255,0.1)'}`,
                                                    borderRadius: 6,
                                                    cursor: 'pointer',
                                                    color: activities.includes(act) ? '#4ade80' : 'var(--txt-1)',
                                                    fontSize: '.9rem',
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {act}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <PackingList season={season} activities={activities} days={days} />
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
