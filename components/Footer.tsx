import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 py-12 px-6 border-t border-stone-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-cinzel text-2xl text-stone-200 tracking-widest">NOIR</h3>
        </div>
        
        <div className="flex gap-8 text-stone-500 font-body text-xs tracking-widest uppercase">
          <a href="#" className="hover:text-stone-300 transition-colors">Instagram</a>
          <a href="#" className="hover:text-stone-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-stone-300 transition-colors">Reserve</a>
        </div>

        <div className="text-stone-600 font-body text-xs tracking-widest">
          © 2024 NOIR DINING GROUP
        </div>
      </div>
    </footer>
  );
};