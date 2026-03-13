'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Calendar, Filter, Search } from 'lucide-react'
import Link from 'next/link'

interface Planner {
  id: string
  name: string
  specialty: string
  location: string
  rating: number
  reviewCount: number
  priceRange: string
  image: string
  description: string
  experience: number
  completedEvents: number
}

const PlannersPage = () => {
  const [planners, setPlanners] = useState<Planner[]>([])
  const [filteredPlanners, setFilteredPlanners] = useState<Planner[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockPlanners: Planner[] = [
      {
        id: '1',
        name: 'Elegant Events Co.',
        specialty: 'Wedding Planning',
        location: 'Mumbai, Maharashtra',
        rating: 4.9,
        reviewCount: 127,
        priceRange: '₹50,000 - ₹2,00,000',
        image: '/api/placeholder/300/200',
        description: 'Specializing in dream weddings with attention to every detail.',
        experience: 8,
        completedEvents: 156
      },
      {
        id: '2',
        name: 'Party Masters',
        specialty: 'Corporate Events',
        location: 'Delhi, NCR',
        rating: 4.7,
        reviewCount: 89,
        priceRange: '₹30,000 - ₹1,50,000',
        image: '/api/placeholder/300/200',
        description: 'Professional corporate event planning and execution.',
        experience: 6,
        completedEvents: 203
      },
      {
        id: '3',
        name: 'Celebration Creators',
        specialty: 'Birthday Parties',
        location: 'Bangalore, Karnataka',
        rating: 4.8,
        reviewCount: 156,
        priceRange: '₹15,000 - ₹75,000',
        image: '/api/placeholder/300/200',
        description: 'Creating magical birthday experiences for all ages.',
        experience: 5,
        completedEvents: 312
      },
      {
        id: '4',
        name: 'Luxury Affairs',
        specialty: 'Luxury Events',
        location: 'Mumbai, Maharashtra',
        rating: 5.0,
        reviewCount: 73,
        priceRange: '₹1,00,000 - ₹5,00,000',
        image: '/api/placeholder/300/200',
        description: 'Premium event planning for discerning clients.',
        experience: 10,
        completedEvents: 89
      }
    ]
    setPlanners(mockPlanners)
    setFilteredPlanners(mockPlanners)
  }, [])

  useEffect(() => {
    let filtered = planners.filter(planner => {
      const matchesSearch = planner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          planner.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          planner.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = !selectedSpecialty || planner.specialty === selectedSpecialty
      const matchesLocation = !selectedLocation || planner.location.includes(selectedLocation)

      return matchesSearch && matchesSpecialty && matchesLocation
    })

    // Sort planners
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviewCount - a.reviewCount
        case 'experience':
          return b.experience - a.experience
        default:
          return 0
      }
    })

    setFilteredPlanners(filtered)
  }, [planners, searchTerm, selectedSpecialty, selectedLocation, sortBy])

  const specialties = [...new Set(planners.map(p => p.specialty))]
  const locations = [...new Set(planners.map(p => p.location.split(',')[0]))]

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
            Find Your Perfect Event Planner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with professional event planners who will make your celebration unforgettable
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search planners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              >
                <option value="rating">Sort by Rating</option>
                <option value="reviews">Sort by Reviews</option>
                <option value="experience">Sort by Experience</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Planners Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPlanners.map((planner, index) => (
            <motion.div
              key={planner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                    {planner.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-gray-900">{planner.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {planner.specialty}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{planner.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({planner.reviewCount})</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {planner.location}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {planner.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {planner.experience} years exp.
                  </div>
                  <div>
                    {planner.completedEvents} events
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {planner.priceRange}
                  </span>
                  <Link
                    href={`/planners/${planner.id}`}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPlanners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No planners found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedSpecialty('')
                setSelectedLocation('')
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

export default PlannersPage