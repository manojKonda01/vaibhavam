'use client'

import { motion } from 'framer-motion'
import PortfolioCarousel from './PortfolioCarousel'
import { Camera, Sparkles } from 'lucide-react'

const PortfolioShowcase = () => {
  const portfolioItems = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
      title: 'Ethereal Garden Wedding',
      category: 'Wedding',
      description: 'A breathtaking outdoor ceremony surrounded by blooming roses and crystal chandeliers, creating an atmosphere of pure romance and elegance.'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
      title: 'Corporate Gala Extravaganza',
      category: 'Corporate',
      description: 'An unforgettable corporate event featuring dramatic lighting, premium catering, and sophisticated decor that impressed every guest.'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop',
      title: 'Golden Anniversary Celebration',
      category: 'Private Party',
      description: 'A golden anniversary party with vintage elegance, featuring champagne towers and a live orchestra for an unforgettable milestone.'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop',
      title: 'Summer Music Festival',
      category: 'Festival',
      description: 'A vibrant music festival with multiple stages, artistic installations, and immersive lighting that created an electric atmosphere.'
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=1200&h=800&fit=crop',
      title: 'Luxury Birthday Bash',
      category: 'Birthday',
      description: 'An extravagant birthday celebration featuring custom decor, gourmet cuisine, and entertainment that exceeded all expectations.'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full border border-white/40 shadow-lg mb-6"
          >
            <Camera className="w-5 h-5 text-secondary mr-2" />
            <span className="text-primary font-semibold">Portfolio Showcase</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Our Masterpiece Creations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in our portfolio of extraordinary events. Each project represents our commitment to perfection,
            creativity, and unforgettable experiences that leave lasting memories.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <PortfolioCarousel items={portfolioItems} />
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '500+', label: 'Events Planned' },
            { number: '50K+', label: 'Happy Clients' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '15+', label: 'Years Experience' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
                <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioShowcase