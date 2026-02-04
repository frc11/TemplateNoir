import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { MenuPreview } from './components/MenuPreview';
import { SignatureDish } from './components/SignatureDish';
import { Location } from './components/Location';
import { Reservations } from './components/Reservations';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="bg-stone-950 min-h-screen text-stone-200 selection:bg-amber-900/30 selection:text-amber-100">
      <Navigation />
      
      {/* 
        Architecture for Curtain Effect:
        1. Hero is sticky at the top with lower z-index.
        2. The rest of the content is wrapped in a relative container with higher z-index and solid background.
        This creates the illusion of the content sliding over the fixed Hero.
      */}
      <Hero />
      
      <div className="relative z-10 bg-stone-950 shadow-[0_-50px_100px_rgba(12,10,9,1)]">
        <Intro />
        
        <MenuPreview />

        <SignatureDish />
        
        <Location />
        
        <Reservations />

        <Footer />
      </div>
    </main>
  );
}

export default App;