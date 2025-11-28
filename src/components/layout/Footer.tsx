import { Github, Twitter } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-dark-black border-t border-white/5 py-12 mt-20 relative overflow-hidden">
            {/* Synthwave Grid Background Effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)'
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-display font-bold text-white mb-2">KASUMI<span className="text-[#1C8C4E]"></span></h3>
                        <p className="text-gray-500 text-sm">© 2025 KASUMI. All rights reserved.</p>
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors"><Twitter size={20} /></a>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-600">
                    <p>This project is for educational purposes only. We do not host any content.</p>
                </div>
            </div>
        </footer>
    );
};
