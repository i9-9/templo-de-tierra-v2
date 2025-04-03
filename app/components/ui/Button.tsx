'use client'

import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = '',
  onClick 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg border border-[#6F4C21]/20 px-6 py-3 text-center font-sans transition-colors'
  
  const variants = {
    primary: 'bg-[#6F4C21] text-[#F5DC90] hover:bg-[#5A3D1A]',
    secondary: 'bg-[#F5DC90]/40 backdrop-blur-sm text-[#6F4C21] hover:bg-[#F5DC90]/60'
  }

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={buttonStyles}>
      {children}
    </button>
  )
} 