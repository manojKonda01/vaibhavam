'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-md p-10 mt-10"
      >
        <h2 className="text-3xl font-serif text-white mb-2 text-center tracking-tight">Join Vaibhavam</h2>
        <p className="text-gray-400 text-sm text-center mb-8">Enter the world of luxury events.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Display Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-pure-black border border-border-gray/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-pure-black border border-border-gray/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-pure-black border border-border-gray/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">I am an</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-pure-black border border-border-gray/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
            >
              <option value="Customer">Event Seeker (Customer)</option>
              <option value="Planner">Event Artisan (Planner)</option>
            </select>
          </div>
          <button type="submit" className="w-full btn-primary mt-6">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account? <Link href="/auth/login" className="text-white hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
