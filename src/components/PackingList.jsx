import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import packingData from '../data/packingData.json';

export default function PackingList({
    season = 'winter',
    activities = [],
    days = 3
}) {
    const [checkedItems, setCheckedItems] = useState({});

    const items = useMemo(() => {
        const allItems = [];

        // Essential items
        packingData.essentials.forEach(item => {
            allItems.push({ category: 'Essentials', item, required: true });
        });

        // Season-specific clothing
        const seasonClothing = packingData.clothing[season] || packingData.clothing.winter;
        seasonClothing.forEach(item => {
            allItems.push({ category: 'Clothing', item, required: true });
        });

        // Activity-specific items
        activities.forEach(activity => {
            const activityItems = packingData.activities[activity];
            if (activityItems) {
                activityItems.forEach(item => {
                    if (!allItems.find(i => i.item === item)) {
                        allItems.push({ category: `For ${activity}`, item, required: false });
                    }
                });
            }
        });

        // Electronics
        packingData.electronics.forEach(item => {
            allItems.push({ category: 'Electronics', item, required: false });
        });

        // Toiletries
        packingData.toiletries.forEach(item => {
            allItems.push({ category: 'Toiletries', item, required: false });
        });

        // Optional items for longer trips
        if (days >= 5) {
            packingData.optional.forEach(item => {
                allItems.push({ category: 'Optional', item, required: false });
            });
        }

        return allItems;
    }, [season, activities, days]);

    const groupedItems = useMemo(() => {
        const groups = {};
        items.forEach(({ category, item, required }) => {
            if (!groups[category]) groups[category] = [];
            groups[category].push({ item, required });
        });
        return groups;
    }, [items]);

    const toggleItem = (item) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const totalCount = items.length;
    const progress = (checkedCount / totalCount) * 100;

    const handlePrint = () => {
        window.print();
    };

    const handleReset = () => {
        setCheckedItems({});
    };

    return (
        <motion.div
            className="card packing-list"
            style={{ padding: 24 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    Packing List
                </h3>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={handleReset}
                        className="btn"
                        style={{ padding: '6px 12px', fontSize: '.8rem' }}
                    >
                        Reset
                    </button>
                    <button
                        onClick={handlePrint}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '.8rem' }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 6 2 18 2 18 9" />
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                            <rect x="6" y="14" width="12" height="8" />
                        </svg>
                        Print
                    </button>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
                        Packing Progress
                    </span>
                    <span style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
                        {checkedCount} / {totalCount} items
                    </span>
                </div>
                <div style={{
                    height: 8,
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    overflow: 'hidden'
                }}>
                    <motion.div
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--p-1), var(--p-2))',
                            borderRadius: 4
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Trip info badges */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                <span className="badge">
                    🗓️ {days} days trip
                </span>
                <span className="badge">
                    {season === 'summer' && '☀️'}
                    {season === 'monsoon' && '🌧️'}
                    {season === 'winter' && '❄️'}
                    {' '}{season.charAt(0).toUpperCase() + season.slice(1)} season
                </span>
                {activities.map(act => (
                    <span key={act} className="badge">
                        {act === 'beaches' && '🏖️'}
                        {act === 'temples' && '🛕'}
                        {act === 'wildlife' && '🦁'}
                        {act === 'adventure' && '🥾'}
                        {act === 'culture' && '🎭'}
                        {' '}{act.charAt(0).toUpperCase() + act.slice(1)}
                    </span>
                ))}
            </div>

            {/* Item categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {Object.entries(groupedItems).map(([category, categoryItems]) => (
                    <div key={category}>
                        <h4 style={{
                            fontSize: '.9rem',
                            color: 'var(--muted)',
                            marginBottom: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        }}>
                            {category}
                            <span style={{
                                fontSize: '.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '2px 8px',
                                borderRadius: 4
                            }}>
                                {categoryItems.filter(i => checkedItems[i.item]).length}/{categoryItems.length}
                            </span>
                        </h4>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: 8
                        }}>
                            {categoryItems.map(({ item, required }) => (
                                <label
                                    key={item}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: '10px 14px',
                                        background: checkedItems[item]
                                            ? 'rgba(74, 222, 128, 0.1)'
                                            : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${checkedItems[item]
                                            ? 'rgba(74, 222, 128, 0.3)'
                                            : 'rgba(255,255,255,0.05)'}`,
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={checkedItems[item] || false}
                                        onChange={() => toggleItem(item)}
                                        style={{
                                            accentColor: '#4ade80',
                                            width: 18,
                                            height: 18
                                        }}
                                    />
                                    <span style={{
                                        textDecoration: checkedItems[item] ? 'line-through' : 'none',
                                        color: checkedItems[item] ? 'var(--muted)' : 'var(--txt-1)',
                                        fontSize: '.9rem'
                                    }}>
                                        {item}
                                        {required && (
                                            <span style={{ color: '#ef4444', marginLeft: 4 }}>*</span>
                                        )}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <p style={{ color: 'var(--muted)', fontSize: '.8rem', marginTop: 20, fontStyle: 'italic' }}>
                * Required items for your trip
            </p>

            <style>{`
        @media print {
          .packing-list {
            background: white !important;
            color: black !important;
            padding: 20px !important;
          }
          .packing-list .btn {
            display: none !important;
          }
        }
      `}</style>
        </motion.div>
    );
}
