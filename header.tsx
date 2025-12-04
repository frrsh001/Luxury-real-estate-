"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-primary">
          LUXURY ESTATES
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/properties" className="text-foreground hover:text-accent transition-colors">
            Properties
          </Link>
          <Link href="/faqs" className="text-foreground hover:text-accent transition-colors">
            FAQs
          </Link>
          <Link href="/testimonials" className="text-foreground hover:text-accent transition-colors">
            Testimonials
          </Link>
          <Link href="/contact" className="text-foreground hover:text-accent transition-colors">
            Contact
          </Link>
          <Link href="/consultation" className="text-foreground hover:text-accent transition-colors">
            Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border p-6 flex flex-col gap-4">
          <Link href="/properties" className="text-foreground hover:text-accent">
            Properties
          </Link>
          <Link href="/faqs" className="text-foreground hover:text-accent">
            FAQs
          </Link>
          <Link href="/testimonials" className="text-foreground hover:text-accent">
            Testimonials
          </Link>
          <Link href="/contact" className="text-foreground hover:text-accent">
            Contact
          </Link>
          <Link href="/consultation" className="text-foreground hover:text-accent">
            Consultation
          </Link>
        </div>
      )}
    </header>
  )
}
