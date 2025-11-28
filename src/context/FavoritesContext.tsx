import React, { createContext, useContext, type ReactNode } from 'react';
import { useFavorites as useFavoritesHook } from '../hooks/useFavorites';
import type { MediaItem } from '../types';

interface FavoritesContextType {
    favorites: MediaItem[];
    addFavorite: (item: MediaItem) => void;
    removeFavorite: (id: number, mediaType: string) => void;
    toggleFavorite: (item: MediaItem) => void;
    isFavorite: (id: number, mediaType: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const favoritesData = useFavoritesHook();

    return (
        <FavoritesContext.Provider value={favoritesData}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
};
