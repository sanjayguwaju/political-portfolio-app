import React from 'react'
import { LanguageTranslator } from '@/components/LanguageTranslator'

export default function TestMobilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Mobile Language Translator Test
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Test Language Translator
          </h2>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
            <LanguageTranslator
              className="ml-2"
              variant="mobile"
            />
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              This is a test paragraph to verify that the mobile language translator is working correctly.
              When you switch languages using the language switcher, this text should be translated automatically.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Click on the language switcher button</li>
            <li>Select a different language (English or Nepali)</li>
            <li>Check if the page reloads and translation is applied</li>
            <li>Check browser console for any error messages</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 