"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Chioma Okonkwo",
    title: "Business Executive",
    content:
      "Working with this agent was an absolute pleasure. They understood exactly what I was looking for and helped me find the perfect penthouse in Victoria Island. Highly professional and attentive to every detail.",
    rating: 5,
  },
  {
    name: "Tunde Bello",
    title: "Real Estate Investor",
    content:
      "I've invested in multiple properties through this agent's guidance. Their market knowledge and investment advisory are unparalleled. They've helped me build a strong property portfolio with excellent returns.",
    rating: 5,
  },
  {
    name: "Zainab Hassan",
    title: "International Client",
    content:
      "As an international buyer, I was worried about the process. This agent made everything seamless, handling all documentation and legal requirements. Highly recommended for anyone buying from abroad.",
    rating: 5,
  },
  {
    name: "Seun Adeyemi",
    title: "Corporate Manager",
    content:
      "The selection of properties available and the level of professionalism is outstanding. They helped me secure a luxury estate at a great price. Best real estate agent in Lagos!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary text-center mb-4">Client Testimonials</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Trusted by hundreds of satisfied clients across Nigeria
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-background p-8 rounded-lg border border-border hover:border-accent transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, j) => (
                    <Star key={j} size={16} className="fill-accent text-accent" />
                  ))}
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-foreground/70 mb-6 text-lg">Ready to find your dream luxury property?</p>
          <Link href="/consultation">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
              Schedule Your Consultation Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
