import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">LUXURY ESTATES</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your premier destination for luxury real estate in Nigeria's most coveted neighborhoods.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/properties" className="hover:text-accent transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-accent transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-accent transition-colors">
                  Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+234 815 593 1801</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>ekanezemonday@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 Luxury Estates Nigeria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
