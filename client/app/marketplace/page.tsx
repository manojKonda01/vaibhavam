'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Filter, Search, Package } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  description: string
  seller: string
  inStock: boolean
  tags: string[]
}

const MarketplacePage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Crystal Centerpiece Set',
        category: 'Decorations',
        price: 2500,
        originalPrice: 3000,
        rating: 4.8,
        reviewCount: 24,
        image: '/api/placeholder/300/300',
        description: 'Elegant crystal centerpieces perfect for weddings and formal events.',
        seller: 'Elegant Events Co.',
        inStock: true,
        tags: ['wedding', 'crystal', 'centerpiece']
      },
      {
        id: '2',
        name: 'Professional Sound System',
        category: 'Equipment',
        price: 15000,
        rating: 4.9,
        reviewCount: 18,
        image: '/api/placeholder/300/300',
        description: 'High-quality sound system for events up to 200 people.',
        seller: 'Audio Masters',
        inStock: true,
        tags: ['sound', 'equipment', 'professional']
      },
      {
        id: '3',
        name: 'Custom Cake Stand Set',
        category: 'Catering',
        price: 1200,
        originalPrice: 1500,
        rating: 4.7,
        reviewCount: 31,
        image: '/api/placeholder/300/300',
        description: 'Beautiful cake stands in various sizes for your dessert display.',
        seller: 'Sweet Creations',
        inStock: true,
        tags: ['cake', 'catering', 'dessert']
      },
      {
        id: '4',
        name: 'LED String Lights',
        category: 'Lighting',
        price: 800,
        rating: 4.6,
        reviewCount: 42,
        image: '/api/placeholder/300/300',
        description: 'Warm white LED string lights, 20m length with remote control.',
        seller: 'Light & Magic',
        inStock: false,
        tags: ['lighting', 'LED', 'decorative']
      },
      {
        id: '5',
        name: 'Bridal Bouquet Preservation Kit',
        category: 'Services',
        price: 3500,
        rating: 5.0,
        reviewCount: 15,
        image: '/api/placeholder/300/300',
        description: 'Professional bouquet preservation service with custom display.',
        seller: 'Forever Flowers',
        inStock: true,
        tags: ['bridal', 'flowers', 'preservation']
      },
      {
        id: '6',
        name: 'Event Planning Software License',
        category: 'Digital',
        price: 5000,
        originalPrice: 7500,
        rating: 4.5,
        reviewCount: 8,
        image: '/api/placeholder/300/300',
        description: 'Comprehensive event planning software with templates and tools.',
        seller: 'PlanPro Software',
        inStock: true,
        tags: ['software', 'planning', 'digital']
      }
    ]
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesPrice = !priceRange || checkPriceRange(product.price, priceRange)

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, priceRange, sortBy])

  const checkPriceRange = (price: number, range: string) => {
    switch (range) {
      case 'under-1000':
        return price < 1000
      case '1000-5000':
        return price >= 1000 && price <= 5000
      case '5000-10000':
        return price >= 5000 && price <= 10000
      case 'over-10000':
        return price > 10000
      default:
        return true
    }
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const categories = [...new Set(products.map(p => p.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Event Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover everything you need to make your event extraordinary
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              >
                <option value="">All Prices</option>
                <option value="under-1000">Under ₹1,000</option>
                <option value="1000-5000">₹1,000 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="over-10000">Over ₹10,000</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-center text-sm text-gray-600">
              <Package className="h-4 w-4 mr-2" />
              {filteredProducts.length} products
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 12) }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Package className="h-12 w-12 text-primary/60" />
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.has(product.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
                {!product.inStock && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-2">{product.seller}</p>

                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    disabled={!product.inStock}
                    className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('')
                setPriceRange('')
              }}
              className="mt-4 text-primary hover:text-primary/80 font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MarketplacePage