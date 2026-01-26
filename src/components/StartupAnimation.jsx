import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StartupAnimation = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [animationPhase, setAnimationPhase] = useState(0);

    useEffect(() => {
        // Extended phase transitions for 8-second animation
        const phase1Timer = setTimeout(() => setAnimationPhase(1), 800);
        const phase2Timer = setTimeout(() => setAnimationPhase(2), 2500);
        const phase3Timer = setTimeout(() => setAnimationPhase(3), 4500);
        const phase4Timer = setTimeout(() => setAnimationPhase(4), 6500);
        const exitTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onComplete?.(), 800);
        }, 8000);

        return () => {
            clearTimeout(phase1Timer);
            clearTimeout(phase2Timer);
            clearTimeout(phase3Timer);
            clearTimeout(phase4Timer);
            clearTimeout(exitTimer);
        };
    }, [onComplete]);

    // Generate floating particles (like fireflies in Odisha forests)
    const particles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 3,
    }));

    // Iconic Odisha destinations with descriptions
    const destinations = [
        { x: 15, y: 35, delay: 0.3, name: 'Puri', icon: '🏛️' },
        { x: 78, y: 28, delay: 0.6, name: 'Konark', icon: '☀️' },
        { x: 35, y: 65, delay: 0.9, name: 'Chilika', icon: '🦩' },
        { x: 70, y: 60, delay: 1.2, name: 'Simlipal', icon: '🐯' },
        { x: 25, y: 80, delay: 1.5, name: 'Gopalpur', icon: '🏖️' },
        { x: 55, y: 45, delay: 1.8, name: 'Bhubaneswar', icon: '🕉️' },
    ];

    // Floating cultural elements
    const culturalElements = [
        { emoji: '🪷', x: 10, y: 20, delay: 0.5 },  // Lotus (state flower)
        { emoji: '🦚', x: 85, y: 75, delay: 1.0 },  // Peacock
        { emoji: '🐘', x: 90, y: 30, delay: 1.5 },  // Elephant
        { emoji: '🌴', x: 5, y: 70, delay: 2.0 },   // Palm trees
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="startup-animation-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    {/* Layered background - forest/nature theme */}
                    <div className="startup-bg-layer startup-bg-1" />
                    <div className="startup-bg-layer startup-bg-2" />
                    <div className="startup-bg-layer startup-bg-3" />

                    {/* Subtle wave pattern (ocean/Chilika) */}
                    <svg className="startup-waves" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <motion.path
                            d="M0 10 Q 25 5, 50 10 T 100 10 L 100 20 L 0 20 Z"
                            fill="rgba(47, 93, 98, 0.1)"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: animationPhase >= 1 ? 0.5 : 0, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                        <motion.path
                            d="M0 12 Q 25 8, 50 12 T 100 12 L 100 20 L 0 20 Z"
                            fill="rgba(47, 93, 98, 0.08)"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: animationPhase >= 1 ? 0.4 : 0, y: 0 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        />
                    </svg>

                    {/* Floating firefly particles */}
                    <div className="startup-particles">
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="startup-particle"
                                style={{
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                    width: particle.size,
                                    height: particle.size,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 0.8, 0.3, 0.8, 0],
                                    scale: [0, 1.2, 0.8, 1, 0],
                                    y: [0, -20, -40, -60],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    delay: particle.delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    {/* Cultural floating elements */}
                    {culturalElements.map((elem, i) => (
                        <motion.div
                            key={i}
                            className="startup-cultural-element"
                            style={{ left: `${elem.x}%`, top: `${elem.y}%` }}
                            initial={{ opacity: 0, scale: 0, rotate: -20 }}
                            animate={{
                                opacity: animationPhase >= 2 ? [0, 0.6, 0.4, 0.6] : 0,
                                scale: animationPhase >= 2 ? 1 : 0,
                                rotate: 0,
                                y: animationPhase >= 2 ? [0, -15, 0, -10, 0] : 0,
                            }}
                            transition={{
                                opacity: { duration: 4, repeat: Infinity },
                                scale: { duration: 0.6, delay: elem.delay },
                                rotate: { duration: 0.6, delay: elem.delay },
                                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        >
                            {elem.emoji}
                        </motion.div>
                    ))}

                    {/* Destination pins */}
                    <div className="startup-pins-container">
                        {destinations.map((dest, i) => (
                            <motion.div
                                key={i}
                                className="startup-destination"
                                style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
                                initial={{ scale: 0, opacity: 0, y: -30 }}
                                animate={{
                                    scale: animationPhase >= 3 ? 1 : 0,
                                    opacity: animationPhase >= 3 ? 1 : 0,
                                    y: animationPhase >= 3 ? 0 : -30,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 12,
                                    delay: dest.delay,
                                }}
                            >
                                <div className="destination-icon">{dest.icon}</div>
                                <div className="destination-pulse" />
                                <span className="destination-name">{dest.name}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Connection lines between destinations */}
                    <svg className="startup-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path
                            d="M 15 35 Q 45 30, 78 28"
                            fill="none"
                            stroke="url(#connectionGradient)"
                            strokeWidth="0.15"
                            strokeDasharray="1 0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: animationPhase >= 3 ? 1 : 0,
                                opacity: animationPhase >= 3 ? 0.6 : 0,
                            }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                        <motion.path
                            d="M 55 45 Q 45 55, 35 65"
                            fill="none"
                            stroke="url(#connectionGradient)"
                            strokeWidth="0.15"
                            strokeDasharray="1 0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: animationPhase >= 3 ? 1 : 0,
                                opacity: animationPhase >= 3 ? 0.5 : 0,
                            }}
                            transition={{ duration: 1.5, delay: 1 }}
                        />
                        <defs>
                            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(76, 175, 80, 0.3)" />
                                <stop offset="100%" stopColor="rgba(129, 199, 132, 0.6)" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Sun Temple inspired decorative element */}
                    <motion.div
                        className="startup-sun-wheel"
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{
                            opacity: animationPhase >= 2 ? 0.12 : 0,
                            scale: animationPhase >= 2 ? 1 : 0.5,
                            rotate: animationPhase >= 2 ? 0 : -90,
                        }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                    >
                        <svg viewBox="0 0 100 100" className="sun-wheel-svg">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
                            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.3" />
                            {[...Array(12)].map((_, i) => (
                                <line
                                    key={i}
                                    x1="50"
                                    y1="10"
                                    x2="50"
                                    y2="25"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                    transform={`rotate(${i * 30} 50 50)`}
                                />
                            ))}
                            {[...Array(8)].map((_, i) => (
                                <circle
                                    key={i}
                                    cx="50"
                                    cy="15"
                                    r="2"
                                    fill="currentColor"
                                    opacity="0.5"
                                    transform={`rotate(${i * 45} 50 50)`}
                                />
                            ))}
                        </svg>
                    </motion.div>

                    {/* Main content container */}
                    <div className="startup-content">
                        {/* Glowing orb */}
                        <motion.div
                            className="startup-glow-orb"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: animationPhase >= 1 ? [1, 1.3, 1] : 0,
                                opacity: animationPhase >= 1 ? 0.5 : 0,
                            }}
                            transition={{
                                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                                opacity: { duration: 0.8 },
                            }}
                        />

                        {/* Konark wheel icon */}
                        <motion.div
                            className="startup-main-icon"
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{
                                opacity: animationPhase >= 1 ? 1 : 0,
                                scale: animationPhase >= 1 ? 1 : 0,
                                rotate: animationPhase >= 1 ? 0 : -180,
                            }}
                            transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
                        >
                            <svg viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="28" stroke="url(#wheelGradient)" strokeWidth="2" />
                                <circle cx="32" cy="32" r="20" stroke="url(#wheelGradient)" strokeWidth="1.5" />
                                <circle cx="32" cy="32" r="8" fill="url(#wheelGradient)" opacity="0.3" />
                                {[...Array(8)].map((_, i) => (
                                    <g key={i} transform={`rotate(${i * 45} 32 32)`}>
                                        <line x1="32" y1="4" x2="32" y2="12" stroke="url(#wheelGradient)" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="32" cy="6" r="1.5" fill="url(#wheelGradient)" />
                                    </g>
                                ))}
                                {[...Array(8)].map((_, i) => (
                                    <line
                                        key={`spoke-${i}`}
                                        x1="32"
                                        y1="12"
                                        x2="32"
                                        y2="24"
                                        stroke="url(#wheelGradient)"
                                        strokeWidth="1"
                                        transform={`rotate(${i * 45} 32 32)`}
                                    />
                                ))}
                                <defs>
                                    <linearGradient id="wheelGradient" x1="4" y1="4" x2="60" y2="60">
                                        <stop offset="0%" stopColor="#4CAF50" />
                                        <stop offset="50%" stopColor="#81C784" />
                                        <stop offset="100%" stopColor="#C9A227" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>

                        {/* Brand name with letter animation */}
                        <motion.h1
                            className="startup-title"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: animationPhase >= 1 ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {'Bon Voyage'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    className="title-char"
                                    initial={{ opacity: 0, y: 30, rotateX: -90 }}
                                    animate={{
                                        opacity: animationPhase >= 1 ? 1 : 0,
                                        y: animationPhase >= 1 ? 0 : 30,
                                        rotateX: animationPhase >= 1 ? 0 : -90,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.8 + i * 0.08,
                                        ease: 'easeOut'
                                    }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            className="startup-tagline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: animationPhase >= 2 ? 1 : 0,
                                y: animationPhase >= 2 ? 0 : 20,
                            }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Discover the Soul of Odisha
                        </motion.p>

                        {/* Subtitle with typing effect */}
                        <motion.p
                            className="startup-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: animationPhase >= 3 ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {'Temples • Beaches • Wildlife • Culture'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: animationPhase >= 3 ? 1 : 0 }}
                                    transition={{ duration: 0.02, delay: i * 0.03 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.p>

                        {/* Loading progress bar */}
                        <motion.div
                            className="startup-loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: animationPhase >= 2 ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="loader-track">
                                <motion.div
                                    className="loader-fill"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 7.5, ease: 'easeInOut' }}
                                />
                            </div>
                            <motion.div className="loader-text-container">
                                <motion.span
                                    className="loader-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: animationPhase >= 2 ? 1 : 0 }}
                                >
                                    {animationPhase < 3 && 'Discovering destinations...'}
                                    {animationPhase === 3 && 'Preparing your journey...'}
                                    {animationPhase >= 4 && 'Welcome to Odisha!'}
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Decorative corner stamps */}
                    <motion.div
                        className="startup-stamp stamp-odisha"
                        initial={{ opacity: 0, scale: 0, rotate: -20 }}
                        animate={{
                            opacity: animationPhase >= 3 ? 0.4 : 0,
                            scale: animationPhase >= 3 ? 1 : 0,
                            rotate: -12,
                        }}
                        transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
                    >
                        <div className="stamp-inner">
                            <span className="stamp-title">ଓଡ଼ିଶା</span>
                            <span className="stamp-subtitle">ODISHA</span>
                            <span className="stamp-year">EST. 2024</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="startup-stamp stamp-travel"
                        initial={{ opacity: 0, scale: 0, rotate: 15 }}
                        animate={{
                            opacity: animationPhase >= 3 ? 0.35 : 0,
                            scale: animationPhase >= 3 ? 1 : 0,
                            rotate: 8,
                        }}
                        transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
                    >
                        <div className="stamp-inner stamp-circle">
                            <span>✈ BON VOYAGE</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StartupAnimation;
