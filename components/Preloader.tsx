import React from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-center cursor-none"
        >
            <div className="relative">
                <motion.h1
                    animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.98, 1.02, 0.98],
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                    className="font-cinzel text-5xl md:text-7xl text-stone-200 tracking-[0.2em] mb-8"
                >
                    NOIR
                </motion.h1>

                {/* Progress Bar Container */}
                <div className="w-48 md:w-64 h-[1px] bg-stone-800 overflow-hidden mx-auto">
                    {/* Progress Bar Fill */}
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                        className="h-full bg-amber-900 shadow-[0_0_10px_rgba(180,83,9,0.5)]"
                    />
                </div>
            </div>
        </motion.div>
    );
};
