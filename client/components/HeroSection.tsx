'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Heart, Star, Crown } from 'lucide-react'

const HeroSection = () => {
  const floatingIcons = [
    { Icon: Sparkles, delay: 0, x: -200, y: -100 },
    { Icon: Heart, delay: 1, x: 200, y: -150 },
    { Icon: Star, delay: 2, x: -150, y: 100 },
    { Icon: Crown, delay: 3, x: 150, y: 120 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop"
          alt="Luxury wedding event"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Floating background elements */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          initial={{ x, y, scale: 0 }}
          animate={{
            x: [x, x + 20, x - 20, x],
            y: [y, y - 30, y + 30, y],
            scale: [0, 1, 1, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: '50%', top: '50%' }}
        >
          <Icon className="w-12 h-12 text-white/30" />
        </motion.div>
      ))}

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl mb-8"
        >
          <Sparkles className="w-5 h-5 text-secondary mr-2" />
          <span className="text-white/90 font-medium">Luxury Event Planning Platform</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
        >
          <span className="block bg-gradient-to-r from-white via-white to-secondary bg-clip-text text-transparent">
            Create
          </span>
          <span className="block bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
            Unforgettable
          </span>
          <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Celebrations
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Connect with <span className="text-secondary font-semibold">professional event planners</span> to bring your vision to life.
          From intimate gatherings to grand celebrations, we make every moment extraordinary.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/planners"
              className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Explore Planners
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/plan-event"
              className="group relative inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold text-lg rounded-2xl border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                <Crown className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Plan Your Event
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: '500+', label: 'Expert Planners' },
            { number: '10K+', label: 'Events Planned' },
            { number: '98%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg"
            >
              <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">{stat.number}</div>
              <div className="text-white/70 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  )
}

export default HeroSection