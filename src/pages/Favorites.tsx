import React, { useEffect, useState } from 'react';
import type { MediaItem } from '../types';
import { MediaCard } from '../components/ui/MediaCard';
import { Trash2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';

export const Favorites = () => {
    const [favorites, setFavorites] = useState<MediaItem[]>([]);

    useTitle('My List');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(saved);
    }, []);

    const removeFavorite = (e: React.MouseEvent, id: number) => {
        e.preventDefault(); // Prevent navigation if clicking the trash icon
        const newFavs = favorites.filter(f => f.id !== id);
        setFavorites(newFavs);
        localStorage.setItem('favorites', JSON.stringify(newFavs));
    };

    return (
        <div className="min-h-screen pt-24 pb-10 container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-8 font-display border-b border-white/10 pb-4 flex items-center gap-4">
                <Heart className="text-neon-pink" fill="currentColor" />
                My List
            </h1>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p className="text-xl font-display mb-4">No favorites yet</p>
                    <p className="text-sm">Start adding movies and shows to your collection!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <AnimatePresence>
                        {favorites.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group"
                            >
                                <MediaCard item={item} />
                                <button
                                    onClick={(e) => removeFavorite(e, item.id)}
                                    className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:text-red-500 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 z-20"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};
