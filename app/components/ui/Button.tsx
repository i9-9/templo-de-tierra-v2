'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  href?: string
}

const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-colors duration-200 font-medium text-[1rem] px-6 py-3'

const variants = {
  primary: 'bg-[#6F4C21] text-white hover:bg-[#5A3D1A]',
  secondary: 'bg-white/50 text-[#6F4C21] hover:bg-white/70 border border-[#6F4C21]/20',
  tertiary: 'text-[#6F4C21] hover:text-[#5A3D1A] hover:underline'
}

export default function Button({ variant = 'primary', className = '', href, ...props }: ButtonProps) {
  const buttonClassName = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {props.children}
      </Link>
    )
  }

  return (
    <button
      className={buttonClassName}
      {...props}
    />
  )
} 