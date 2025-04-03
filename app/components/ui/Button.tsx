import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
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
  const baseStyles = 'inline-block font-sans text-lg px-8 py-3 rounded-lg transition-colors'
  
  const variants = {
    primary: 'bg-[#6F4C21] text-[#F5DC90] hover:bg-[#5A3D1A]',
    secondary: 'border-2 border-[#6F4C21] text-[#6F4C21] hover:bg-[#6F4C21] hover:text-[#F5DC90]'
  }

  const button = (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {button}
      </Link>
    )
  }

  return button
} 