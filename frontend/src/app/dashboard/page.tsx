'use client';
import { motion } from 'framer-motion';

export default function CustomerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-2">
        <h2 className="text-xl font-serif text-white mb-6">Dashboard</h2>
        {['My Bookings', 'Messages', 'Saved Planners', 'Account Settings'].map((item, idx) => (
          <div key={idx} className={`p-3 rounded-lg text-sm cursor-pointer transition-colors ${idx === 0 ? 'bg-primary-white text-pure-black font-medium' : 'text-gray-400 hover:text-white hover:bg-soft-black'}`}>
            {item}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-8"
        >
          <h3 className="text-2xl font-serif mb-6 text-white">Upcoming Events</h3>
          <div className="border border-border-gray/10 rounded-lg p-6 bg-pure-black flex flex-col items-center justify-center text-center h-48">
            <p className="text-gray-400 mb-4">You have no upcoming events booked.</p>
            <button className="btn-outline text-xs px-4 py-2">Explore Planners</button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
