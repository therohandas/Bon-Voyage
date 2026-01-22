import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAssistant } from '../services/aiService';
import { useFavorites } from '../contexts/FavoritesContext';

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "I'm Sid, your boots-on-the-ground guide to Odisha. From secret Ganjam beaches to the best local eats, I've got you covered. What’s the plan?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const chatWindowRef = useRef(null);
    const { favorites } = useFavorites();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await chatWithAssistant(userMessage, {
                destinations: favorites,
                currentPage: window.location.pathname,
                previousMessages: messages.map(m => ({ role: m.role, content: m.content }))
            });

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again in a moment! 🙏"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickQuestions = [
        "Best time to visit Puri?",
        "Budget for 5-day trip?",
        "Must-try Odia food?",
    ];

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const chatWindowVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotateX: -10
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: 30,
            scale: 0.95,
            transition: { duration: 0.2 }
        }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 400, damping: 25 }
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: {
            scale: 1.1,
            boxShadow: "0 8px 30px rgba(102, 126, 234, 0.6)"
        },
        tap: { scale: 0.9 },
        pulse: {
            scale: [1, 1.05, 1],
            boxShadow: [
                "0 4px 20px rgba(102, 126, 234, 0.4)",
                "0 8px 30px rgba(102, 126, 234, 0.6)",
                "0 4px 20px rgba(102, 126, 234, 0.4)"
            ],
            transition: { duration: 2, repeat: Infinity }
        }
    };

    return (
        <>
            {/* Floating Chat Button with Premium Design */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="ai-assistant-btn no-print"
                style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: 0,
                    overflow: 'visible'
                }}
                variants={buttonVariants}
                initial="idle"
                animate={isOpen ? "idle" : "pulse"}
                whileHover="hover"
                whileTap="tap"
            >
                {/* Outer Glow Ring */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea)',
                        backgroundSize: '300% 300%',
                        zIndex: -1
                    }}
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        rotate: [0, 360]
                    }}
                    transition={{
                        backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' },
                        rotate: { duration: 10, repeat: Infinity, ease: 'linear' }
                    }}
                />

                {/* Inner Background */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 3,
                        borderRadius: '50%',
                        background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                        zIndex: 0
                    }}
                />

                {/* Sparkle Effects */}
                {!isOpen && (
                    <>
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#fff',
                                top: 8,
                                right: 12,
                                zIndex: 2
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.2, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                background: '#f093fb',
                                bottom: 10,
                                left: 10,
                                zIndex: 2
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.5, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                background: '#667eea',
                                top: 14,
                                left: 8,
                                zIndex: 2
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.3, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                    </>
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            style={{ zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="icon"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            style={{
                                zIndex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}
                        >
                            {/* AI Bot Icon - Custom Design */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                {/* Bot Head */}
                                <motion.rect
                                    x="7" y="8" width="18" height="16" rx="4"
                                    fill="url(#botGradient)"
                                    stroke="white"
                                    strokeWidth="1.5"
                                />

                                {/* Antenna */}
                                <motion.path
                                    d="M16 8V4"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <motion.circle
                                    cx="16" cy="3" r="2"
                                    fill="#f093fb"
                                    animate={{
                                        fill: ['#f093fb', '#667eea', '#f093fb'],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Eyes */}
                                <motion.circle
                                    cx="12" cy="14" r="2.5"
                                    fill="white"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <motion.circle
                                    cx="20" cy="14" r="2.5"
                                    fill="white"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                                />

                                {/* Pupils */}
                                <motion.circle
                                    cx="12" cy="14" r="1"
                                    fill="#1a1a2e"
                                    animate={{ cx: [11.5, 12.5, 11.5] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <motion.circle
                                    cx="20" cy="14" r="1"
                                    fill="#1a1a2e"
                                    animate={{ cx: [19.5, 20.5, 19.5] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />

                                {/* Smile */}
                                <motion.path
                                    d="M12 19C12 19 14 21 16 21C18 21 20 19 20 19"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    fill="none"
                                />

                                {/* Ear pieces */}
                                <motion.rect
                                    x="4" y="12" width="3" height="6" rx="1.5"
                                    fill="url(#botGradient)"
                                    stroke="white"
                                    strokeWidth="1"
                                />
                                <motion.rect
                                    x="25" y="12" width="3" height="6" rx="1.5"
                                    fill="url(#botGradient)"
                                    stroke="white"
                                    strokeWidth="1"
                                />

                                {/* Gradient Definition */}
                                <defs>
                                    <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#667eea" />
                                        <stop offset="50%" stopColor="#764ba2" />
                                        <stop offset="100%" stopColor="#f093fb" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* AI Notification Badge */}
                {!isOpen && (
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: -2,
                            right: -2,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                            border: '2px solid #1a1a2e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 3
                        }}
                        animate={{
                            scale: [1, 1.15, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span style={{ fontSize: '9px', color: 'white', fontWeight: 'bold' }}>AI</span>
                    </motion.div>
                )}
            </motion.button>

            {/* Chat Window with Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop - Click to Close */}
                        <motion.div
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 998
                            }}
                        />

                        {/* Chat Window */}
                        <motion.div
                            ref={chatWindowRef}
                            variants={chatWindowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{
                                position: 'fixed',
                                bottom: 100,
                                right: 24,
                                width: 400,
                                maxWidth: 'calc(100vw - 48px)',
                                height: 560,
                                maxHeight: 'calc(100vh - 140px)',
                                background: 'linear-gradient(180deg, rgba(26, 34, 26, 0.98) 0%, rgba(15, 20, 16, 0.99) 100%)',
                                borderRadius: 24,
                                border: '1px solid rgba(255,255,255,0.15)',
                                boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(102, 126, 234, 0.15)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                zIndex: 999
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <motion.div
                                style={{
                                    padding: '20px 24px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 14,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Animated background particles */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                                    opacity: 0.5
                                }} />

                                <motion.div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(10px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid rgba(255,255,255,0.3)'
                                    }}
                                    animate={{
                                        boxShadow: [
                                            "0 0 0 0 rgba(255,255,255,0.3)",
                                            "0 0 0 8px rgba(255,255,255,0)",
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span style={{ fontSize: '1.6rem' }}>😏</span>
                                </motion.div>
                                <div style={{ zIndex: 1 }}>
                                    <div style={{ fontWeight: 700, color: 'white', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                                        Sid
                                    </div>
                                    <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <motion.span
                                            animate={{ opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: '#4ade80',
                                                display: 'inline-block'
                                            }}
                                        />
                                        Online • Your Odisha Guide
                                    </div>
                                </div>

                                {/* Close button in header */}
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        marginLeft: 'auto',
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.15)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                    whileHover={{ background: 'rgba(255,255,255,0.25)', scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </motion.button>
                            </motion.div>

                            {/* Messages */}
                            <div style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 14,
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)'
                            }}>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={messageVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: idx * 0.05 }}
                                        style={{
                                            maxWidth: '85%',
                                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                            padding: '14px 18px',
                                            background: msg.role === 'user'
                                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                : 'rgba(255,255,255,0.08)',
                                            border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: msg.role === 'user' ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
                                            color: msg.role === 'user' ? 'white' : 'var(--txt-1)',
                                            fontSize: '.9rem',
                                            lineHeight: 1.6,
                                            whiteSpace: 'pre-wrap',
                                            boxShadow: msg.role === 'user'
                                                ? '0 4px 15px rgba(102, 126, 234, 0.3)'
                                                : '0 2px 10px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        {msg.content}
                                    </motion.div>
                                ))}

                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            padding: '14px 18px',
                                            background: 'rgba(255,255,255,0.08)',
                                            borderRadius: 20,
                                            alignSelf: 'flex-start',
                                            display: 'flex',
                                            gap: 8
                                        }}
                                    >
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                animate={{
                                                    y: [0, -8, 0],
                                                    opacity: [0.5, 1, 0.5]
                                                }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: i * 0.15
                                                }}
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #667eea, #764ba2)'
                                                }}
                                            />
                                        ))}
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Questions */}
                            <AnimatePresence>
                                {messages.length <= 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{
                                            padding: '0 20px 14px',
                                            display: 'flex',
                                            gap: 8,
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        {quickQuestions.map((q, idx) => (
                                            <motion.button
                                                key={idx}
                                                onClick={() => {
                                                    setInput(q);
                                                    setTimeout(() => handleSend(), 100);
                                                }}
                                                style={{
                                                    padding: '8px 14px',
                                                    background: 'rgba(102, 126, 234, 0.12)',
                                                    border: '1px solid rgba(102, 126, 234, 0.35)',
                                                    borderRadius: 25,
                                                    color: '#a5b4fc',
                                                    fontSize: '.78rem',
                                                    cursor: 'pointer',
                                                    fontWeight: 500
                                                }}
                                                whileHover={{
                                                    background: 'rgba(102, 126, 234, 0.25)',
                                                    scale: 1.05,
                                                    borderColor: 'rgba(102, 126, 234, 0.6)'
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                {q}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Input */}
                            <div style={{
                                padding: 20,
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                gap: 10,
                                background: 'rgba(0,0,0,0.2)'
                            }}>
                                <motion.input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything about Odisha..."
                                    style={{
                                        flex: 1,
                                        padding: '14px 20px',
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: 28,
                                        color: 'var(--txt-1)',
                                        fontSize: '.9rem',
                                        outline: 'none'
                                    }}
                                    disabled={isLoading}
                                    whileFocus={{
                                        borderColor: 'rgba(102, 126, 234, 0.5)',
                                        boxShadow: '0 0 20px rgba(102, 126, 234, 0.15)'
                                    }}
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        background: input.trim()
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        cursor: input.trim() ? 'pointer' : 'default',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                    whileHover={input.trim() ? {
                                        scale: 1.1,
                                        boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
                                    } : {}}
                                    whileTap={input.trim() ? { scale: 0.9 } : {}}
                                >
                                    <motion.svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        animate={input.trim() ? { x: [0, 2, 0] } : {}}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </motion.svg>
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )
                }
            </AnimatePresence >
        </>
    );
}
