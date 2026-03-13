'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Calendar, Users, DollarSign, MessageSquare, Star, TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'

const PlannerDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeClients: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    pendingRequests: 0
  })

  // Mock data - in real app, fetch from API
  useEffect(() => {
    setStats({
      totalEvents: 24,
      activeClients: 8,
      monthlyRevenue: 12500,
      averageRating: 4.8,
      pendingRequests: 3
    })
  }, [])

  const quickActions = [
    {
      title: 'Create Portfolio',
      description: 'Showcase your work and services',
      icon: Plus,
      href: '/portfolio/create',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Events',
      description: 'View and update your event bookings',
      icon: Calendar,
      href: '/events/manage',
      color: 'bg-green-500'
    },
    {
      title: 'Client Messages',
      description: 'Communicate with your clients',
      icon: MessageSquare,
      href: '/messages',
      color: 'bg-purple-500'
    },
    {
      title: 'View Analytics',
      description: 'Track your business performance',
      icon: TrendingUp,
      href: '/analytics',
      color: 'bg-orange-500'
    }
  ]

  const recentBookings = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      eventType: 'Wedding',
      date: '2024-06-15',
      status: 'confirmed',
      amount: 5000
    },
    {
      id: 2,
      clientName: 'Mike Chen',
      eventType: 'Corporate Event',
      date: '2024-07-20',
      status: 'pending',
      amount: 3000
    },
    {
      id: 3,
      clientName: 'Emma Davis',
      eventType: 'Birthday Party',
      date: '2024-08-10',
      status: 'confirmed',
      amount: 1500
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
            Manage your events and grow your business
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
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-primary">{stats.totalEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-secondary">{stats.activeClients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}/5</p>
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

          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-semibold text-primary">
                Recent Bookings
              </h2>
              {stats.pendingRequests > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {stats.pendingRequests} pending
                </span>
              )}
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.clientName}</h3>
                    <p className="text-sm text-gray-600">{booking.eventType} • {booking.date}</p>
                    <p className="text-sm font-medium text-green-600">${booking.amount.toLocaleString()}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/bookings"
              className="inline-block mt-4 text-primary hover:text-primary/80 font-medium"
            >
              View all bookings →
            </Link>
          </motion.div>
        </div>

        {/* Portfolio Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-heading font-semibold mb-2">
                Showcase Your Work
              </h3>
              <p className="text-white/90 mb-4">
                Create an impressive portfolio to attract more clients and stand out in the marketplace.
              </p>
              <Link
                href="/portfolio/create"
                className="inline-flex items-center px-4 py-2 bg-white text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Portfolio
              </Link>
            </div>
            <div className="hidden md:block">
              <Star className="h-16 w-16 text-white/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PlannerDashboard