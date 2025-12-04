import { Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PropertyCardProps {
  title: string
  location: string
  price: string
  image: string
  beds: number
  baths: number
  area: number
  propertyId?: string
}

export function PropertyCard({ title, location, price, image, beds, baths, area, propertyId }: PropertyCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg mb-4 h-80">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button className="absolute top-4 right-4 bg-background/80 hover:bg-background p-2 rounded-full transition-all">
          <Heart size={20} className="text-accent" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-accent font-serif text-2xl font-bold">{price}</p>
        </div>
      </div>

      <h3 className="font-serif text-xl font-bold text-primary mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{location}</p>

      <div className="flex gap-6 mb-4 text-sm text-foreground/70">
        <span>{beds} Bedrooms</span>
        <span>{baths} Bathrooms</span>
        <span>{area.toLocaleString()} sqft</span>
      </div>

      <Link href={`/properties/${propertyId || "1"}`}>
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">View Details</Button>
      </Link>
    </div>
  )
}
