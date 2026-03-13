'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Building, Cake, Music, PartyPopper, Crown, Sparkles } from 'lucide-react'

const categories = [
  {
    name: 'Wedding',
    icon: Heart,
    description: 'Dream weddings made reality with exquisite attention to detail',
    gradient: 'from-accent via-rose-400 to-pink-500',
    bgColor: 'bg-gradient-to-br from-accent/10 to-pink-500/10',
    shadowColor: 'shadow-accent/20'
  },
  {
    name: 'Corporate',
    icon: Building,
    description: 'Professional event solutions that elevate your brand presence',
    gradient: 'from-primary via-blue-500 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-primary/10 to-blue-500/10',
    shadowColor: 'shadow-primary/20'
  },
  {
    name: 'Birthday',
    icon: Cake,
    description: 'Unforgettable birthday celebrations filled with joy and magic',
    gradient: 'from-secondary via-yellow-400 to-orange-500',
    bgColor: 'bg-gradient-to-br from-secondary/10 to-orange-500/10',
    shadowColor: 'shadow-secondary/20'
  },
  {
    name: 'Festival',
    icon: Music,
    description: 'Cultural and festive events that celebrate traditions and joy',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    bgColor: 'bg-gradient-to-br from-green-400/10 to-teal-600/10',
    shadowColor: 'shadow-green-400/20'
  },
  {
    name: 'Private Party',
    icon: PartyPopper,
    description: 'Intimate private gatherings crafted for special moments',
    gradient: 'from-purple-400 via-violet-500 to-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-400/10 to-purple-600/10',
    shadowColor: 'shadow-purple-400/20'
  },
  {
    name: 'Luxury Events',
    icon: Crown,
    description: 'Exclusive luxury experiences that redefine sophistication',
    gradient: 'from-secondary via-gold-400 to-yellow-500',
    bgColor: 'bg-gradient-to-br from-secondary/10 to-yellow-500/10',
    shadowColor: 'shadow-secondary/20'
  }
]

const EventCategories = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-white to-background/80 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full border border-white/40 shadow-lg mb-6"
          >
            <Sparkles className="w-5 h-5 text-secondary mr-2" />
            <span className="text-primary font-semibold">Event Categories</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Choose Your Celebration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we specialize in every type of event with unparalleled elegance and precision
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.name}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <Link href={`/planners?category=${category.name.toLowerCase()}`}>
                  <div className={`relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl ${category.shadowColor} transition-all duration-500 overflow-hidden border border-white/50 h-full`}>
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    {/* Icon section */}
                    <div className={`relative h-40 ${category.bgColor} flex items-center justify-center overflow-hidden`}>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative z-10"
                      >
                        <div className={`p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg`}>
                          <IconComponent className="w-16 h-16 text-white drop-shadow-lg" />
                        </div>
                      </motion.div>

                      {/* Floating particles */}
                      <motion.div
                        className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                      <motion.div
                        className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white/30 rounded-full"
                        animate={{
                          y: [0, 8, 0],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </div>

                    {/* Content section */}
                    <div className="relative p-8">
                      <motion.h3
                        className="text-2xl font-display font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {category.name}
                      </motion.h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {category.description}
                      </p>

                      {/* Hover indicator */}
                      <motion.div
                        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center shadow-lg">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
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
            <Link
              href="/planners"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span>Explore All Planners</span>
              <motion.div
                className="ml-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default EventCategories