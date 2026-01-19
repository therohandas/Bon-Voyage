import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import reviewsData from '../data/reviewsData.json';

function StarRating({ rating, size = 16, interactive = false, onChange }) {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill={(hoverRating || rating) >= star ? '#fbbf24' : 'none'}
                    stroke="#fbbf24"
                    strokeWidth="2"
                    style={{ cursor: interactive ? 'pointer' : 'default' }}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    onClick={() => interactive && onChange && onChange(star)}
                >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
            ))}
        </div>
    );
}

function ReviewCard({ review }) {
    const [helpful, setHelpful] = useState(review.helpful || 0);
    const [hasVoted, setHasVoted] = useState(false);

    const handleHelpful = () => {
        if (!hasVoted) {
            setHelpful(prev => prev + 1);
            setHasVoted(true);
        }
    };

    return (
        <motion.div
            className="card"
            style={{ padding: 20, marginBottom: 16 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <img
                    src={review.avatar}
                    alt={review.userName}
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{review.userName}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <StarRating rating={review.rating} size={14} />
                        <span style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
                            {new Date(review.dateVisited).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {review.title && (
                <h4 style={{ marginBottom: 8, fontSize: '1rem' }}>{review.title}</h4>
            )}

            <p style={{ color: 'var(--txt-2)', lineHeight: 1.6, marginBottom: 12 }}>
                {review.text}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                    onClick={handleHelpful}
                    disabled={hasVoted}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        background: hasVoted ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 6,
                        cursor: hasVoted ? 'default' : 'pointer',
                        color: hasVoted ? '#4ade80' : 'var(--txt-2)',
                        fontSize: '.85rem'
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={hasVoted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    Helpful ({helpful})
                </button>
            </div>
        </motion.div>
    );
}

function ReviewForm({ locationSlug, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userName, setUserName] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !text.trim() || !userName.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        const newReview = {
            id: Date.now(),
            userName: userName.trim(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`,
            rating,
            title: title.trim(),
            text: text.trim(),
            dateVisited: new Date().toISOString().split('T')[0],
            helpful: 0
        };

        onSubmit(newReview);
        setRating(0);
        setTitle('');
        setText('');
        setUserName('');
        setIsOpen(false);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                </svg>
                Write a Review
            </button>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="card"
            style={{ padding: 24, marginBottom: 24 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 style={{ marginBottom: 16 }}>Write a Review</h4>

            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                    Your Rating *
                </label>
                <StarRating rating={rating} size={24} interactive onChange={setRating} />
            </div>

            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                    Your Name *
                </label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="search-input"
                    style={{ width: '100%' }}
                    required
                />
            </div>

            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                    Review Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summarize your experience"
                    className="search-input"
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                    Your Review *
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Share your experience with other travelers..."
                    rows={4}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        color: 'var(--txt-1)',
                        fontSize: '.95rem',
                        resize: 'vertical'
                    }}
                    required
                />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary">
                    Submit Review
                </button>
                <button
                    type="button"
                    className="btn"
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </button>
            </div>
        </motion.form>
    );
}

export default function ReviewsSection({ locationSlug }) {
    const [reviews, setReviews] = useState([]);
    const [sortBy, setSortBy] = useState('helpful');

    useEffect(() => {
        // Load reviews from JSON and localStorage
        const storedReviews = reviewsData[locationSlug]?.reviews || [];

        // Check localStorage for user-submitted reviews
        const userReviewsKey = `bonvoyage_reviews_${locationSlug}`;
        const userReviews = JSON.parse(localStorage.getItem(userReviewsKey) || '[]');

        setReviews([...userReviews, ...storedReviews]);
    }, [locationSlug]);

    const handleNewReview = (review) => {
        const userReviewsKey = `bonvoyage_reviews_${locationSlug}`;
        const userReviews = JSON.parse(localStorage.getItem(userReviewsKey) || '[]');
        userReviews.unshift(review);
        localStorage.setItem(userReviewsKey, JSON.stringify(userReviews));

        setReviews(prev => [review, ...prev]);
    };

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === 'helpful') return (b.helpful || 0) - (a.helpful || 0);
        if (sortBy === 'recent') return new Date(b.dateVisited) - new Date(a.dateVisited);
        if (sortBy === 'highest') return b.rating - a.rating;
        return 0;
    });

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return (
        <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Reviews ({reviews.length})
                </h3>

                {reviews.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <StarRating rating={Math.round(avgRating)} size={14} />
                        <span style={{ fontWeight: 600 }}>{avgRating}</span>
                    </div>
                )}
            </div>

            <ReviewForm locationSlug={locationSlug} onSubmit={handleNewReview} />

            {reviews.length > 1 && (
                <div style={{ marginBottom: 16 }}>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="btn"
                        style={{ padding: '8px 12px', fontSize: '.85rem' }}
                    >
                        <option value="helpful">Most Helpful</option>
                        <option value="recent">Most Recent</option>
                        <option value="highest">Highest Rated</option>
                    </select>
                </div>
            )}

            {sortedReviews.length === 0 ? (
                <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 20 }}>
                    No reviews yet. Be the first to share your experience!
                </p>
            ) : (
                sortedReviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))
            )}
        </div>
    );
}
