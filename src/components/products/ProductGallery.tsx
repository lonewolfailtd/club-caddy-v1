'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { Lightbox } from '@/components/ui/lightbox'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle empty or invalid images array
  const validImages = Array.isArray(images) && images.length > 0
    ? images
    : ['/images/products/cart01.jpg']

  const currentImage = validImages[selectedImageIndex]

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev < validImages.length - 1 ? prev + 1 : prev
    )
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-luxury-platinum bg-luxury-pearl shadow-2xl">
        {/* Hexagon Pattern Background */}
        <div className="absolute inset-0 bg-hexagon opacity-5" />

        {/* Main Image */}
        <div
          className="relative h-full w-full cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={currentImage}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            fill
            className={`object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }
                : undefined
            }
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Zoom Indicator */}
        <div className="absolute right-4 top-4 rounded-full bg-luxury-gold/20 p-3 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-5 w-5" />
        </div>

        {/* Navigation Arrows for Main Image */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              disabled={selectedImageIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-luxury-onyx/50 p-3 text-white backdrop-blur-md opacity-0 transition-all hover:bg-luxury-onyx/70 hover:scale-110 group-hover:opacity-100 disabled:opacity-30"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              disabled={selectedImageIndex === validImages.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-luxury-onyx/50 p-3 text-white backdrop-blur-md opacity-0 transition-all hover:bg-luxury-onyx/70 hover:scale-110 group-hover:opacity-100 disabled:opacity-30"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Gold Accent Border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-luxury-gold/20" />
      </div>

      {/* Thumbnail Navigation */}
      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-luxury">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${
                index === selectedImageIndex
                  ? 'border-luxury-gold shadow-lg shadow-luxury-gold/50 scale-105'
                  : 'border-luxury-platinum hover:border-luxury-gold/50'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />

              {/* Active Indicator */}
              {index === selectedImageIndex && (
                <div className="absolute inset-0 bg-luxury-gold/20 backdrop-blur-[1px]" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="text-center text-sm text-gray-600">
          Image {selectedImageIndex + 1} of {validImages.length}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={validImages}
        currentIndex={selectedImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={() => {
          if (selectedImageIndex < validImages.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1)
          }
        }}
        onPrevious={() => {
          if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1)
          }
        }}
      />
    </div>
  )
}
