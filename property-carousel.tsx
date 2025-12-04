"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/lib/properties-data"

interface PropertyCarouselProps {
  properties: Property[]
  autoplay?: boolean
  autoplayDelay?: number
}

export function PropertyCarousel({ properties, autoplay = true, autoplayDelay = 5000 }: PropertyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(properties.length / 3))
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [autoplay, autoplayDelay, properties.length])

  const next = () => setCurrentIndex((prev) => (prev + 1) % Math.ceil(properties.length / 3))
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(properties.length / 3)) % Math.ceil(properties.length / 3))

  const visibleProperties = properties.slice(currentIndex * 3, (currentIndex + 1) * 3)

  return (
    <div className="relative w-full">
      <div className="grid md:grid-cols-3 gap-8">
        {visibleProperties.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            location={property.location}
            price={property.priceFormatted}
            image={property.image}
            beds={property.beds}
            baths={property.baths}
            area={property.area}
            propertyId={property.id}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-all hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-all hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${idx === currentIndex ? "bg-accent w-8" : "bg-border w-2"}`}
          />
        ))}
      </div>
    </div>
  )
}
