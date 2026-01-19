import React from 'react';
import { motion } from 'framer-motion';
import seasonalData from '../data/seasonalData.json';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function BestTimeCalendar({ locationSlug }) {
    const locationData = seasonalData[locationSlug] || seasonalData.default;
    const defaultData = seasonalData.default;

    const getMonthData = (monthNum) => {
        const locMonth = locationData.months?.[monthNum];
        const defaultMonth = defaultData.months?.[monthNum] || {};
        return locMonth ? { ...defaultMonth, ...locMonth } : defaultMonth;
    };

    const getCrowdColor = (crowd) => {
        if (!crowd) return 'rgba(255,255,255,0.1)';
        const c = crowd.toLowerCase();
        if (c.includes('closed')) return 'rgba(239, 68, 68, 0.3)';
        if (c.includes('extreme') || c.includes('very high')) return 'rgba(239, 68, 68, 0.25)';
        if (c.includes('high')) return 'rgba(251, 191, 36, 0.25)';
        if (c.includes('moderate')) return 'rgba(251, 191, 36, 0.15)';
        if (c.includes('low') || c.includes('very low')) return 'rgba(74, 222, 128, 0.2)';
        if (c.includes('seasonal')) return 'rgba(59, 130, 246, 0.2)';
        return 'rgba(255,255,255,0.1)';
    };

    const getCrowdLabel = (crowd) => {
        if (!crowd) return 'Moderate';
        if (crowd.toLowerCase().includes('closed')) return '🚫 Closed';
        return crowd;
    };

    const isBestMonth = (monthNum) => {
        return locationData.bestMonths?.includes(Number(monthNum)) ||
            defaultData.bestMonths?.includes(Number(monthNum));
    };

    const isClosedMonth = (monthNum) => {
        return locationData.closedMonths?.includes(Number(monthNum));
    };

    const currentMonth = new Date().getMonth() + 1;

    // Get all festivals
    const allFestivals = { ...defaultData.festivals, ...locationData.festivals };

    return (
        <motion.div
            className="card"
            style={{ padding: 24 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Best Time to Visit
            </h3>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20, fontSize: '.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: 'rgba(74, 222, 128, 0.2)' }} />
                    <span style={{ color: 'var(--muted)' }}>Low Crowd</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: 'rgba(251, 191, 36, 0.2)' }} />
                    <span style={{ color: 'var(--muted)' }}>Moderate-High</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: 'rgba(239, 68, 68, 0.25)' }} />
                    <span style={{ color: 'var(--muted)' }}>Very High/Closed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: '1rem' }}>⭐</span>
                    <span style={{ color: 'var(--muted)' }}>Best Month</span>
                </div>
            </div>

            {/* Calendar Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 10,
                marginBottom: 20
            }}>
                {monthNames.map((month, idx) => {
                    const monthNum = (idx + 1).toString();
                    const monthData = getMonthData(monthNum);
                    const isBest = isBestMonth(parseInt(monthNum));
                    const isClosed = isClosedMonth(parseInt(monthNum));
                    const isCurrent = currentMonth === idx + 1;

                    return (
                        <motion.div
                            key={month}
                            style={{
                                padding: '12px 8px',
                                background: getCrowdColor(monthData.crowd),
                                borderRadius: 8,
                                textAlign: 'center',
                                position: 'relative',
                                border: isCurrent ? '2px solid var(--p-2)' : '1px solid rgba(255,255,255,0.05)',
                                opacity: isClosed ? 0.6 : 1
                            }}
                            whileHover={{ scale: 1.02 }}
                            title={monthData.note || `${month}: ${getCrowdLabel(monthData.crowd)}`}
                        >
                            {isBest && !isClosed && (
                                <span style={{
                                    position: 'absolute',
                                    top: -6,
                                    right: -6,
                                    fontSize: '.8rem'
                                }}>
                                    ⭐
                                </span>
                            )}

                            <div style={{
                                fontWeight: 600,
                                marginBottom: 4,
                                fontSize: isCurrent ? '1rem' : '.9rem',
                                color: isCurrent ? 'var(--p-2)' : 'inherit'
                            }}>
                                {month}
                            </div>

                            <div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>
                                {isClosed ? '🚫 Closed' : getCrowdLabel(monthData.crowd)}
                            </div>

                            {monthData.temp && !isClosed && (
                                <div style={{ fontSize: '.65rem', color: 'var(--muted)', marginTop: 2 }}>
                                    {monthData.temp}°C
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Festivals & Events */}
            {Object.keys(allFestivals).length > 0 && (
                <div style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: '.9rem', color: 'var(--muted)', marginBottom: 12 }}>
                        🎉 Festivals & Events
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {Object.entries(allFestivals).map(([monthNum, events]) => (
                            <div
                                key={monthNum}
                                style={{
                                    padding: '10px 14px',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: 8,
                                    display: 'flex',
                                    gap: 12,
                                    alignItems: 'flex-start'
                                }}
                            >
                                <span style={{
                                    fontWeight: 600,
                                    color: 'var(--p-2)',
                                    minWidth: 30
                                }}>
                                    {monthNames[parseInt(monthNum) - 1]}
                                </span>
                                <div>
                                    {events.map((event, idx) => (
                                        <div key={idx} style={{ color: 'var(--txt-2)', fontSize: '.85rem' }}>
                                            • {event}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Special Note */}
            {locationData.specialNote && (
                <div style={{
                    padding: '12px 16px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: 8,
                    color: 'var(--txt-2)',
                    fontSize: '.85rem'
                }}>
                    <strong style={{ color: '#3b82f6' }}>💡 Tip:</strong> {locationData.specialNote}
                </div>
            )}
        </motion.div>
    );
}
