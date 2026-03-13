'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Sparkles, Heart } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Twitter, href: '#', label: 'Twitter' }
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Find Planners', href: '/planners' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'About Us', href: '/about' }
  ]

  const supportLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ]

  const contactInfo = [
    { Icon: Mail, text: 'hello@vaibhavam.com', href: 'mailto:hello@vaibhavam.com' },
    { Icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { Icon: MapPin, text: 'New York, NY 10001', href: '#' }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <footer className="relative bg-dark-surface text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Vaibhavam
              </h3>
            </motion.div>

            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Creating unforgettable celebrations with professional event planners.
              From intimate gatherings to grand celebrations, we bring your vision to life with elegance and precision.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map(({ Icon, text, href }) => (
                <motion.a
                  key={text}
                  href={href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-display font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-secondary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-display font-bold text-white mb-6 relative">
              Support
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-secondary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Vaibhavam. All rights reserved.
              <span className="hidden md:inline"> • </span>
              <br className="md:hidden" />
              Made with <Heart className="inline w-4 h-4 text-accent mx-1" /> for unforgettable celebrations.
            </p>

            <motion.div
              className="flex items-center space-x-6 text-sm text-gray-400"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">
                Terms
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-white transition-colors duration-300">
                Cookies
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
    </footer>
  )
}

export default Footer