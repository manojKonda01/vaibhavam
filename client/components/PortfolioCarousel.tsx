'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface PortfolioItem {
  id: string
  image: string
  title: string
  category: string
  description: string
}

interface PortfolioCarouselProps {
  items: PortfolioItem[]
}

const PortfolioCarousel = ({ items }: PortfolioCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, items.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main carousel container */}
      <div className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={items[currentIndex].image}
              alt={items[currentIndex].title}
              fill
              className="object-cover"
              priority
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                    {items[currentIndex].category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="text-white/80 text-sm">Featured Work</span>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
                  {items[currentIndex].title}
                </h3>

                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  {items[currentIndex].description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-xl text-white border border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  View Full Portfolio
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/10 backdrop-blur-xl text-white rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/10 backdrop-blur-xl text-white rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail indicators */}
      <div className="flex justify-center space-x-3 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? 'ring-2 ring-secondary ring-offset-2 ring-offset-background'
                : 'opacity-60 hover:opacity-80'
            }`}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <Image
              src={items[index].image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
            {index === currentIndex && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-secondary/20"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full bg-white/20 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

export default PortfolioCarousel