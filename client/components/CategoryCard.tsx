'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Building, Cake, Music, PartyPopper, Crown, Sparkles } from 'lucide-react'

interface CategoryCardProps {
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  gradient: string
  bgColor: string
  shadowColor: string
  href: string
  index: number
}

const CategoryCard = ({
  name,
  icon: Icon,
  description,
  gradient,
  bgColor,
  shadowColor,
  href,
  index
}: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      <Link href={href}>
        <div className={`relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl ${shadowColor} transition-all duration-500 overflow-hidden border border-white/50 h-full min-h-[400px]`}>
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

          {/* Icon section */}
          <div className={`relative h-48 ${bgColor} flex items-center justify-center overflow-hidden`}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              <div className={`p-8 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                <Icon className="w-20 h-20 text-white drop-shadow-lg" />
              </div>
            </motion.div>

            {/* Floating particles */}
            <motion.div
              className="absolute top-6 right-6 w-3 h-3 bg-white/40 rounded-full"
              animate={{
                y: [0, -12, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-2 h-2 bg-white/30 rounded-full"
              animate={{
                y: [0, 10, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.3
              }}
            />

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-white/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content section */}
          <div className="relative p-8">
            <motion.h3
              className="text-2xl font-display font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {name}
            </motion.h3>
            <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300 mb-6">
              {description}
            </p>

            {/* Hover indicator */}
            <motion.div
              className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CategoryCard