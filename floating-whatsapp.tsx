"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const PAGES_WITH_WHATSAPP = ["/properties", "/contact", "/consultation", "/faqs", "/testimonials"]

export function FloatingWhatsApp() {
  const pathname = usePathname()

  // Show floating WhatsApp on specific pages
  const shouldShow =
    PAGES_WITH_WHATSAPP.some((page) => pathname.startsWith(page)) || pathname.startsWith("/properties/")

  if (!shouldShow) return null

  return (
    <Link
      href="https://wa.me/2348155931801?text=Hello%20I%20would%20like%20to%20inquire%20about%20luxury%20properties"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
    >
      <MessageCircle size={28} />
    </Link>
  )
}
