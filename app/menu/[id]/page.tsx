"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Coffee, Leaf, Heart, Share2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backendcoffee.onrender.com/api"

export default function MenuItemPage() {
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
 


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)

        // Fetch product details
        const response = await fetch(`https://backendcoffee.onrender.com/api/menu/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch product details")
        }

        const data = await response.json()
        setProduct(data)

        // Fetch related products if available
        if (data.relatedProducts && data.relatedProducts.length > 0) {
          const relatedPromises = data.relatedProducts.map((id: string) =>
            fetch(`https://backendcoffee.onrender.com/api/menu/${id}`).then((res) => {
              if (!res.ok) throw new Error(`Failed to fetch related product: ${id}`)
              return res.json()
            }),
          )

          const relatedData = await Promise.all(relatedPromises)
          setRelatedProducts(relatedData)
        }
      } catch (err: any) {
        setError(err.message || "Failed to load product")
        console.error("Error fetching product:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-800 mb-4" />
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link href="/menu" className="inline-flex items-center text-amber-800 hover:text-amber-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/menu" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl md:text-4xl font-serif">{product.name}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-neutral-100">
                    <Heart className="h-5 w-5 text-neutral-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-neutral-100">
                    <Share2 className="h-5 w-5 text-neutral-600" />
                  </button>
                </div>
              </div>

              <p className="text-xl text-amber-800 font-medium mb-4">{product.priceRange}</p>

              <p className="text-neutral-700 mb-6">{product.longDescription}</p>

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Sizes & Prices</h2>
                <div className="space-y-1">
                  {product.prices &&
                    product.prices.map((price: any, index: number) => (
                      <div key={index} className="flex justify-between text-neutral-700">
                        <span>{price.size}</span>
                        <span>{price.price}</span>
                      </div>
                    ))}
                </div>
              </div>

              {product.category === "coffee" && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">Customizations</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Milk Options</h3>
                      <select className="w-full border rounded-md p-2">
                        <option>Whole Milk</option>
                        <option>Oat Milk (+$0.75)</option>
                        <option>Almond Milk (+$0.75)</option>
                        <option>Soy Milk (+$0.75)</option>
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Extras</h3>
                      <select className="w-full border rounded-md p-2">
                        <option>None</option>
                        <option>Extra Shot (+$1.00)</option>
                        <option>Vanilla Syrup (+$0.75)</option>
                        <option>Caramel Syrup (+$0.75)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

           

              <div className="border-t pt-6">
                <div className="mb-4">
                  <h2 className="text-lg font-medium mb-2 flex items-center">
                    {product.category === "coffee" ? (
                      <Coffee className="h-4 w-4 mr-2 text-amber-800" />
                    ) : (
                      <Leaf className="h-4 w-4 mr-2 text-amber-800" />
                    )}
                    Ingredients
                  </h2>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1">
                    {product.ingredients &&
                      product.ingredients.map((ingredient: string, index: number) => <li key={index}>{ingredient}</li>)}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-medium mb-2">Nutritional Information</h2>
                  <p className="text-neutral-700">{product.nutritionalInfo}</p>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    href={`/menu/${relatedProduct.id}`}
                    key={relatedProduct.id}
                    className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{relatedProduct.name}</h3>
                      <p className="text-amber-800">{relatedProduct.priceRange}</p>
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

