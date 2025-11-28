import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onClose: (id: string) => void;
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#1C8C4E]" />,
    error: <AlertTriangle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-[#EDEDED]" />
};

const borderColors = {
    success: 'border-[#1C8C4E]',
    error: 'border-red-500',
    info: 'border-[#EDEDED]'
};

export const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 4000);

        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`relative w-80 bg-[#0A0A0A] border-l-4 ${borderColors[type]} shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden mb-3`}
        >
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

            <div className="p-4 flex items-start gap-3 relative z-10">
                <div className="mt-0.5 shrink-0">
                    {icons[type]}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#EDEDED] mb-1" style={{ fontFamily: 'Rajdhani, monospace' }}>
                        {type === 'success' ? 'SIGNAL LOCKED' : type === 'error' ? 'SIGNAL LOST' : 'INCOMING TRANSMISSION'}
                    </h4>
                    <p className="text-xs text-gray-400 font-mono leading-relaxed">
                        {message}
                    </p>
                </div>

                <button
                    onClick={() => onClose(id)}
                    className="shrink-0 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
                className={`h-0.5 ${type === 'success' ? 'bg-[#1C8C4E]' : type === 'error' ? 'bg-red-500' : 'bg-[#EDEDED]'}`}
            />
        </motion.div>
    );
};

export const ToastContainer: React.FC<{ toasts: ToastProps[], removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end pointer-events-none gap-3">
            <div className="pointer-events-auto contents">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <Toast key={toast.id} {...toast} onClose={removeToast} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
