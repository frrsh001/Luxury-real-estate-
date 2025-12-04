"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <section className="relative">
      <div className="relative h-96 md:h-screen w-full">
        <img src={images[selectedImage] || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-6 right-6 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
        >
          <Heart size={24} className={isFavorite ? "fill-accent text-accent" : "text-primary"} />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-6 right-6 flex gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img || "/placeholder.svg"} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
