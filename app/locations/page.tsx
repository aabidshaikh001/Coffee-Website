"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowLeft, Clock, Navigation, Loader2 } from "lucide-react"

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backendcoffee-production.up.railway.app/api"

export default function LocationsPage() {
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(`${API_URL}/locations/featured`)

        if (!response.ok) {
          throw new Error("Failed to fetch locations")
        }

        const data = await response.json()
        setLocations(data)
      } catch (err: any) {
        setError(err.message || "Failed to load locations")
        console.error("Error fetching locations:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-800 mb-4" />
          <p>Loading locations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">Failed to load locations</h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-serif mb-12 text-center">Our Locations</h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {locations.map((location: any) => (
            <div
              key={location.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={`${location.name} location`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h2 className="text-xl font-serif">{location.name}</h2>
                  <p className="text-white/80 text-sm">{location.subtitle}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="flex items-start mb-2 text-stone-700">
                  <MapPin className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                  <span>{location.address}</span>
                </p>
                <p className="text-neutral-600 ml-6 mb-4 text-sm">{location.subtext}</p>

                <p className="flex items-start mb-2">
                  <Clock className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                  <span className="text-stone-700">{location.hours}</span>
                </p>
                {location.hours2 && <p className="text-neutral-700 ml-6 mb-2 text-sm">{location.hours2}</p>}
                {location.note && <p className="text-amber-800 font-medium ml-6 mb-4 text-sm">{location.note}</p>}

                <div className="mt-4 pt-4 border-t border-stone-100">
                  <Link
                    href={`/locations/${location.id}`}
                    className="inline-flex items-center text-amber-800 hover:text-amber-900 font-medium"
                  >
                    Get directions
                    <Navigation className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

