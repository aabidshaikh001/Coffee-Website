"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Phone, Mail, ExternalLink, Navigation, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function LocationPage({ params }: { params: { id: string } }) {
  const [location, setLocation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:5000/api/locations/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch location details")
        }
        const data = await response.json()
        setLocation(data)
      }
      catch (err: any) {
        setError(err.message || "Failed to load location")
        console.error("Error fetching location:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLocation()
  }, [params.id])
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-800 mb-4" />
          <p>Loading location details...</p>
        </div>
      </div>
    )
  }
  
  if (error || !location) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Location Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the location you're looking for.</p>
          <Link href="/locations" className="inline-flex items-center text-amber-800 hover:text-amber-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/locations" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Locations
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={location.image || "/placeholder.svg"}
              alt={`${location.name} location`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-serif">{location.name}</h1>
              <p className="text-white/80">{location.subtitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1 space-y-6">
              <div>
                <h2 className="text-xl font-serif mb-4">Address</h2>
                <p className="flex items-start text-neutral-700">
                  <Navigation className="h-5 w-5 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                  <span>{location.address}</span>
                </p>
                <p className="text-neutral-600 ml-7 text-sm">{location.subtext}</p>
              </div>

              <div>
                <h2 className="text-xl font-serif mb-4">Hours</h2>
                <p className="flex items-start text-neutral-700">
                  <Clock className="h-5 w-5 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                  <span>{location.hours}</span>
                </p>
                {location.hours2 && (
                  <p className="text-neutral-700 ml-7">{location.hours2}</p>
                )}
                {location.note && (
                  <p className="text-amber-800 font-medium ml-7 mt-2">{location.note}</p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-serif mb-4">Contact</h2>
                <p className="flex items-center text-neutral-700 mb-2">
                  <Phone className="h-5 w-5 mr-2 text-amber-800" />
                  <a href={`tel:${location.phone.replace(/\D/g, '')}`} className="hover:text-amber-800 transition-colors">
                    {location.phone}
                  </a>
                </p>
                {location.email && (
                  <p className="flex items-center text-neutral-700">
                    <Mail className="h-5 w-5 mr-2 text-amber-800" />
                    <a href={`mailto:${location.email}`} className="hover:text-amber-800 transition-colors">
                      {location.email}
                    </a>
                  </p>
                )}
              </div>

              {location.amenities && location.amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-serif mb-4">Amenities</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {location.amenities.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-center text-neutral-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-800 mr-2"></span>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

             
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-serif mb-4">About This Location</h2>
                <p className="text-neutral-700 leading-relaxed">{location.description}</p>
              </div>

              <div className="h-[400px] rounded-xl overflow-hidden border shadow-sm">
                <iframe
                  src={location.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${location.name} location`}
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="flex justify-between items-center">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-800 hover:text-amber-900"
                >
                  Get directions on Google Maps
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </a>

                <a
                  href={`https://maps.apple.com/?q=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-800 hover:text-amber-900"
                >
                  Open in Apple Maps
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

