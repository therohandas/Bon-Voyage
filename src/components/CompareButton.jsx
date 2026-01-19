import React from 'react';
import { motion } from 'framer-motion';
import { useCompare } from '../contexts/CompareContext';

export default function CompareButton({ destination, size = 'medium', showLabel = false }) {
    const { isInCompare, toggleCompare, isFull } = useCompare();
    const isActive = isInCompare(destination.id);

    const sizes = {
        small: { icon: 14, padding: '6px' },
        medium: { icon: 18, padding: '8px' },
        large: { icon: 22, padding: '10px' }
    };

    const { icon, padding } = sizes[size] || sizes.medium;

    const disabled = isFull && !isActive;

    return (
        <motion.button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(destination);
            }}
            className="compare-btn"
            disabled={disabled}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: showLabel ? `${padding} 12px` : padding,
                background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: 8,
                cursor: disabled ? 'not-allowed' : 'pointer',
                color: isActive ? '#3b82f6' : 'var(--txt-2)',
                opacity: disabled ? 0.5 : 1,
                transition: 'all 0.2s ease'
            }}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            title={isActive ? 'Remove from comparison' : disabled ? 'Compare list full (max 3)' : 'Add to compare'}
        >
            <svg
                width={icon}
                height={icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="3" y="3" width="7" height="7" rx="1" fill={isActive ? 'currentColor' : 'none'} />
                <rect x="14" y="3" width="7" height="7" rx="1" fill={isActive ? 'currentColor' : 'none'} />
                <rect x="3" y="14" width="7" height="7" rx="1" fill={isActive ? 'currentColor' : 'none'} />
                <path d="M17.5 14v7M14 17.5h7" strokeLinecap="round" />
            </svg>
            {showLabel && (
                <span style={{ fontSize: '.85rem', fontWeight: 500 }}>
                    {isActive ? 'In Compare' : 'Compare'}
                </span>
            )}
        </motion.button>
    );
}
