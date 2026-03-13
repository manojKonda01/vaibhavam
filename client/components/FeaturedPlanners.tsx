'use client'

import { motion } from 'framer-motion'
import PlannerCard from './PlannerCard'
import { Sparkles, Users } from 'lucide-react'

const FeaturedPlanners = () => {
  const planners = [
    {
      id: '1',
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 127,
      location: 'New York, NY',
      specialties: ['Wedding', 'Corporate', 'Luxury Events'],
      experience: 8,
      priceRange: '$$$',
      featured: true
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 89,
      location: 'Los Angeles, CA',
      specialties: ['Birthday', 'Private Party', 'Festival'],
      experience: 6,
      priceRange: '$$',
      featured: false
    },
    {
      id: '3',
      name: 'Priya Patel',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 156,
      location: 'Miami, FL',
      specialties: ['Wedding', 'Luxury Events', 'Corporate'],
      experience: 10,
      priceRange: '$$$$',
      featured: true
    },
    {
      id: '4',
      name: 'David Kim',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 73,
      location: 'Chicago, IL',
      specialties: ['Corporate', 'Festival', 'Private Party'],
      experience: 5,
      priceRange: '$$$',
      featured: false
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-white to-background/80 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
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
            <Users className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-semibold">Expert Planners</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Meet Our Featured Planners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover exceptional event planners who bring creativity, expertise, and passion to every celebration.
            Each planner is carefully selected for their outstanding track record and artistic vision.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {planners.map((planner, index) => (
            <PlannerCard key={planner.id} {...planner} index={index} />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <span>View All Planners</span>
              <motion.div
                className="ml-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedPlanners