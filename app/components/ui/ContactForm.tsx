'use client'

import { useState } from 'react'
import Button from './Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#6F4C21] mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#6F4C21] mb-1">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#6F4C21] mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#6F4C21] mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
          required
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" variant="primary" className="w-full">
          Enviar mensaje
        </Button>
        <Button type="button" variant="secondary" className="w-full" onClick={handleReset}>
          Limpiar formulario
        </Button>
      </div>
    </form>
  )
} 