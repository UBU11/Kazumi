import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setMobileMenuOpen(false);
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
                isScrolled || mobileMenuOpen
                    ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1C1C1C]'
                    : 'bg-gradient-to-b from-black/90 to-transparent'
            )}
        >
            {/* Frequency Lines Background */}
            <div className="absolute inset-0 frequency-lines opacity-50 pointer-events-none" />

            <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-16">

                    {/* Logo - Boombox Style */}
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 group z-50">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="relative w-10 h-10 sm:w-14 sm:h-14"
                        >
                            <img
                                src="/logo.png"
                                alt="KASUMI Boombox"
                                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(28,140,78,0.3)]"
                            />
                        </motion.div>
                        <div className="flex flex-col">
                            <span
                                className="text-lg sm:text-xl font-bold tracking-[0.2em] text-[#EDEDED]"
                                style={{ fontFamily: 'Rajdhani, monospace' }}
                            >
                                KASUMI
                            </span>
                            <div className="h-px w-full bg-gradient-to-r from-[#1C8C4E] to-transparent" />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
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
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="frequency-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-px bg-[#1C8C4E] neon-glow"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side - Search & Icons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <motion.div
                                    animate={{ width: searchFocused ? 280 : 200 }}
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
                                </motion.div>
                            </div>
                        </form>

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
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex lg:hidden items-center gap-4 z-50">
                        <Link to="/favorites" className="p-2">
                            <Heart className={clsx(
                                'w-6 h-6 transition-colors',
                                location.pathname === '/favorites' ? 'text-[#1C8C4E] fill-[#1C8C4E]' : 'text-[#EDEDED]'
                            )} />
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-[#EDEDED] p-2"
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 top-16 bg-[#0A0A0A] z-40 lg:hidden overflow-y-auto border-t border-[#1C1C1C]"
                    >
                        <div className="p-6 flex flex-col gap-8">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="w-full">
                                <div className="relative radio-frame px-4 py-3 bg-white/5">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1C8C4E]" />
                                    <input
                                        type="text"
                                        placeholder="SEARCH FREQUENCY..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent border-none pl-10 text-sm text-[#EDEDED] placeholder-[#1C1C1C] focus:outline-none uppercase tracking-wider font-mono"
                                    />
                                </div>
                            </form>

                            {/* Mobile Nav Links */}
                            <nav className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={clsx(
                                            'text-2xl font-bold tracking-widest py-4 border-b border-white/5',
                                            location.pathname === link.path ? 'text-[#1C8C4E]' : 'text-[#EDEDED]'
                                        )}
                                        style={{ fontFamily: 'Rajdhani, monospace' }}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Frequency Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1C8C4E] to-transparent opacity-30" />
        </motion.nav>
    );
};
