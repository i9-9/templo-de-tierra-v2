'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Gallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  if (!images || images.length === 0) {
    return null;
  }
  
  return (
    <div className="w-full">
      <div className="relative w-full aspect-[16/9] md:aspect-[3/2] rounded-lg overflow-hidden mb-4 border border-[#6F4C21]/20 shadow-lg">
        <Image
          src={images[activeIndex]}
          alt="Imagen de galería"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-cover"
          priority={activeIndex === 0}
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-all ${
              index === activeIndex
                ? 'border-[#6F4C21] shadow-md'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`Miniatura ${index + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 15vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
} 