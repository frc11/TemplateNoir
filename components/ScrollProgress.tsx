import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();

    // Smooth out the progress value
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 right-0 h-full w-[1px] bg-stone-900 z-[90]">
            <motion.div
                className="absolute top-0 right-0 w-full bg-amber-900 origin-top w-[2px]" // Made slightly wider (2px) for visibility while keeping container 1px
                style={{ scaleY, height: '100%' }}
            />
        </div>
    );
};
