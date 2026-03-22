'use client';
import { motion } from 'framer-motion';

export default function Shop() {
  const products = [
    { title: "Crystal Chandelier Series", price: "$499/day", category: "Lighting" },
    { title: "Velvet Lounge Setup", price: "$1200/event", category: "Furniture" },
    { title: "Artisan Floral Arch", price: "$850", category: "Decor" },
    { title: "Monochrome Tableware Set", price: "$20/guest", category: "Dining" },
    { title: "Ambient LED Walls", price: "$2000/day", category: "Tech" },
    { title: "Bespoke Onyx Bar", price: "$1500/event", category: "Furniture" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-16">
        <h1 className="text-5xl font-serif text-white tracking-tight mb-4">Event Catalog</h1>
        <p className="text-lg text-gray-400 max-w-2xl font-light">
          Rent or purchase exclusive event elements crafted by premium designers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((prod, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group cursor-pointer"
          >
            <div className="h-80 w-full bg-soft-black border border-border-gray/10 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center group-hover:bg-accent-gray/40 transition-colors">
              <span className="text-border-gray/20 font-serif italic">{prod.category}</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-serif text-white mb-1">{prod.title}</h3>
                <p className="text-xs uppercase tracking-widest text-gray-500">{prod.category}</p>
              </div>
              <p className="text-sm text-gray-300 font-medium">{prod.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
