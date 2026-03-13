'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { ShoppingBag, Sparkles } from 'lucide-react'

const EventShop = () => {
  const products = [
    {
      id: '1',
      name: 'Crystal Chandelier Set',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviewCount: 24,
      category: 'Lighting',
      type: 'rent' as const,
      inStock: true,
      featured: true
    },
    {
      id: '2',
      name: 'Premium Table Linens',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      price: 89,
      rating: 4.6,
      reviewCount: 18,
      category: 'Decor',
      type: 'rent' as const,
      inStock: true,
      featured: false
    },
    {
      id: '3',
      name: 'Professional Sound System',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      price: 499,
      originalPrice: 649,
      rating: 4.9,
      reviewCount: 31,
      category: 'Audio',
      type: 'rent' as const,
      inStock: true,
      featured: true
    },
    {
      id: '4',
      name: 'LED Dance Floor',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop',
      price: 799,
      rating: 4.7,
      reviewCount: 15,
      category: 'Lighting',
      type: 'rent' as const,
      inStock: false,
      featured: false
    },
    {
      id: '5',
      name: 'Luxury Centerpieces',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop',
      price: 149,
      originalPrice: 199,
      rating: 4.5,
      reviewCount: 22,
      category: 'Decor',
      type: 'buy' as const,
      inStock: true,
      featured: false
    },
    {
      id: '6',
      name: 'Professional Camera Kit',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
      price: 899,
      rating: 4.8,
      reviewCount: 28,
      category: 'Photography',
      type: 'rent' as const,
      inStock: true,
      featured: true
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
        <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
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
            <ShoppingBag className="w-5 h-5 text-accent mr-2" />
            <span className="text-primary font-semibold">Event Shop</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
            Premium Event Equipment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Elevate your event with our curated collection of premium equipment and decor.
            From professional lighting to exquisite table settings, find everything you need for perfection.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
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
            <button className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-accent via-secondary to-primary text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <ShoppingBag className="w-6 h-6 mr-3" />
              <span>Browse All Products</span>
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

export default EventShop