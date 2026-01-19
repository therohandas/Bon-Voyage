import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Weather Widget Component
 * Uses Open-Meteo free API (no key required)
 */
export default function WeatherWidget({ lat, lng, locationName }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!lat || !lng) return;

        const fetchWeather = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata&forecast_days=5`
                );

                if (!response.ok) throw new Error('Weather data unavailable');

                const data = await response.json();
                setWeather(data);
                setError(null);
            } catch (err) {
                setError('Unable to load weather');
                console.error('Weather fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lng]);

    const getWeatherIcon = (code) => {
        // WMO Weather interpretation codes
        if (code === 0) return '☀️';
        if (code <= 3) return '⛅';
        if (code <= 49) return '🌫️';
        if (code <= 59) return '🌧️';
        if (code <= 69) return '🌨️';
        if (code <= 79) return '❄️';
        if (code <= 84) return '🌧️';
        if (code <= 94) return '🌩️';
        if (code <= 99) return '⛈️';
        return '🌤️';
    };

    const getWeatherDescription = (code) => {
        if (code === 0) return 'Clear sky';
        if (code <= 3) return 'Partly cloudy';
        if (code <= 49) return 'Foggy';
        if (code <= 59) return 'Drizzle';
        if (code <= 69) return 'Rain';
        if (code <= 79) return 'Snow';
        if (code <= 84) return 'Rain showers';
        if (code <= 94) return 'Thunderstorm';
        if (code <= 99) return 'Heavy thunderstorm';
        return 'Variable';
    };

    const getClothingSuggestion = (temp, weatherCode) => {
        const suggestions = [];

        if (temp > 30) {
            suggestions.push('Light cotton clothes', 'Sunglasses', 'Sunscreen');
        } else if (temp > 20) {
            suggestions.push('Light layers', 'Comfortable shoes');
        } else if (temp > 10) {
            suggestions.push('Light jacket', 'Full sleeves');
        } else {
            suggestions.push('Warm jacket', 'Sweater', 'Warm socks');
        }

        if (weatherCode >= 50 && weatherCode <= 69) {
            suggestions.push('Umbrella', 'Rain jacket');
        }

        return suggestions;
    };

    if (loading) {
        return (
            <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ color: 'var(--muted)' }}>Loading weather...</div>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ color: 'var(--muted)' }}>{error || 'Weather unavailable'}</div>
            </div>
        );
    }

    const current = weather.current;
    const daily = weather.daily;
    const clothingSuggestions = getClothingSuggestion(current.temperature_2m, current.weather_code);

    return (
        <motion.div
            className="card"
            style={{ padding: 20 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                Current Weather
            </h3>

            {/* Current conditions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ fontSize: '3rem' }}>
                    {getWeatherIcon(current.weather_code)}
                </div>
                <div>
                    <div style={{ fontSize: '2rem', fontWeight: 600 }}>
                        {Math.round(current.temperature_2m)}°C
                    </div>
                    <div style={{ color: 'var(--txt-2)' }}>
                        {getWeatherDescription(current.weather_code)}
                    </div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
                        💧 {current.relative_humidity_2m}% humidity
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
                        💨 {Math.round(current.wind_speed_10m)} km/h wind
                    </div>
                </div>
            </div>

            {/* 5-day forecast */}
            <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: '.9rem', color: 'var(--muted)', marginBottom: 12 }}>5-Day Forecast</h4>
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
                    {daily.time.map((date, idx) => (
                        <div
                            key={date}
                            style={{
                                flex: '0 0 auto',
                                padding: '10px 14px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 8,
                                textAlign: 'center',
                                minWidth: 70
                            }}
                        >
                            <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: 4 }}>
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>
                                {getWeatherIcon(daily.weather_code[idx])}
                            </div>
                            <div style={{ fontSize: '.85rem' }}>
                                <span style={{ color: 'var(--e-gold)' }}>{Math.round(daily.temperature_2m_max[idx])}°</span>
                                <span style={{ color: 'var(--muted)' }}> / {Math.round(daily.temperature_2m_min[idx])}°</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Clothing suggestions */}
            <div>
                <h4 style={{ fontSize: '.9rem', color: 'var(--muted)', marginBottom: 8 }}>What to Wear</h4>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {clothingSuggestions.map((item, idx) => (
                        <span
                            key={idx}
                            className="badge"
                            style={{ fontSize: '.8rem' }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
