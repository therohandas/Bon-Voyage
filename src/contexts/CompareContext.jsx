import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

const MAX_COMPARE_ITEMS = 3;

export function CompareProvider({ children }) {
    const [compareList, setCompareList] = useState([]);

    const addToCompare = (destination) => {
        setCompareList(prev => {
            if (prev.length >= MAX_COMPARE_ITEMS) {
                alert(`You can only compare up to ${MAX_COMPARE_ITEMS} destinations at a time.`);
                return prev;
            }
            if (prev.some(d => d.id === destination.id)) return prev;
            return [...prev, destination];
        });
    };

    const removeFromCompare = (id) => {
        setCompareList(prev => prev.filter(d => d.id !== id));
    };

    const isInCompare = (id) => {
        return compareList.some(d => d.id === id);
    };

    const toggleCompare = (destination) => {
        if (isInCompare(destination.id)) {
            removeFromCompare(destination.id);
        } else {
            addToCompare(destination);
        }
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    return (
        <CompareContext.Provider value={{
            compareList,
            addToCompare,
            removeFromCompare,
            isInCompare,
            toggleCompare,
            clearCompare,
            count: compareList.length,
            maxItems: MAX_COMPARE_ITEMS,
            isFull: compareList.length >= MAX_COMPARE_ITEMS
        }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}

export default CompareContext;
