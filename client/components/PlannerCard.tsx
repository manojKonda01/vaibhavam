'use client'

import { motion } from 'framer-motion'
import { Star, MapPin, Calendar, Award, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface PlannerCardProps {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  location: string
  specialties: string[]
  experience: number
  priceRange: string
  featured?: boolean
  index: number
}

const PlannerCard = ({
  id,
  name,
  image,
  rating,
  reviewCount,
  location,
  specialties,
  experience,
  priceRange,
  featured = false,
  index
}: PlannerCardProps) => {
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
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 h-full">
        {/* Featured badge */}
        {featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            className="absolute top-4 right-4 z-20 bg-gradient-to-r from-secondary to-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
          >
            <Sparkles className="w-4 h-4 inline mr-1" />
            Featured
          </motion.div>
        )}

        {/* Image section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Overlay content */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-white/60'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-semibold">{rating}</span>
              <span className="text-white/80">({reviewCount})</span>
            </div>
            <div className="flex items-center text-white/90">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
            {name}
          </h3>

          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-secondary" />
              <span>{experience} years</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1 text-accent" />
              <span>{priceRange}</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-6">
            {specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
              >
                {specialty}
              </span>
            ))}
            {specialties.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                +{specialties.length - 3} more
              </span>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Profile
          </motion.button>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          initial={false}
        />
      </div>
    </motion.div>
  )
}

export default PlannerCard