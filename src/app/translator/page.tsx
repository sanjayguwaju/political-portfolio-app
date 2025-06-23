import React from 'react'
import { LanguageTranslator } from '@/components/LanguageTranslator'
import { TranslatedText } from '@/components/TranslatedText'

export default function TranslatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Website Language Translator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Switch between English and Nepali to translate the entire website
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-6">
            <LanguageTranslator />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How it works:
            </h2>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Click the language switcher in the navigation bar
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Select your preferred language (English or Nepali)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  The entire website content will be automatically translated using Google Translate
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Example Content
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                This is an example of how the translation system works. When you switch languages, all text on the page will be automatically translated by Google Translate.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The translation is powered by Google Translate and provides instant, high-quality translations.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                You can also use the Google Translate widget in the top-right corner of the page for additional translation options.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Features
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Automatic translation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Instant translation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Language preference saved
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                High-quality translations
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Test Translation Content
          </h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              This is a test paragraph to verify that the Google Translate widget is working correctly. 
              When you switch languages using the language switcher, this text should be translated automatically.
            </p>
            <p>
              The translation system now uses Google Translate instead of the previous API-based solution. 
              This provides better reliability and instant translations without any API calls.
            </p>
            <p>
              You can test the translation by clicking on the language switcher in the navigation bar 
              or by using the Google Translate widget in the top-right corner of the page.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by Google Translate
          </p>
        </div>
      </div>
    </div>
  )
} 