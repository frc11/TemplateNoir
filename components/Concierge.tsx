import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import { getConciergeResponse } from '../services/geminiService';
import { ConciergeMessage } from '../types';

export const Concierge: React.FC = () => {
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    { id: '1', role: 'assistant', text: 'Welcome to NOIR. How may I assist in curating your evening?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ConciergeMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await getConciergeResponse(input);
    
    const botMsg: ConciergeMessage = { id: (Date.now() + 1).toString(), role: 'assistant', text: responseText };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <section id="concierge" className="py-24 px-6 md:px-12 bg-stone-900/50 border-t border-stone-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 mb-4 text-amber-600/80">
            <Sparkles size={16} />
            <span className="font-body uppercase tracking-[0.2em] text-xs">AI Concierge</span>
          </div>
          <h2 className="font-display text-4xl text-stone-200 mb-6">
            Curated <br /> Intelligence
          </h2>
          <p className="font-body text-stone-400 text-sm leading-relaxed">
            Unsure of the perfect pairing? Allow NOIR's digital sommelier to guide your selection based on your palate and preferences.
          </p>
        </div>

        <div className="w-full md:w-2/3 bg-stone-950 border border-stone-800 p-6 md:p-8 min-h-[400px] flex flex-col justify-between relative shadow-2xl">
           <div className="flex-1 overflow-y-auto max-h-[300px] mb-6 space-y-4 pr-2 custom-scrollbar scrollbar-hide">
             <AnimatePresence>
               {messages.map((msg) => (
                 <motion.div
                   key={msg.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                   className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                   <div className={`max-w-[80%] p-4 text-sm font-body leading-relaxed ${
                     msg.role === 'user' 
                       ? 'bg-stone-800 text-stone-200 border border-stone-700' 
                       : 'bg-transparent text-stone-300 border border-stone-800/50 italic'
                   }`}>
                     {msg.text}
                   </div>
                 </motion.div>
               ))}
               {loading && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 p-4">
                   <span className="w-1 h-1 bg-amber-700 rounded-full animate-bounce" />
                   <span className="w-1 h-1 bg-amber-700 rounded-full animate-bounce delay-100" />
                   <span className="w-1 h-1 bg-amber-700 rounded-full animate-bounce delay-200" />
                 </motion.div>
               )}
             </AnimatePresence>
           </div>

           <div className="relative">
             <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Ask for a wine pairing..."
               className="w-full bg-stone-900/50 border-b border-stone-700 py-3 pl-2 pr-10 text-stone-200 focus:outline-none focus:border-amber-700/50 transition-colors font-body text-sm placeholder:text-stone-700"
             />
             <button 
               onClick={handleSend}
               disabled={loading}
               className="absolute right-0 bottom-3 text-stone-500 hover:text-amber-600 transition-colors disabled:opacity-50"
             >
               <Send size={16} />
             </button>
           </div>
        </div>
      </div>
    </section>
  );
};