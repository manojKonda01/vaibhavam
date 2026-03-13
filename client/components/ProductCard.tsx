'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Tag } from 'lucide-react'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  category: string
  type: 'rent' | 'buy'
  inStock: boolean
  featured?: boolean
  index: number
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  category,
  type,
  inStock,
  featured = false,
  index
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

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
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 h-full">
        {/* Featured badge */}
        {featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            className="absolute top-4 left-4 z-20 bg-gradient-to-r from-accent to-secondary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
          >
            <Star className="w-4 h-4 inline mr-1" />
            Featured
          </motion.div>
        )}

        {/* Type badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
            type === 'rent'
              ? 'bg-blue-500 text-white'
              : 'bg-green-500 text-white'
          }`}>
            {type === 'rent' ? 'Rent' : 'Buy'}
          </span>
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            className="absolute top-16 left-4 z-20 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
          >
            -{discount}%
          </motion.div>
        )}

        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Wishlist button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-16 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            <Heart className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Content section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
              {category}
            </span>
            {!inStock && (
              <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                Out of Stock
              </span>
            )}
          </div>

          <h3 className="text-lg font-display font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-primary">
              ${price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
            {type === 'rent' && (
              <span className="text-sm text-gray-600">/day</span>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!inStock}
            className={`w-full flex items-center justify-center space-x-2 font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 ${
              inStock
                ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
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

export default ProductCard