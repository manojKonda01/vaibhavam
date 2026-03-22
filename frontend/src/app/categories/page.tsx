'use client';
import { motion } from 'framer-motion';

export default function Categories() {
  const categories = [
    { title: "Luxury Weddings", count: "142 Planners", image: "https://via.placeholder.com/600x400/111111/FFFFFF?text=Weddings" },
    { title: "Corporate Galas", count: "89 Planners", image: "https://via.placeholder.com/600x400/111111/FFFFFF?text=Corporate" },
    { title: "Private Soirées", count: "204 Planners", image: "https://via.placeholder.com/600x400/111111/FFFFFF?text=Soirees" },
    { title: "Charity Balls", count: "45 Planners", image: "https://via.placeholder.com/600x400/111111/FFFFFF?text=Charity" },
    { title: "Destination Events", count: "112 Planners", image: "https://via.placeholder.com/600x400/111111/FFFFFF?text=Destination" },
    { title: "VIP Experiences", count: "34 Planners", image: "https://via.placeholder.com/600x400/111111/FFFFFF?text=VIP" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-16">
        <h1 className="text-5xl font-serif text-white tracking-tight mb-4">Event Categories</h1>
        <p className="text-lg text-gray-400 max-w-2xl font-light">
          Browse specialized artisans by the type of event they master.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group cursor-pointer relative h-80 rounded-xl overflow-hidden glass-panel"
          >
            <div className="absolute inset-0 bg-soft-black/40 group-hover:bg-soft-black/20 transition-colors z-10" />
            
            <div className="absolute bottom-8 left-8 z-20">
              <h3 className="text-3xl font-serif text-white mb-2">{cat.title}</h3>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{cat.count}</p>
            </div>
            
            <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-500">
              <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
