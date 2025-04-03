'use client'

import Button from './ui/Button'

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <Button 
        variant="secondary" 
        onClick={() => setIsOpen(!isOpen)}
        className="text-[1rem] bg-[#F5DC90]"
      >
        {isOpen ? 'Cerrar' : 'Menú'}
      </Button>
    </div>
  )
} 