import React from 'react';
import { Instagram, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 pt-20 pb-10 px-6 border-t border-stone-900 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-20">

          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <div>
              <h3 className="font-cinzel text-3xl text-stone-200 tracking-[0.2em] mb-2">NOIR</h3>
              <p className="font-body text-[10px] text-stone-600 tracking-[0.4em] uppercase">Cenando en el Vacío</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3 group">
                <MapPin size={16} className="text-stone-700 group-hover:text-amber-900 transition-colors mt-0.5" />
                <p className="font-body text-stone-500 text-sm font-light leading-relaxed max-w-[200px] group-hover:text-stone-300 transition-colors">
                  25 de Mayo 432, 5to Piso,<br />
                  San Miguel de Tucumán
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3 group">
                <Phone size={16} className="text-stone-700 group-hover:text-amber-900 transition-colors mt-0.5" />
                <p className="font-body text-stone-500 text-sm font-light tracking-wide group-hover:text-stone-300 transition-colors">
                  +54 9 381 000-0000
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div className="flex flex-col items-center text-center space-y-8">
            <h4 className="font-body text-stone-400 text-xs tracking-[0.25em] uppercase border-b border-stone-900 pb-2">
              Horarios
            </h4>
            <div className="space-y-3 font-body text-stone-500 text-sm font-light">
              <div className="flex flex-col gap-1 hover:text-stone-300 transition-colors">
                <span className="uppercase text-[10px] tracking-widest text-stone-600">Mar - Jue</span>
                <span>18:00 - 00:00</span>
              </div>
              <div className="flex flex-col gap-1 hover:text-stone-300 transition-colors">
                <span className="uppercase text-[10px] tracking-widest text-stone-600">Vie - Sab</span>
                <span>18:00 - 02:00</span>
              </div>
              <div className="flex flex-col gap-1 hover:text-stone-300 transition-colors">
                <span className="uppercase text-[10px] tracking-widest text-stone-600">Dom</span>
                <span>18:00 - 23:00</span>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-8">
            <h4 className="font-body text-stone-400 text-xs tracking-[0.25em] uppercase">
              Únete al Círculo Exclusivo
            </h4>
            <p className="font-body text-stone-600 text-xs leading-relaxed max-w-[250px]">
              Recibe acceso anticipado a nuestros eventos exclusivos y menús de temporada.
            </p>

            <form className="w-full max-w-[250px] relative group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="CORREO ELECTRÓNICO"
                className="w-full bg-transparent border-b border-stone-800 py-2 pr-10 text-stone-300 text-xs tracking-widest placeholder:text-stone-700 focus:outline-none focus:border-amber-900/50 transition-colors text-right"
              />
              <button
                type="submit"
                className="absolute right-0 top-2 text-stone-600 hover:text-amber-700 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom: Social & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-stone-900/50">
          <div className="flex gap-6">
            <a href="#" className="text-stone-600 hover:text-stone-300 transition-colors" aria-label="Instagram">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-stone-600 hover:text-stone-300 transition-colors" aria-label="Email">
              <Mail size={20} strokeWidth={1.5} />
            </a>
          </div>

          <div className="flex gap-8 text-[10px] text-stone-700 font-body uppercase tracking-widest">
            <a href="#" className="hover:text-stone-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Términos</a>
          </div>

          <div className="text-stone-700 text-[10px] font-body tracking-widest uppercase">
            © 2024 NOIR Dining Group
          </div>
        </div>
      </div>
    </footer>
  );
};