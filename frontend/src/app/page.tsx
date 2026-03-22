'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pure-black via-pure-black/90 to-soft-black z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-tight leading-tight">
            Create Timeless <br/><span className="text-gray-400 italic font-light">Celebrations</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            The exclusive marketplace for luxury event planners. Discover bespoke experiences, sophisticated design, and flawless execution.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <Link href="/marketplace" className="btn-primary flex items-center gap-2">
              Explore Planners <ArrowRight size={18} />
            </Link>
            <Link href="/auth/register" className="btn-outline">
              Join as a Planner
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-serif mb-3">Curated Experiences</h2>
            <p className="text-gray-400 text-sm">Elevating every occasion.</p>
          </div>
          <Link href="/categories" className="text-sm border-b border-gray-600 pb-1 hover:text-gray-300 transition-colors">
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Luxury Weddings", desc: "Bespoke matchmaking for eternal bonds." },
            { title: "Corporate Galas", desc: "Setting the standard for excellence." },
            { title: "Private Soirées", desc: "Intimate gatherings, perfected." }
          ].map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="glass-panel p-8 group hover:-translate-y-2 transition-transform duration-500 cursor-pointer"
            >
              <div className="h-48 w-full bg-accent-gray/20 rounded-lg mb-6 flex items-center justify-center border border-border-gray/5 group-hover:bg-accent-gray/40 transition-colors" />
              <h3 className="text-xl font-serif mb-2">{cat.title}</h3>
              <p className="text-gray-400 text-sm font-light">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
