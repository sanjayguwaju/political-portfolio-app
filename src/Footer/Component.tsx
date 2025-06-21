import React from 'react'
import NewFooter from './NewFooter'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Home,
  User,
  FileText,
  MessageCircle,
} from 'lucide-react'

export async function Footer() {
  // Dummy data for the footer
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  const quickLinks = [
    { icon: Home, href: '/', label: 'Home' },
    { icon: User, href: '/about', label: 'About' },
    { icon: FileText, href: '/services', label: 'Services' },
    { icon: MessageCircle, href: '/contact', label: 'Contact' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'info@politicalportfolio.com', href: 'mailto:info@politicalportfolio.com' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: '123 Political Ave, Washington DC', href: '#' },
  ]

  const footerData = {
    socialLinks,
    quickLinks,
    contactInfo,
    companyName: 'Political Portfolio',
    companyDescription:
      'Empowering political leaders and organizations with comprehensive portfolio management and strategic consulting services. We help shape the future of governance through innovative solutions and expert guidance.',
    copyrightText: '© 2024 Political Portfolio. All rights reserved.',
  }

  return <NewFooter {...footerData} />
}
