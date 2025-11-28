import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieEmbed, getTvEmbed, getAnimeEmbed } from '../api/vidsrc';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const Player = () => {
    const { type, id, season, episode, animeType } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    let embedUrl = '';
    if (type === 'movie') {
        embedUrl = getMovieEmbed(id!);
    } else if (type === 'tv') {
        embedUrl = getTvEmbed(id!, Number(season), Number(episode));
    } else if (type === 'anime') {
        embedUrl = getAnimeEmbed(id!, Number(episode), animeType as 'sub' | 'dub');
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
        >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-neon-pink text-white transition-colors backdrop-blur-sm border border-white/10"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>

            {/* Player Container */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
                {/* Loading State */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-neon-blue font-display tracking-widest animate-pulse">LOADING STREAM...</p>
                        </div>
                    </div>
                )}

                {/* Retro Frame */}
                <div className="relative w-full h-full md:w-[90%] md:h-[90%] border-4 border-dark-surface shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black overflow-hidden rounded-lg">
                    {/* CRT Scanline Effect Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                    <iframe
                        src={embedUrl}
                        className="w-full h-full border-0 relative z-0"
                        allowFullScreen
                        allow="autoplay; encrypted-media; picture-in-picture"
                        onLoad={() => setLoading(false)}
                    />
                </div>
            </div>
        </motion.div>
    );
};
