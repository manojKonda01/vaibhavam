'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Calendar, Users, ShoppingCart, MessageSquare, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const CustomerDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    upcomingEvents: 0,
    totalBookings: 0,
    favoritePlanners: 0,
    messages: 0
  })

  // Mock data - in real app, fetch from API
  useEffect(() => {
    setStats({
      upcomingEvents: 2,
      totalBookings: 5,
      favoritePlanners: 3,
      messages: 7
    })
  }, [])

  const quickActions = [
    {
      title: 'Find Planners',
      description: 'Browse and connect with event planners',
      icon: Users,
      href: '/planners',
      color: 'bg-blue-500'
    },
    {
      title: 'Browse Marketplace',
      description: 'Shop for event products and services',
      icon: ShoppingCart,
      href: '/marketplace',
      color: 'bg-green-500'
    },
    {
      title: 'Plan New Event',
      description: 'Start planning your next celebration',
      icon: Calendar,
      href: '/events/new',
      color: 'bg-purple-500'
    },
    {
      title: 'Messages',
      description: 'Chat with your planners',
      icon: MessageSquare,
      href: '/messages',
      color: 'bg-orange-500'
    }
  ]

  const recentEvents = [
    {
      id: 1,
      title: 'Wedding Reception',
      date: '2024-06-15',
      planner: 'Elegant Events Co.',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Birthday Party',
      date: '2024-07-20',
      planner: 'Party Masters',
      status: 'planning'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your events
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-primary">{stats.upcomingEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-secondary">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Favorite Planners</p>
                <p className="text-2xl font-bold text-green-600">{stats.favoritePlanners}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-orange-600">{stats.messages}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white mr-4`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">
              Recent Events
            </h2>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
                    <p className="text-sm text-gray-500">{event.planner}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/events"
              className="inline-block mt-4 text-primary hover:text-primary/80 font-medium"
            >
              View all events →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard