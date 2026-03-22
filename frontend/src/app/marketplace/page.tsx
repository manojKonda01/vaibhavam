'use client';
import { motion } from 'framer-motion';

export default function Marketplace() {
  const planners = [
    { name: "Aria Events", specialty: "Luxury Weddings", location: "New York" },
    { name: "Vanguard Soirées", specialty: "Corporate Galas", location: "London" },
    { name: "Eternity Design", specialty: "Private Parties", location: "Paris" },
    { name: "Lumina Celebrations", specialty: "Destination Weddings", location: "Dubai" },
    { name: "Opulence Crafters", specialty: "VIP Gatherings", location: "Los Angeles" },
    { name: "Noir Experiences", specialty: "High-end Corporate", location: "Tokyo" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-16">
        <h1 className="text-5xl font-serif text-white tracking-tight mb-4">The Planners</h1>
        <p className="text-lg text-gray-400 max-w-2xl font-light">
          A definitive collection of the world's most exclusive event artisans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {planners.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group cursor-pointer"
          >
            <div className="h-72 w-full bg-soft-black border border-border-gray/10 rounded-xl mb-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-pure-black/80 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{p.location}</p>
                <h3 className="text-2xl font-serif text-white">{p.name}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-400 group-hover:text-white transition-colors">{p.specialty}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
