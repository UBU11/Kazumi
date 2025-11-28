import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails } from '../api/tmdb';
import type { MediaItem } from '../types';
import { Button } from '../components/ui/Button';
import { Play, Plus, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';

export const Details = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<MediaItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState(1);

    useTitle(item?.title || 'Details');

    useEffect(() => {
        const fetchData = async () => {
            if (id && type) {
                const data = await getDetails(Number(id), type as 'movie' | 'tv' | 'anime');
                setItem(data || null);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, type]);

    const handleWatch = () => {
        if (!item) return;
        if (item.media_type === 'movie') {
            navigate(`/watch/movie/${item.id}`);
        } else if (item.media_type === 'tv') {
            navigate(`/watch/tv/${item.id}/1/1`); // Default to S1E1
        } else if (item.media_type === 'anime') {
            navigate(`/watch/anime/${item.id}/1/sub`); // Default to E1 sub
        }
    };

    const addToFavorites = () => {
        if (!item) return;
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.some((fav: MediaItem) => fav.id === item.id)) {
            localStorage.setItem('favorites', JSON.stringify([...favorites, item]));
            alert('Added to favorites!'); // Replace with toast later
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neon-pink"></div></div>;
    if (!item) return <div className="min-h-screen flex items-center justify-center text-white">Item not found</div>;

    return (
        <div className="min-h-screen pt-20 pb-10 relative overflow-hidden">
            {/* Background Backdrop */}
            <div className="absolute inset-0 -z-10">
                <img src={item.backdrop_path || item.poster_path} alt="" className="w-full h-full object-cover opacity-20 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/80 to-dark-black/40" />
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Poster */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0"
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 group">
                            <img src={item.poster_path} alt={item.title} className="w-full h-auto" />
                            <div className="absolute inset-0 bg-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 text-white"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 text-glow">{item.title}</h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-300 mb-8">
                            <span className="flex items-center gap-2"><Star className="text-neon-yellow" size={18} /> {item.vote_average.toFixed(1)}</span>
                            <span className="flex items-center gap-2"><Calendar className="text-neon-blue" size={18} /> {new Date(item.release_date).getFullYear()}</span>
                            <span className="px-3 py-1 border border-white/20 rounded-full uppercase text-xs tracking-wider">{item.media_type}</span>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-300 mb-8 max-w-3xl">{item.overview}</p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            <Button size="lg" onClick={handleWatch} className="gap-2 px-8">
                                <Play size={24} fill="currentColor" />
                                {item.media_type === 'movie' ? 'Watch Movie' : 'Start Watching'}
                            </Button>
                            <Button variant="secondary" size="lg" onClick={addToFavorites} className="gap-2">
                                <Plus size={24} />
                                Add to List
                            </Button>
                        </div>

                        {/* Episodes / Seasons Mock UI for TV/Anime */}
                        {(item.media_type === 'tv' || item.media_type === 'anime') && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold mb-6 font-display border-b border-white/10 pb-2">Episodes</h3>
                                <div className="bg-dark-surface/50 rounded-lg p-6 border border-white/5">
                                    <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                                        {[1, 2, 3].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setSelectedSeason(s)}
                                                className={`px-4 py-2 rounded transition-colors ${selectedSeason === s ? 'bg-neon-blue text-black font-bold' : 'bg-white/5 hover:bg-white/10'}`}
                                            >
                                                Season {s}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        {[1, 2, 3, 4, 5].map(ep => (
                                            <div
                                                key={ep}
                                                className="flex items-center justify-between p-4 rounded hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-neon-pink/30"
                                                onClick={() => navigate(`/watch/${item.media_type}/${item.id}/${selectedSeason}/${ep}${item.media_type === 'anime' ? '/sub' : ''}`)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-gray-500 w-6">{ep}</span>
                                                    <span className="font-medium group-hover:text-neon-pink transition-colors">Episode {ep}</span>
                                                </div>
                                                <Play size={16} className="opacity-0 group-hover:opacity-100 text-neon-pink transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
