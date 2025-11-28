import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, User, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const navLinks = [
        { name: 'MOVIES', path: '/movies' },
        { name: 'SERIES', path: '/series' },
        { name: 'ANIME', path: '/anime' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1C1C1C]'
                    : 'bg-gradient-to-b from-black/90 to-transparent'
            )}
        >
            {/* Frequency Lines Background */}
            <div className="absolute inset-0 frequency-lines opacity-50" />

            <div className="relative max-w-[1920px] mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-16">

                    {/* Logo - Radio Dial Style */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                            className="relative w-10 h-10"
                        >
                            <div className="radio-knob">
                                <Radio className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-[#1C8C4E]" />
                            </div>
                        </motion.div>
                        <div className="flex flex-col">
                            <span
                                className="text-xl font-bold tracking-[0.2em] text-[#EDEDED]"
                                style={{ fontFamily: 'Rajdhani, monospace' }}
                            >
                                KASUMI
                            </span>
                            <div className="h-px w-full bg-gradient-to-r from-[#1C8C4E] to-transparent" />
                        </div>
                    </Link>

                    {/* Center Navigation - Frequency Selector Style */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative group"
                            >
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    className={clsx(
                                        'px-6 py-2 text-xs font-medium tracking-[0.15em] transition-all relative',
                                        location.pathname === link.path
                                            ? 'text-[#1C8C4E]'
                                            : 'text-[#EDEDED] hover:text-[#1C8C4E]'
                                    )}
                                    style={{ fontFamily: 'Rajdhani, monospace' }}
                                >
                                    {link.name}

                                    {/* Frequency Indicator */}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="frequency-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-px bg-[#1C8C4E] neon-glow"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}

                                    {/* Tuner Marks */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-px">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={clsx(
                                                    'w-px transition-all',
                                                    location.pathname === link.path ? 'h-1 bg-[#1C8C4E]' : 'h-0.5 bg-[#1C1C1C]'
                                                )}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side - Search & Icons */}
                    <div className="flex items-center gap-4">
                        {/* Search - Radio Tuning Window */}
                        <form onSubmit={handleSearch} className="hidden md:block">
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        width: searchFocused ? 280 : 200,
                                    }}
                                    className="relative radio-frame px-3 py-2"
                                >
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C8C4E]" />
                                    <input
                                        type="text"
                                        placeholder="SEARCH FREQUENCY..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                        className="w-full bg-transparent border-none pl-8 pr-2 text-xs text-[#EDEDED] placeholder-[#1C1C1C] focus:outline-none uppercase tracking-wider"
                                        style={{ fontFamily: 'Rajdhani, monospace' }}
                                    />
                                    {/* Frequency Bar */}
                                    {searchFocused && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            className="absolute bottom-0 left-0 right-0 frequency-bar"
                                        />
                                    )}
                                </motion.div>
                            </div>
                        </form>

                        {/* Favorites - Frequency Spike Animation */}
                        <Link to="/favorites">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-2 radio-frame group"
                            >
                                <Heart className={clsx(
                                    'w-5 h-5 transition-colors',
                                    location.pathname === '/favorites' ? 'text-[#1C8C4E] fill-[#1C8C4E]' : 'text-[#EDEDED]'
                                )} />

                                {/* Frequency Spike on Hover */}
                                <motion.div
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-px"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    {[2, 4, 6, 4, 2].map((height, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-px bg-[#1C8C4E]"
                                            style={{ height: `${height}px` }}
                                            animate={{ height: [`${height}px`, `${height + 2}px`, `${height}px`] }}
                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                        />
                                    ))}
                                </motion.div>
                            </motion.button>
                        </Link>

                        {/* User */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 radio-frame"
                        >
                            <User className="w-5 h-5 text-[#EDEDED]" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Bottom Frequency Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1C8C4E] to-transparent opacity-30" />
        </motion.nav>
    );
};
