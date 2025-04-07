"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Coffee, ArrowLeft, Loader2 } from "lucide-react"

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backendcoffee.onrender.com/api"

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://backendcoffee.onrender.com/api/menu`)

        if (!response.ok) {
          throw new Error("Failed to fetch menu items")
        }

        const data = await response.json()
        setMenuItems(data)
      } catch (err: any) {
        setError(err.message || "Failed to load menu items")
        console.error("Error fetching menu items:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  // Group menu items by category
  const coffeeItems = menuItems.filter((item: any) => item.category === "coffee" && item.status === "active")
  const foodItems = menuItems.filter((item: any) => item.category === "food" && item.status === "active")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-800 mb-4" />
          <p>Loading menu items...</p>
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
          <h2 className="text-xl font-medium mb-2">Failed to load menu</h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-amber-800 hover:bg-amber-900">
            Try Again
          </Button>
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

        <h1 className="text-4xl font-serif mb-12 text-center">Our Menu</h1>

        <div className="max-w-6xl mx-auto">
          {coffeeItems.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-serif mb-8 flex items-center text-amber-800">
                <Coffee className="mr-2 h-5 w-5" />
                Coffee
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coffeeItems.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`/menu/${item.id}`}
                    className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg?height=400&width=600"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-medium">{item.name}</h3>
                        <span className="text-amber-800 font-medium">{item.priceRange}</span>
                      </div>
                      <p className="text-neutral-600 text-sm mb-2">{item.description}</p>
                      {item.prices && item.prices.length > 0 && (
                        <div className="text-sm text-neutral-500">
                          {item.prices.map((price: any, index: number) => (
                            <span key={index} className="block">
                              {price.size}: {price.price}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {foodItems.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif mb-8 text-amber-800">Food</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {foodItems.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`/menu/${item.id}`}
                    className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg?height=400&width=600"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-medium">{item.name}</h3>
                        <span className="text-amber-800 font-medium">{item.priceRange}</span>
                      </div>
                      <p className="text-neutral-600 text-sm">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

       
        </div>
      </div>
    </div>
  )
}

