'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Home, ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Illustration */}
          <div className="mb-8 relative">
            <div className="text-9xl font-bold text-blue-600/10 dark:text-blue-500/10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="h-24 w-24 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <Home className="h-5 w-5 mr-2" />
                Return Home
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-full border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300 flex items-center justify-center"
              >
                Contact Support
                <ArrowRight className="h-5 w-5 ml-2" />
              </motion.button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 text-gray-500 dark:text-gray-400"
          ></motion.div>
        </motion.div>
      </div>
    </div>
  )
}
