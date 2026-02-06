import React from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC = () => {
    // Variants for the "N" drawing animation
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 1.5, ease: "easeInOut" },
                opacity: { duration: 0.1 }
            }
        }
    };

    // Variants for the "OIR" flickering appearance
    const textVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: [0, 0.2, 0, 0.5, 0, 1],
            transition: {
                delay: 1.4,
                duration: 0.6,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-none"
        >
            <div className="flex items-center justify-center gap-1 md:gap-2">
                {/* Animated "N" SVG */}
                <div className="w-12 h-16 md:w-20 md:h-24 relative overflow-visible">
                    <motion.svg
                        viewBox="0 0 60 80"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Custom Path for Serif-style "N" */}
                        {/* Vertical Left, Diagonal, Vertical Right, plus subtle serifs included in path logic via ease or just plain lines */}
                        {/* We use a multi-segment path to simulate the pen stroke */}
                        <motion.path
                            d="M 15 70 V 15 L 45 70 V 15"
                            fill="transparent"
                            stroke="#d97706" // amber-600
                            strokeWidth="3"
                            variants={pathVariants}
                            initial="hidden"
                            animate="visible"
                            strokeLinecap="square"
                        />
                        {/* Optional: Add separate serif strokes if we want extra detail, but the clean geometric N looks modern */}
                    </motion.svg>
                </div>

                {/* "OIR" Text with Flicker */}
                <motion.div // Container to ensure alignment
                    className="h-16 md:h-24 flex items-center"
                >
                    <motion.h1
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-cinzel text-5xl md:text-8xl text-stone-200 tracking-[0.2em] relative top-1"
                    >
                        OIR
                    </motion.h1>
                </motion.div>
            </div>

            {/* Subtle "Loading" text that fades out quickly */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-12 font-body text-[10px] tracking-[0.5em] text-stone-600 uppercase"
            >
                Loading Experience
            </motion.p>
        </motion.div>
    );
};
