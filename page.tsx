"use client"

import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestimonialsSection } from "@/components/testimonials-section"
import Link from "next/link"
import { propertiesData } from "@/lib/properties-data"
import { Hero3DAnimation } from "@/components/3d-hero-animation"
import { Properties3DCarousel } from "@/components/3d-properties-carousel"
import { AIChatbot } from "@/components/ai-chatbot"

export default function Home() {
  const featuredProperties = propertiesData.slice(0, 3)

  return (
    <div className="bg-background text-foreground">
      <Header />

      {/* Hero Section with 3D Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=luxury-nigerian-villa-sunset)",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <Hero3DAnimation />

        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-cream mb-6 text-pretty drop-shadow-lg">
            Luxury Living Redefined
          </h1>
          <p className="text-cream/90 text-xl md:text-2xl mb-8 font-light drop-shadow-md">
            Discover extraordinary properties in Nigeria's most prestigious neighborhoods
          </p>
          <Link href="/properties">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
              Explore Properties
            </Button>
          </Link>
        </div>
      </section>

      {/* About Agent Section */}
      <section className="py-20 md:py-32 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/professional-real-estate-agent-portrait.jpg"
                alt="Real Estate Agent"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
                Your Premier Real Estate Partner
              </h2>
              <p className="text-primary/70 text-lg mb-6 leading-relaxed">
                With over 15 years of experience in Nigeria's luxury real estate market, I specialize in connecting
                discerning buyers with their dream properties. My expert knowledge of the most coveted locations ensures
                you find the perfect home.
              </p>
              <p className="text-primary/70 text-lg mb-8 leading-relaxed">
                From sprawling estates in Ikoyi to contemporary penthouses in Victoria Island, I provide personalized
                service and market expertise that sets us apart.
              </p>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary text-center mb-4">
            Featured Collections
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Handpicked luxury properties exclusively for you
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
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

          <div className="text-center mt-16">
            <Link href="/properties">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg bg-transparent"
              >
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3D Carousel Section */}
      <Properties3DCarousel />

      {/* Services Section */}
      <section className="py-20 md:py-32 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary text-center mb-16">Premium Services</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Property Acquisition",
                description: "Find your perfect luxury home with personalized consultation and market expertise",
              },
              {
                title: "Investment Advisory",
                description: "Strategic guidance on high-yield property investments in prime locations",
              },
              {
                title: "Property Management",
                description: "Comprehensive management services for your investment properties",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-background p-8 rounded-lg border border-border hover:border-accent transition-colors"
              >
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 leading-relaxed">
            Schedule a consultation with us today and let's discuss your luxury real estate goals
          </p>
          <Link href="/consultation">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />

      {/* AI Chatbot - Available on home page */}
      <AIChatbot />
    </div>
  )
}
