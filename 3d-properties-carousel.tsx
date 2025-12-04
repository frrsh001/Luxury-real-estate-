"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { propertiesData } from "@/lib/properties-data"

export function Properties3DCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const itemsPerView = 3

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (propertiesData.length - itemsPerView + 1))
      setRotation((prev) => prev + 120)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (propertiesData.length - itemsPerView + 1))
    setRotation((prev) => prev + 120)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + (propertiesData.length - itemsPerView + 1)) % (propertiesData.length - itemsPerView + 1),
    )
    setRotation((prev) => prev - 120)
  }

  const visibleProperties = propertiesData.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <div className="py-20 md:py-32 px-6 bg-background w-full">
      <div className="w-full">
        <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary text-center mb-4">3D Experience</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">Explore luxury in interactive perspective</p>

        <div className="relative w-full">
          {/* 3D Carousel Container - Full width carousel with auto-sliding animation */}
          <div className="flex justify-center items-center gap-4 md:gap-8 mb-8 perspective py-8 px-4">
            {visibleProperties.map((property, index) => (
              <div
                key={property.id}
                className="transition-all duration-700 transform hover:scale-105"
                style={{
                  opacity: 1 - Math.abs(index - 1) * 0.3,
                  transform: `scale(${1 - Math.abs(index - 1) * 0.15}) translateZ(${(index - 1) * 50}px)`,
                }}
              >
                <PropertyCard
                  title={property.title}
                  location={property.location}
                  price={property.priceFormatted}
                  image={property.image}
                  beds={property.beds}
                  baths={property.baths}
                  area={property.area}
                  propertyId={property.id}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Carousel Indicators */}
            <div className="flex gap-3">
              {Array.from({ length: propertiesData.length - itemsPerView + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i)
                    setRotation(i * 120)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-primary w-8" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
