'use client'

import Link from 'next/link'

interface BannerButtonProps {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function BannerButton({
  href,
  label,
  variant = 'primary',
  className = ''
}: BannerButtonProps) {
  const variantClasses = {
    primary: 'bg-[#6F4C21] text-[#F5DC90] hover:bg-[#5A3D1A]',
    secondary: 'bg-[#F5DC90] text-[#6F4C21] hover:bg-[#EFD17F] border border-[#6F4C21]/20'
  }

  return (
    <Link 
      href={href}
      className={`flex items-center justify-center text-center py-4 px-8 text-lg font-heading rounded-lg shadow-md transition-all duration-300 ${variantClasses[variant]} ${className}`}
    >
      {label}
    </Link>
  )
} 