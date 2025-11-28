import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDetails, getTrailer, getDirectorUniverse } from '../api/tmdb';
import type { MediaItem } from '../types';
import { Button } from '../components/ui/Button';
import { useFavorites } from '../context/FavoritesContext';
import { Check, Plus, Play, Star, Calendar, X, Youtube, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';

export const Details = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<MediaItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [directorData, setDirectorData] = useState<{ director: string; movies: MediaItem[] } | null>(null);
    const { toggleFavorite, isFavorite } = useFavorites();

    useTitle(item?.title || 'Details');

    useEffect(() => {
        const fetchData = async () => {
            if (id && type) {
                const data = await getDetails(Number(id), type as 'movie' | 'tv' | 'anime');
                setItem(data || null);
                setLoading(false);

                if (data) {
                    const key = await getTrailer(data.title, data.media_type);
                    setTrailerKey(key);

                    if (data.media_type === 'movie') {
                        const directorInfo = await getDirectorUniverse(data.title);
                        setDirectorData(directorInfo);
                    }
                }
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

    const handleFavorite = () => {
        if (item) {
            toggleFavorite(item);
        }
    };

    const isFav = item ? isFavorite(item.id, item.media_type) : false;

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

                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => setShowTrailer(true)}
                                className="gap-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                            >
                                <Youtube size={24} />
                                Trailer
                            </Button>

                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={handleFavorite}
                                className={`gap-2 transition-colors ${isFav ? 'bg-[#1C8C4E]/20 border-[#1C8C4E] text-[#1C8C4E]' : ''}`}
                            >
                                {isFav ? <Check size={24} /> : <Plus size={24} />}
                                {isFav ? 'In Favorites' : 'Add to List'}
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

                        {/* Director Universe Trails */}
                        {directorData && directorData.movies.length > 0 && (
                            <div className="mt-16">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-neon-blue/10 rounded-full border border-neon-blue/30">
                                        <Film className="text-neon-blue" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold font-display tracking-wide text-white">DIRECTOR UNIVERSE</h3>
                                        <p className="text-sm text-neon-blue font-mono uppercase tracking-widest">TRAILS OF {directorData.director}</p>
                                    </div>
                                </div>

                                <div className="relative pl-8 border-l-2 border-white/10 space-y-8">
                                    {directorData.movies.map((movie, index) => (
                                        <motion.div
                                            key={movie.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative"
                                        >
                                            {/* Timeline Node */}
                                            <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0A0A0A] border-2 border-neon-blue flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse" />
                                            </div>

                                            {/* Holographic Card */}
                                            <Link to={`/movie/${movie.id}`} className="block group">
                                                <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-neon-blue/50 transition-colors p-4 flex gap-4 items-center backdrop-blur-sm">
                                                    {/* Hologram Effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                                                    <img
                                                        src={movie.poster_path}
                                                        alt={movie.title}
                                                        className="w-16 h-24 object-cover rounded shadow-lg opacity-80 group-hover:opacity-100 transition-opacity"
                                                    />

                                                    <div>
                                                        <h4 className="font-bold text-lg text-white group-hover:text-neon-blue transition-colors font-display">{movie.title}</h4>
                                                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                                            <span className="font-mono text-neon-blue">{new Date(movie.release_date).getFullYear()}</span>
                                                            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {movie.vote_average.toFixed(1)}</span>
                                                        </div>
                                                    </div>

                                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                                        <Play className="text-neon-blue" size={24} />
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Trailer Modal */}
            <AnimatePresence>
                {showTrailer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setShowTrailer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowTrailer(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <iframe
                                width="100%"
                                height="100%"
                                src={trailerKey
                                    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1`
                                    : `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(item.title + ' trailer')}&autoplay=1`
                                }
                                title="Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
