'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ContactFormData {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // For demo purposes, just log the data
      console.log('Form submitted:', data)
      
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your message has been sent successfully. We&apos;ll get back to you soon.
        </p>
        <Button
          onClick={() => setSubmitStatus('idle')}
          variant="outline"
          className="px-6"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </Label>
          <Input
            id="fullName"
            type="text"
            {...register('fullName', { required: 'Full name is required' })}
            className={`w-full ${errors.fullName ? 'border-red-500' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`w-full ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Subject */}
        <div>
          <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </Label>
          <Input
            id="subject"
            type="text"
            {...register('subject', { required: 'Subject is required' })}
            className={`w-full ${errors.subject ? 'border-red-500' : ''}`}
            placeholder="What is this about?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </Label>
        <Textarea
          id="message"
          rows={6}
          {...register('message', { 
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters long'
            }
          })}
          className={`w-full ${errors.message ? 'border-red-500' : ''}`}
          placeholder="Tell us more about your inquiry..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </div>
          ) : (
            'Send Message'
          )}
        </Button>

        {submitStatus === 'error' && (
          <p className="text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      <div className="text-xs text-gray-500 mt-4">
        * Required fields
      </div>
    </form>
  )
} 