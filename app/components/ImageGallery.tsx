'use client';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Image from 'next/image';
import { ReactImageGalleryItem } from 'react-image-gallery';

interface ImageGalleryProps {
  images: string[];
  showPlayButton?: boolean;
  showFullscreenButton?: boolean;
  showThumbnails?: boolean;
  thumbnailPosition?: 'top' | 'right' | 'bottom' | 'left';
  showNav?: boolean;
  showBullets?: boolean;
  autoPlay?: boolean;
  slideDuration?: number;
  slideInterval?: number;
  additionalClass?: string;
}

export default function ImageGalleryComponent({
  images,
  showPlayButton = false,
  showFullscreenButton = true,
  showThumbnails = true,
  thumbnailPosition = 'bottom',
  showNav = true,
  showBullets = true,
  autoPlay = false,
  slideDuration = 450,
  slideInterval = 5000,
  additionalClass = '',
}: ImageGalleryProps) {
  const items: ReactImageGalleryItem[] = images.map((image, index) => ({
    original: image,
    thumbnail: image,
    originalAlt: `Imagen ${index + 1}`,
    thumbnailAlt: `Imagen ${index + 1}`,
  }));

  return (
    <div className="w-full h-full">
      <style jsx global>{`
        .image-gallery {
          width: 100%;
          height: 100%;
        }
        .image-gallery-slide {
          height: 500px;
        }
        .image-gallery-thumbnails-container {
          margin-top: 10px;
        }
        .image-gallery-thumbnail {
          width: 100px;
          height: 70px;
          margin-right: 5px;
        }
        .image-gallery-thumbnail.active {
          border: 2px solid #D8A34B;
        }
        .image-gallery-icon {
          filter: none;
          color: #FDF6E3;
          transition: all 0.3s ease;
          background: none !important;
          opacity: 0.7;
          top: 50%;
          transform: translateY(-50%) !important;
        }
        .image-gallery-icon:hover {
          color: #D8A34B;
          opacity: 1;
        }
        .image-gallery-icon.image-gallery-left-nav,
        .image-gallery-icon.image-gallery-right-nav {
          padding: 0;
          height: auto;
          width: auto;
        }
        .image-gallery-icon.image-gallery-left-nav {
          left: 4px;
        }
        .image-gallery-icon.image-gallery-right-nav {
          right: 4px;
        }
        .image-gallery-svg {
          width: 4px;
          height: 4px;
          filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
        }
        .image-gallery-fullscreen-button {
          padding: 0;
          right: 12px;
          bottom: 12px;
          top: auto;
          transform: none !important;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .image-gallery-fullscreen-button:hover {
          opacity: 1;
        }
        .image-gallery-fullscreen-button .image-gallery-svg {
          width: 16px;
          height: 16px;
          filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
        }

        /* Estilos para el modo pantalla completa */
        .image-gallery.fullscreen-modal {
          background: rgba(0, 0, 0, 0.95);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          padding: 40px;
        }
        .fullscreen-modal .image-gallery-slide {
          height: calc(100vh - 150px);
        }
        .fullscreen-modal .image-gallery-content {
          max-height: 100vh;
          width: 100%;
          position: relative;
        }
        .fullscreen-modal .image-gallery-slide-wrapper {
          height: calc(100vh - 150px);
        }
        .fullscreen-modal .image-gallery-swipe {
          height: 100%;
        }
        .fullscreen-modal .image-gallery-slides {
          height: 100%;
        }
        .fullscreen-modal .image-gallery-slide {
          height: 100%;
        }
        .fullscreen-modal .image-gallery-slide > div {
          height: 100% !important;
        }
        .fullscreen-modal .image-gallery-thumbnails-wrapper {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.5);
          padding: 10px;
          border-radius: 8px;
        }
        .fullscreen-modal .image-gallery-thumbnail {
          border: none;
          transition: all 0.3s ease;
        }
        .fullscreen-modal .image-gallery-thumbnail:hover {
          border: 2px solid #D8A34B;
        }
        .fullscreen-modal .image-gallery-thumbnail.active {
          border: 2px solid #D8A34B;
        }
        .fullscreen-modal .image-gallery-icon {
          opacity: 0.5;
        }
        .fullscreen-modal .image-gallery-icon:hover {
          opacity: 1;
        }
        .fullscreen-modal .image-gallery-svg {
          width: 16px;
          height: 16px;
        }
        .fullscreen-modal .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
          background: rgba(111, 76, 33, 0.3);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 51;
          transition: all 0.3s ease;
        }
        .fullscreen-modal .close-button:hover {
          background: rgba(216, 163, 75, 0.3);
        }
        .fullscreen-modal .close-button::before,
        .fullscreen-modal .close-button::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 2px;
          background-color: #FDF6E3;
          transform-origin: center;
        }
        .fullscreen-modal .close-button::before {
          transform: rotate(45deg);
        }
        .fullscreen-modal .close-button::after {
          transform: rotate(-45deg);
        }
      `}</style>
      <ImageGallery
        items={items}
        showPlayButton={showPlayButton}
        showFullscreenButton={showFullscreenButton}
        showThumbnails={showThumbnails}
        thumbnailPosition={thumbnailPosition}
        showNav={showNav}
        showBullets={showBullets}
        autoPlay={autoPlay}
        slideDuration={slideDuration}
        slideInterval={slideInterval}
        additionalClass={`${additionalClass} w-full`}
        useBrowserFullscreen={false}
        renderFullscreenButton={(onClick, isFullscreen) => {
          if (isFullscreen) {
            return (
              <button
                className="close-button"
                onClick={onClick}
                aria-label="Cerrar pantalla completa"
              />
            );
          }
          return (
            <button
              className="image-gallery-fullscreen-button"
              onClick={onClick}
              aria-label="Ver en pantalla completa"
            >
              <svg className="image-gallery-svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            </button>
          );
        }}
        renderItem={(item: ReactImageGalleryItem) => (
          <div className="relative w-full h-full">
            <Image
              src={item.original || ''}
              alt={item.originalAlt || ''}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={item.original === items[0].original}
            />
          </div>
        )}
      />
    </div>
  );
} 