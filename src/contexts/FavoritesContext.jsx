import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('bonvoyage_favorites');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('bonvoyage_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (destination) => {
        setFavorites(prev => {
            if (prev.some(f => f.id === destination.id)) return prev;
            return [...prev, destination];
        });
    };

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(f => f.id !== id));
    };

    const isFavorite = (id) => {
        return favorites.some(f => f.id === id);
    };

    const toggleFavorite = (destination) => {
        if (isFavorite(destination.id)) {
            removeFavorite(destination.id);
        } else {
            addFavorite(destination);
        }
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite,
            toggleFavorite,
            clearFavorites,
            count: favorites.length
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}

export default FavoritesContext;
