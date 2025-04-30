"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, MapPin, Phone, Mail, Loader2 } from "lucide-react"

interface Location {
  _id: string
  id: string
  name: string
  subtitle: string
  address: string
  subtext: string
  hours: string
  hours2: string
  phone: string
  email: string
  description: string
  amenities: string[]
  status: string
  featured: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export const Footer = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("https://backendcoffee-production.up.railway.app/api/locations")
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        const data = await res.json()
        if (Array.isArray(data)) {
          setLocations(data)
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error)
        setError("Unable to load location information. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  const contactLocation = locations[0] // Using first location for contact info

  return (
    <footer className="bg-white py-16 border-t border-stone-100 relative overflow-hidden" role="contentinfo">
      <div className="absolute -top-24 right-0 w-64 h-64 bg-amber-50 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50 rounded-full opacity-20 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-amber-700 animate-spin" />
            <span className="ml-2 text-stone-600">Loading location information...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-stone-600">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            {/* Brand Section - Always present */}
            <div className="md:col-span-1">
              <Link
                href="/"
                className="text-2xl font-serif tracking-wide text-stone-800 mb-4 inline-block"
                aria-label="Umber Coffee Home"
              >
                umber
              </Link>
              <p className="text-stone-600 mt-4 mb-6">
              Every cup tells a story—earthy, rich, and unapologetically honest.              </p>
              <div className="flex space-x-4">
                {[
                
                  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/helloumbercoffee/" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href || "#"}
                    className="text-stone-600 hover:text-amber-700 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    aria-label={`Visit our ${item.label} page`}
                  >
                    <item.Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Locations Section */}
            {locations.length > 0 ? (
              <div className="md:col-span-1">
                <h3 className="font-medium text-stone-800 mb-4">{locations[0].name}</h3>
                <p className="flex items-start text-stone-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-amber-700 flex-shrink-0 mt-1" />
                  <span>
                    {locations[0].address}
                    <span className="block text-stone-500 text-sm">{locations[0].subtext}</span>
                  </span>
                </p>
                <p className="text-stone-500 text-sm ml-6 mb-1">{locations[0].hours}</p>
                {locations[0].hours2 && <p className="text-stone-500 text-sm ml-6">{locations[0].hours2}</p>}
              </div>
            ) : (
              <div className="md:col-span-1">
                <h3 className="font-medium text-stone-800 mb-4">Our Location</h3>
                <p className="text-stone-600">Location information coming soon.</p>
              </div>
            )}

            {/* Contact Section - Always present */}
            <div className="md:col-span-1">
              <h3 className="font-medium text-stone-800 mb-4">Contact</h3>
              <div className="space-y-3">
                <p className="flex items-center text-stone-600">
                  <Phone className="h-4 w-4 mr-2 text-amber-700 flex-shrink-0" />
                  {contactLocation?.phone ? (
                    <a
                      href={`tel:${contactLocation.phone.replace(/\s+/g, "")}`}
                      className="hover:text-amber-700 transition-colors"
                    >
                      {contactLocation.phone}
                    </a>
                  ) : (
                    <span className="text-stone-500">Coming soon</span>
                  )}
                </p>

                <p className="flex items-center text-stone-600">
                  <Mail className="h-4 w-4 mr-2 text-amber-700 flex-shrink-0" />
                  {contactLocation?.email ? (
                    <a href={`mailto:${contactLocation.email}`} className="hover:text-amber-700 transition-colors">
                      {contactLocation.email}
                    </a>
                  ) : (
                    <span className="text-stone-500">Coming soon</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section - Always present */}
        <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 md:mb-0" aria-label="Footer navigation">
            {["About", "Contact Us", "Locations", "Menu", "Privacy Policy"].map((item) => (
              <motion.div key={item} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-amber-700 transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} by Umber Coffee</p>
        </div>
      </div>
    </footer>
  )
}
