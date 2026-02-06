import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, ChevronLeft, Heart, Grid, Search, Clapperboard, User, BadgeCheck } from 'lucide-react';

const INSTAGRAM_POSTS = [
    { id: 1, url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop", likes: "1.2K" },
    { id: 2, url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop", likes: "856" },
    { id: 3, url: "https://images.unsplash.com/photo-1625938146369-adc83368bda7?q=80&w=600&auto=format&fit=crop", likes: "2.1K" },
    { id: 4, url: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=600&auto=format&fit=crop", likes: "3.4K" },
    { id: 5, url: "https://images.unsplash.com/photo-1544025162-d7669d26d30e?q=80&w=600&auto=format&fit=crop", likes: "920" },
    { id: 6, url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&auto=format&fit=crop", likes: "1.5K" },
    { id: 7, url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop", likes: "4.1K" },
    { id: 8, url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop", likes: "2.8K" },
    { id: 9, url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop", likes: "1.9K" },
];

export const SocialSection: React.FC = () => {
    return (
        <section className="py-32 bg-stone-950 flex flex-col items-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Section Title */}
            <div className="text-center mb-16 relative z-10 px-4">
                <h2 className="font-cinzel text-3xl md:text-5xl text-stone-200 tracking-[0.2em] mb-4">
                    Visual Chronicle
                </h2>
                <p className="font-body text-stone-500 text-xs tracking-[0.3em] uppercase">
                    Follow <span className="text-amber-700">@noir.dining</span> into the void
                </p>
            </div>

            {/* Phone Mockup */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-[320px] md:w-[350px] h-[680px] md:h-[700px] bg-stone-900 rounded-[3rem] border-[12px] md:border-[14px] border-stone-900 shadow-2xl shadow-black/80 ring-1 ring-white/10"
            >
                {/* Screen Container */}
                <div className="w-full h-full bg-black rounded-[2.2rem] overflow-hidden flex flex-col relative font-sans">

                    {/* Status Bar Fake */}
                    <div className="flex justify-between items-center px-6 pt-3 pb-1 text-[10px] font-medium text-white">
                        <span>9:41</span>
                        <div className="flex gap-1">
                            <div className="w-4 h-2.5 border border-white/40 rounded-[2px]" />
                        </div>
                    </div>

                    {/* Instagram Header */}
                    <div className="flex justify-between items-center px-4 py-2 border-b border-stone-900/50">
                        <ChevronLeft size={24} className="text-white" />
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-white tracking-wide">noir.dining</span>
                            <BadgeCheck size={12} className="text-blue-500 fill-blue-500 text-white" />
                        </div>
                        <MoreHorizontal size={24} className="text-white" />
                    </div>

                    {/* Profile Section */}
                    <div className="px-4 py-4">
                        <div className="flex items-center justify-between mb-4">
                            {/* Profile Pic */}
                            <div className="w-20 h-20 rounded-full bg-stone-900 border border-stone-800 p-0.5 relative group cursor-pointer">
                                <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center overflow-hidden">
                                    <span className="font-cinzel text-2xl text-stone-200">N</span>
                                </div>
                                {/* Story Ring Gradient */}
                                <div className="absolute inset-0 rounded-full border-2 border-amber-700/50" />
                            </div>

                            {/* Stats */}
                            <div className="flex flex-1 justify-around text-white ml-4">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg">0</span>
                                    <span className="text-xs text-stone-400">Posts</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg">24.5K</span>
                                    <span className="text-xs text-stone-400">Followers</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg">1</span>
                                    <span className="text-xs text-stone-400">Following</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mb-4">
                            <p className="text-sm text-white font-medium">NOIR Dining</p>
                            <p className="text-sm text-stone-300 font-light leading-tight">
                                Dining in the void. <br />
                                By reservation only. <br />
                                Polanco, CDMX.
                            </p>
                            <p className="text-xs text-amber-500 mt-1 font-medium">Coming soon...</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mb-6">
                            <button className="flex-1 bg-amber-900 text-white text-sm font-semibold py-1.5 rounded-md hover:bg-amber-800 transition-colors">
                                Follow
                            </button>
                            <button className="flex-1 bg-stone-800 text-white text-sm font-semibold py-1.5 rounded-md hover:bg-stone-700 transition-colors">
                                Message
                            </button>
                        </div>

                        {/* Tab Bar */}
                        <div className="flex justify-around border-t border-stone-800/50 pt-2 pb-2">
                            <Grid size={20} className="text-white" />
                            <Clapperboard size={20} className="text-stone-600" />
                            <User size={20} className="text-stone-600" />
                        </div>
                    </div>

                    {/* Photo Grid */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide bg-black">
                        <div className="grid grid-cols-3 gap-0.5">
                            {INSTAGRAM_POSTS.map((post) => (
                                <div key={post.id} className="aspect-square relative group cursor-pointer bg-stone-900">
                                    <img src={post.url} alt="Feed Post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1">
                                        <Heart size={16} fill="white" className="text-white" />
                                        <span className="text-white text-xs font-bold">{post.likes}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom generic spacer for visuals */}
                        <div className="h-12 w-full flex items-center justify-center text-stone-700 pb-4 pt-8">
                            <div className="w-16 h-1 bg-stone-800 rounded-full" />
                        </div>
                    </div>

                    {/* App Bottom Nav */}
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-black border-t border-stone-900 flex justify-around items-center px-4 z-20">
                        <div className="text-white"><Grid size={24} strokeWidth={2.5} /></div> {/* Using Grid as Home for abstract feel */}
                        <div className="text-stone-500"><Search size={24} /></div>
                        <div className="text-stone-500"><Clapperboard size={24} /></div>
                        <div className="text-stone-500"><Heart size={24} /></div>
                        <div className="w-6 h-6 rounded-full bg-stone-800 border border-stone-600" />
                    </div>

                </div>
            </motion.div>
        </section>
    );
};
