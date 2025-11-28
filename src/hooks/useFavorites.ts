import { useState, useEffect } from 'react';
import type { MediaItem } from '../types';

const FAVORITES_KEY = 'kasumi_favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<MediaItem[]>([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (item: MediaItem) => {
        setFavorites(prev => {
            if (prev.some(fav => fav.id === item.id && fav.media_type === item.media_type)) {
                return prev;
            }
            return [...prev, item];
        });
    };

    const removeFavorite = (id: number, mediaType: string) => {
        setFavorites(prev => prev.filter(
            item => !(item.id === id && item.media_type === mediaType)
        ));
    };

    const toggleFavorite = (item: MediaItem) => {
        if (isFavorite(item.id, item.media_type)) {
            removeFavorite(item.id, item.media_type);
        } else {
            addFavorite(item);
        }
    };

    const isFavorite = (id: number, mediaType: string) => {
        return favorites.some(item => item.id === id && item.media_type === mediaType);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite
    };
};
