import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { MenuPreview } from './components/MenuPreview';
import { SignatureDish } from './components/SignatureDish';
import { Location } from './components/Location';
import { Reservations } from './components/Reservations';
import { FAQ } from './components/FAQ';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';

import { ScrollProgress } from './components/ScrollProgress';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for cinematic feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-stone-950 min-h-screen text-stone-200 selection:bg-amber-900/30 selection:text-amber-100">
      <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-[110] px-4 py-2 bg-stone-200 text-stone-900 font-bold text-xs uppercase tracking-widest rounded-sm outline-none transition-opacity">
        Skip to content
      </a>

      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <Navigation />

      {/* 
        Architecture for Curtain Effect:
        1. Hero is sticky at the top with lower z-index.
        2. The rest of the content is wrapped in a relative container with higher z-index and solid background.
        3. This creates the illusion of the content sliding over the fixed Hero.
      */}
      <div id="main-content">
        <Hero />
      </div>

      <div className="relative z-10 bg-stone-950 shadow-[0_-50px_100px_rgba(12,10,9,1)]">
        <Intro />

        <MenuPreview />

        <SignatureDish />

        <Location />

        <Reservations />

        <FAQ />

        <SocialSection />

        <Footer />
      </div>
    </main>
  );
}

export default App;