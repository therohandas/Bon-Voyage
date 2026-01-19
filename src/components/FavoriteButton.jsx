import React from 'react';
import { motion } from 'framer-motion';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoriteButton({ destination, size = 'medium', showLabel = false }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isActive = isFavorite(destination.id);

    const sizes = {
        small: { icon: 16, padding: '6px' },
        medium: { icon: 20, padding: '8px' },
        large: { icon: 24, padding: '10px' }
    };

    const { icon, padding } = sizes[size] || sizes.medium;

    return (
        <motion.button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(destination);
            }}
            className="favorite-btn"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: showLabel ? `${padding} 12px` : padding,
                background: isActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${isActive ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: 8,
                cursor: 'pointer',
                color: isActive ? '#ef4444' : 'var(--txt-2)',
                transition: 'all 0.2s ease'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isActive ? 'Remove from favorites' : 'Add to favorites'}
        >
            <svg
                width={icon}
                height={icon}
                viewBox="0 0 24 24"
                fill={isActive ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {showLabel && (
                <span style={{ fontSize: '.85rem', fontWeight: 500 }}>
                    {isActive ? 'Saved' : 'Save'}
                </span>
            )}
        </motion.button>
    );
}
