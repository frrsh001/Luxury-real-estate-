"use client"

import { PropertyCarousel } from "@/components/property-carousel"
import { propertiesData } from "@/lib/properties-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FeaturedPropertiesSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-4 animate-fade-in">
            Featured Collections
          </h2>
          <p className="text-center text-muted-foreground text-lg animate-slide-in-bottom">
            Handpicked luxury properties exclusively for you
          </p>
        </div>

        <PropertyCarousel properties={propertiesData} autoplay={true} autoplayDelay={6000} />

        <div className="text-center mt-16">
          <Link href="/properties">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg bg-transparent animate-fade-in"
            >
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
