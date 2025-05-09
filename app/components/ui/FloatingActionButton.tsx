'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface FloatingActionButtonProps {
  href: string
  label: string
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export default function FloatingActionButton({
  href,
  label,
  icon,
  variant = 'primary'
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón después de desplazarse 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const variantClasses = {
    primary: 'bg-[#6F4C21] text-[#F5DC90] hover:bg-[#5A3D1A]',
    secondary: 'bg-[#F5DC90] text-[#6F4C21] hover:bg-[#EFD17F] border border-[#6F4C21]/30'
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <Link 
        href={href}
        className={`flex items-center gap-2 py-3 px-6 rounded-full shadow-lg ${variantClasses[variant]}`}
      >
        {icon && <span>{icon}</span>}
        <span className="font-medium">{label}</span>
      </Link>
    </div>
  )
} 