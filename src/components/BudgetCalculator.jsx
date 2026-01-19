import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import costData from '../data/costData.json';

export default function BudgetCalculator({ selectedDestinations = [] }) {
    const [travelers, setTravelers] = useState(2);
    const [days, setDays] = useState(3);
    const [accommodation, setAccommodation] = useState('midRange');
    const [meals, setMeals] = useState('restaurants');
    const [transport, setTransport] = useState('taxi');
    const [includeGuide, setIncludeGuide] = useState(false);
    const [includeActivities, setIncludeActivities] = useState(true);

    const breakdown = useMemo(() => {
        const costs = {
            accommodation: 0,
            meals: 0,
            transport: 0,
            activities: 0,
            misc: 0
        };

        // Accommodation
        const accData = costData.accommodation[accommodation];
        const avgAccCost = (accData.min + accData.max) / 2;
        costs.accommodation = avgAccCost * days * Math.ceil(travelers / 2); // Assuming double sharing

        // Meals (3 meals per day)
        const mealCost = costData.meals[meals].perMeal;
        costs.meals = mealCost * 3 * days * travelers;

        // Transport
        const transportData = costData.transport[transport];
        if (transportData.perDay) {
            costs.transport = transportData.perDay * days;
        } else {
            // Estimate 100km per day average travel
            costs.transport = transportData.perKm * 100 * days;
        }

        // Activities & Entry fees
        if (includeActivities) {
            // Calculate entry fees for selected destinations
            selectedDestinations.forEach(dest => {
                const destFees = costData.destinationFees[dest.slug];
                if (destFees) {
                    costs.activities += (destFees.entry || 0) * travelers;
                    if (destFees.boat) costs.activities += destFees.boat;
                    if (destFees.safari) costs.activities += destFees.safari;
                } else {
                    // Default activity cost per destination
                    costs.activities += costData.activities.monumentEntry * travelers;
                }
            });

            // Add guide fee if selected
            if (includeGuide) {
                costs.activities += costData.activities.guideFee * days;
            }
        }

        // Miscellaneous
        costs.misc = (costData.misc.waterBottle * 3 + costData.misc.snacks * 2) * days * travelers;
        costs.misc += costData.misc.souvenirs;
        costs.misc += costData.misc.tips * days;

        return costs;
    }, [travelers, days, accommodation, meals, transport, includeGuide, includeActivities, selectedDestinations]);

    const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
    const perPerson = total / travelers;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <motion.div
            className="card"
            style={{ padding: 24 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M12 8v8M8 12h8" />
                </svg>
                Budget Calculator
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                {/* Travelers */}
                <div>
                    <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.85rem' }}>
                        Number of Travelers
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button
                            onClick={() => setTravelers(prev => Math.max(1, prev - 1))}
                            className="btn"
                            style={{ padding: '8px 12px' }}
                        >
                            -
                        </button>
                        <span style={{ fontSize: '1.2rem', fontWeight: 600, minWidth: 30, textAlign: 'center' }}>
                            {travelers}
                        </span>
                        <button
                            onClick={() => setTravelers(prev => Math.min(10, prev + 1))}
                            className="btn"
                            style={{ padding: '8px 12px' }}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Days */}
                <div>
                    <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.85rem' }}>
                        Duration (Days)
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button
                            onClick={() => setDays(prev => Math.max(1, prev - 1))}
                            className="btn"
                            style={{ padding: '8px 12px' }}
                        >
                            -
                        </button>
                        <span style={{ fontSize: '1.2rem', fontWeight: 600, minWidth: 30, textAlign: 'center' }}>
                            {days}
                        </span>
                        <button
                            onClick={() => setDays(prev => Math.min(14, prev + 1))}
                            className="btn"
                            style={{ padding: '8px 12px' }}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Accommodation */}
                <div>
                    <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.85rem' }}>
                        Accommodation
                    </label>
                    <select
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                        className="btn"
                        style={{ width: '100%', padding: '10px 12px' }}
                    >
                        {Object.entries(costData.accommodation).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>

                {/* Meals */}
                <div>
                    <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.85rem' }}>
                        Food Preference
                    </label>
                    <select
                        value={meals}
                        onChange={(e) => setMeals(e.target.value)}
                        className="btn"
                        style={{ width: '100%', padding: '10px 12px' }}
                    >
                        {Object.entries(costData.meals).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>

                {/* Transport */}
                <div>
                    <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.85rem' }}>
                        Transport Mode
                    </label>
                    <select
                        value={transport}
                        onChange={(e) => setTransport(e.target.value)}
                        className="btn"
                        style={{ width: '100%', padding: '10px 12px' }}
                    >
                        {Object.entries(costData.transport).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>

                {/* Options */}
                <div>
                    <label style={{ display: 'block', marginBottom: 12, color: 'var(--muted)', fontSize: '.85rem' }}>
                        Additional Options
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 8 }}>
                        <input
                            type="checkbox"
                            checked={includeActivities}
                            onChange={(e) => setIncludeActivities(e.target.checked)}
                            style={{ accentColor: 'var(--p-2)' }}
                        />
                        Include entry fees
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={includeGuide}
                            onChange={(e) => setIncludeGuide(e.target.checked)}
                            style={{ accentColor: 'var(--p-2)' }}
                        />
                        Hire a local guide
                    </label>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <h4 style={{ marginBottom: 16, color: 'var(--muted)', fontSize: '.9rem' }}>Cost Breakdown</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { label: '🏨 Accommodation', value: breakdown.accommodation },
                        { label: '🍽️ Food & Meals', value: breakdown.meals },
                        { label: '🚗 Transport', value: breakdown.transport },
                        { label: '🎫 Activities & Entry', value: breakdown.activities },
                        { label: '🛍️ Miscellaneous', value: breakdown.misc }
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--txt-2)' }}>{item.label}</span>
                            <span style={{ fontWeight: 500 }}>{formatCurrency(item.value)}</span>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 16, paddingTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Estimated Cost</span>
                        <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--e-gold)' }}>
                            {formatCurrency(total)}
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                        <span>Per Person</span>
                        <span>{formatCurrency(perPerson)}</span>
                    </div>
                </div>
            </div>

            <p style={{ color: 'var(--muted)', fontSize: '.8rem', fontStyle: 'italic' }}>
                * This is an estimate based on average costs in Odisha. Actual costs may vary based on season, booking platform, and personal choices.
            </p>
        </motion.div>
    );
}
