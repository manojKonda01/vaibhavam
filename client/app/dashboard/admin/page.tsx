'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Users, Calendar, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalRevenue: 0,
    activePlanners: 0,
    pendingApprovals: 0,
    reportedIssues: 0
  })

  // Mock data - in real app, fetch from API
  useEffect(() => {
    setStats({
      totalUsers: 1250,
      totalEvents: 340,
      totalRevenue: 45000,
      activePlanners: 45,
      pendingApprovals: 8,
      reportedIssues: 3
    })
  }, [])

  const adminActions = [
    {
      title: 'User Management',
      description: 'Manage users, planners, and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500',
      urgent: false
    },
    {
      title: 'Event Oversight',
      description: 'Monitor and manage all events',
      icon: Calendar,
      href: '/admin/events',
      color: 'bg-green-500',
      urgent: false
    },
    {
      title: 'Pending Approvals',
      description: 'Review planner applications and content',
      icon: AlertTriangle,
      href: '/admin/approvals',
      color: 'bg-orange-500',
      urgent: true
    },
    {
      title: 'Revenue Analytics',
      description: 'View platform revenue and trends',
      icon: TrendingUp,
      href: '/admin/analytics',
      color: 'bg-purple-500',
      urgent: false
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New planner registered: Elegant Events Co.',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'event_completed',
      message: 'Wedding event completed by Premium Planners',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'issue_reported',
      message: 'Payment dispute reported for event #1234',
      time: '6 hours ago',
      status: 'urgent'
    },
    {
      id: 4,
      type: 'user_suspended',
      message: 'User account suspended for policy violation',
      time: '1 day ago',
      status: 'resolved'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'urgent':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'urgent':
        return 'text-red-600 bg-red-100'
      case 'resolved':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

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
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage the Vaibhavam platform
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
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-secondary">{stats.totalEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Items</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingApprovals + stats.reportedIssues}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admin Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">
              Admin Actions
            </h2>
            <div className="space-y-4">
              {adminActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white mr-4`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      {action.urgent && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/admin/activities"
              className="inline-block mt-4 text-primary hover:text-primary/80 font-medium"
            >
              View all activities →
            </Link>
          </motion.div>
        </div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-xl font-heading font-semibold text-primary mb-4">
            System Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Server Status</h3>
              <p className="text-sm text-green-600">All systems operational</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Database</h3>
              <p className="text-sm text-green-600">Connected & healthy</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-medium text-gray-900">API Response</h3>
              <p className="text-sm text-yellow-600">Minor delays detected</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard