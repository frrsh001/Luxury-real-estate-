"use client"

import { Check, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  whatsappNumber?: string
}

export function SuccessModal({ isOpen, onClose, title, message, whatsappNumber }: SuccessModalProps) {
  const handleWhatsApp = () => {
    if (whatsappNumber) {
      const text = encodeURIComponent("Hi, I'm interested in learning more about your luxury properties.")
      window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${text}`, "_blank")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in scale-95 duration-300">
        {/* Success Icon */}
        <div className="bg-accent/10 p-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <Check size={32} className="text-accent" strokeWidth={3} />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">{title}</h2>
          <p className="text-foreground/70 text-sm leading-relaxed mb-8">{message}</p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            {whatsappNumber && (
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Message on WhatsApp
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  )
}
