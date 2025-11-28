import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { searchMulti } from '../api/tmdb';
import { MediaCard } from '../components/ui/MediaCard';
import type { MediaItem } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { useTitle } from '../hooks/useTitle';

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [results, setResults] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 300);

    useTitle(query ? `Search: ${query} - KASUMI` : 'Search - KASUMI');

    useEffect(() => {
        const performSearch = async () => {
            if (!debouncedQuery.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const searchResults = await searchMulti(debouncedQuery);
                setResults(searchResults);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [debouncedQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setSearchParams({ q: query });
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12">

                {/* Search Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[#EDEDED] mb-8 uppercase tracking-[0.2em]"
                        style={{ fontFamily: 'Rajdhani, monospace' }}
                    >
                        SEARCH FREQUENCY
                    </h1>

                    {/* Search Bar - Radio Tuning Style */}
                    <form onSubmit={handleSearch} className="max-w-3xl">
                        <div className="relative radio-frame p-4 bg-[#0A0A0A]">
                            <div className="flex items-center gap-4">
                                <SearchIcon className="w-6 h-6 text-[#1C8C4E]" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="TUNE IN TO YOUR CONTENT..."
                                    className="flex-1 bg-transparent border-none text-[#EDEDED] text-xl placeholder-[#1C1C1C] focus:outline-none uppercase tracking-wider"
                                    style={{ fontFamily: 'Rajdhani, monospace' }}
                                    autoFocus
                                />
                            </div>

                            {/* Frequency Bar */}
                            <div className="mt-4 h-px bg-[#1C1C1C] relative">
                                {query && (
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-[#1C8C4E] neon-glow"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((query.length / 20) * 100, 100)}%` }}
                                    />
                                )}
                            </div>

                            {/* Tuner Marks */}
                            <div className="flex justify-between mt-2">
                                {[...Array(11)].map((_, i) => (
                                    <div key={i} className="w-px h-2 bg-[#1C1C1C]" />
                                ))}
                            </div>
                        </div>
                    </form>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="flex items-end gap-1 h-20 mb-6">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-[#1C8C4E]"
                                    animate={{
                                        height: ['20%', '100%', '20%'],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                    }}
                                />
                            ))}
                        </div>
                        <p className="text-[#1C8C4E] text-sm uppercase tracking-[0.3em] font-mono">
                            SCANNING FREQUENCIES...
                        </p>
                    </div>
                )}

                {/* Results */}
                {!loading && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <h2
                                className="text-2xl font-bold text-[#EDEDED] uppercase tracking-[0.2em]"
                                style={{ fontFamily: 'Rajdhani, monospace' }}
                            >
                                RESULTS ({results.length})
                            </h2>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#1C8C4E] to-transparent" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {results.map((item, index) => (
                                <motion.div
                                    key={`${item.id}-${item.media_type}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <MediaCard item={item} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* No Results */}
                {!loading && debouncedQuery && results.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="radio-frame p-12 inline-block bg-[#0A0A0A]">
                            <p className="text-[#1C8C4E] text-2xl font-bold uppercase mb-4" style={{ fontFamily: 'Rajdhani, monospace' }}>
                                NO SIGNAL DETECTED
                            </p>
                            <p className="text-[#EDEDED] text-sm uppercase tracking-wider">
                                Try adjusting your frequency
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !debouncedQuery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="radio-frame p-12 inline-block bg-[#0A0A0A]">
                            <p className="text-[#EDEDED] text-xl uppercase tracking-wider" style={{ fontFamily: 'Rajdhani, monospace' }}>
                                START TUNING TO FIND CONTENT
                            </p>

                            {/* Frequency Bars */}
                            <div className="flex items-end justify-center gap-1 h-16 mt-8">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 bg-[#1C8C4E]/30"
                                        style={{ height: `${(i + 1) * 12.5}%` }}
                                        animate={{
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.1
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
