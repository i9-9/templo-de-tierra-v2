'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * @typedef {Object} CardProps
 * @property {string} title - Title of the card
 * @property {string} description - Description text
 * @property {string} imageSrc - Path to the image
 * @property {string} href - Link destination
 * @property {Array<string>} [tags] - Array of tag strings
 * @property {string} [aspectRatio] - Aspect ratio of the image
 */

/**
 * Card component for displaying content with image, title, description and tags
 * @param {CardProps} props
 */
export default function Card({ 
  title, 
  description, 
  imageSrc, 
  href, 
  tags = [],
  aspectRatio = "aspect-[4/3]"
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [imagePath, setImagePath] = useState(imageSrc);
  
  useEffect(() => {
    // Para propósitos de debugging, podemos registrar la ruta de la imagen
    console.log(`Card for ${title}, image path: ${imageSrc}`);
    
    // Si la imagen no comienza con http o /, añadimos / al inicio
    if (imageSrc && !imageSrc.startsWith('/') && !imageSrc.startsWith('http')) {
      setImagePath(`/${imageSrc}`);
    }
  }, [imageSrc, title]);
  
  return (
    <Link 
      href={href}
      className="block group overflow-hidden rounded-lg border border-[#6F4C21]/20 shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative w-full ${typeof aspectRatio === 'string' && aspectRatio.startsWith('aspect-') ? aspectRatio : `aspect-[${aspectRatio}]`} overflow-hidden bg-[#F5DC90]/10`}>
        {imagePath && !isImageError ? (
          <Image
            src={imagePath}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-center transition-transform duration-500 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
            priority
            quality={90}
            onError={(e) => {
              console.error(`Error loading image for ${title}:`, e);
              setIsImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F5DC90]/30">
            <span className="text-[#6F4C21] font-medium text-lg px-4 text-center">
              {title}
              {isImageError && <span className="block text-xs mt-2">Error al cargar la imagen</span>}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 bg-[#F5DC90]/40 backdrop-blur-sm flex-grow flex flex-col">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block text-xs px-2 py-1 rounded-full bg-[#6F4C21]/10 text-[#6F4C21]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <h3 className="font-heading text-[1.26rem] text-[#6F4C21] mb-2 leading-tight">
          {title}
        </h3>
        
        <p className="font-sans text-sm text-[#6F4C21]/80 line-clamp-3 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto flex items-center justify-end">
          <span className="text-sm font-medium text-[#6F4C21] group-hover:translate-x-1 transition-transform duration-300">
            Ver más →
          </span>
        </div>
      </div>
    </Link>
  )
} 