import React, { createContext, useContext, type ReactNode } from 'react';
import { useFavorites as useFavoritesHook } from '../hooks/useFavorites';
import type { MediaItem } from '../types';
import { useToast } from './ToastContext';

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
    const { success, info } = useToast();

    const addFavoriteWithToast = (item: MediaItem) => {
        favoritesData.addFavorite(item);
        success(`FREQUENCY SAVED: ${item.title}`);
    };

    const removeFavoriteWithToast = (id: number, mediaType: string) => {
        favoritesData.removeFavorite(id, mediaType);
        info('FREQUENCY CLEARED');
    };

    const toggleFavoriteWithToast = (item: MediaItem) => {
        if (favoritesData.isFavorite(item.id, item.media_type)) {
            removeFavoriteWithToast(item.id, item.media_type);
        } else {
            addFavoriteWithToast(item);
        }
    };

    const value = {
        ...favoritesData,
        addFavorite: addFavoriteWithToast,
        removeFavorite: removeFavoriteWithToast,
        toggleFavorite: toggleFavoriteWithToast,
    };

    return (
        <FavoritesContext.Provider value={value}>
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
