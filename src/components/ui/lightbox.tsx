'use client'

import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface LightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrevious()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    },
    [isOpen, onClose, onNext, onPrevious]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-onyx/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Hexagon Pattern Background */}
      <div className="absolute inset-0 bg-hexagon opacity-5" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 rounded-full bg-luxury-gold/20 p-3 text-white backdrop-blur-md transition-all hover:bg-luxury-gold/30 hover:scale-110"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-luxury-gold/20 p-3 text-white backdrop-blur-md transition-all hover:bg-luxury-gold/30 hover:scale-110 disabled:opacity-50"
            disabled={currentIndex === 0}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-luxury-gold/20 p-3 text-white backdrop-blur-md transition-all hover:bg-luxury-gold/30 hover:scale-110 disabled:opacity-50"
            disabled={currentIndex === images.length - 1}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Image Container */}
      <div
        className="relative flex h-full w-full items-center justify-center p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          <Image
            src={currentImage}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-luxury-gold/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-16 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-luxury-onyx/50 p-2 backdrop-blur-md">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                const diff = index - currentIndex
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) onNext()
                } else if (diff < 0) {
                  for (let i = 0; i < Math.abs(diff); i++) onPrevious()
                }
              }}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all hover:scale-110 ${
                index === currentIndex
                  ? 'border-luxury-gold shadow-lg shadow-luxury-gold/50'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
