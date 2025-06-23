'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const ComingSoon = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle the subscription here
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mb-8"
          >
            <Heart className="h-24 w-24 text-blue-600 dark:text-blue-400 mx-auto" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Something Special Is Coming
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We&apos;re working on something amazing to better serve our community. Sign up to be the
            first to know when we launch.
          </p>

          {/* Countdown Timer (example) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: '14', label: 'Days' },
              { value: '08', label: 'Hours' },
              { value: '45', label: 'Minutes' },
              { value: '32', label: 'Seconds' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {item.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mb-12">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  Notify Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg"
              >
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  Thank you for subscribing! We&apos;ll keep you updated.
                </p>
              </motion.div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {[
              { icon: Facebook, href: '#', color: 'bg-blue-600' },
              { icon: Twitter, href: '#', color: 'bg-blue-400' },
              { icon: Instagram, href: '#', color: 'bg-pink-600' },
              { icon: Linkedin, href: '#', color: 'bg-blue-700' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white`}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 text-gray-500 dark:text-gray-400"
          >
            <p>Questions? Contact us at info@hopeharbor.org</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ComingSoon
