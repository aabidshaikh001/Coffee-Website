"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Coffee, Leaf, Heart, Share2, Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
   ""
// Share Modal Component
const ShareModal = ({
  isOpen,
  onClose,
  productName,
  url,
}: { isOpen: boolean; onClose: () => void; productName: string; url: string }) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const shareOptions = [
    {
      name: "Facebook",
      icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      color: "bg-sky-500",
    },
    {
      name: "WhatsApp",
      icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
      color: "bg-green-500",
    },
    {
      name: "Email",
      icon: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z",
      color: "bg-gray-600",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
         
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-medium mb-4">Share {productName}</h3>

        <div className="flex justify-center space-x-4 mb-6">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              className={`${option.color} text-white p-3 rounded-full hover:opacity-90 transition-opacity`}
              aria-label={`Share on ${option.name}`}
              onClick={() => {
                let shareUrl = ""
                switch (option.name) {
                  case "Facebook":
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                    break
                  case "Twitter":
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out ${productName}!`)}`
                    break
                  case "WhatsApp":
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out ${productName}! ${url}`)}`
                    break
                  case "Email":
                    shareUrl = `mailto:?subject=${encodeURIComponent(`Check out ${productName}!`)}&body=${encodeURIComponent(`I thought you might like this: ${url}`)}`
                    break
                }
                if (shareUrl) window.open(shareUrl, "_blank")
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d={option.icon} />
              </svg>
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-2">Or copy link</p>
          <div className="flex">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 border rounded-l-md px-3 py-2 text-sm bg-gray-50"
            />
            <button
              onClick={handleCopyLink}
              className="bg-amber-800 text-white px-4 py-2 rounded-r-md hover:bg-amber-900 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backendcoffee-production.up.railway.app/api"

export default function MenuItemPage() {
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)

        // Fetch product details
        const response = await fetch(`https://backendcoffee-production.up.railway.app/api/menu/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch product details")
        }

        const data = await response.json()
        setProduct(data)

        // Fetch related products if available
        if (data.relatedProducts && data.relatedProducts.length > 0) {
          const relatedPromises = data.relatedProducts.map((id: string) =>
            fetch(`https://backendcoffee-production.up.railway.app/api/menu/${id}`).then((res) => {
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

  // Handle like functionality
  const handleLike = () => {
    setIsLiked(!isLiked)
    // Here you could also implement API calls to save the like status
    // Example: if (isLiked) { unlikeProduct(id) } else { likeProduct(id) }
  }

  // Handle share functionality
  const handleShare = () => {
    setIsShareModalOpen(true)
  }

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
      <Header/>
      <div className="container mx-auto px-8 py-24">
        

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
                  <button
                    className={`p-2 rounded-full hover:bg-neutral-100 ${isLiked ? "text-red-500" : "text-neutral-600"}`}
                    onClick={handleLike}
                    aria-label={isLiked ? "Unlike" : "Like"}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
                    onClick={handleShare}
                    aria-label="Share"
                  >
                    <Share2 className="h-5 w-5" />
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
        {/* Share Modal */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          productName={product?.name || ""}
          url={typeof window !== "undefined" ? window.location.href : ""}
        />
      </div>
    </div>
  )
}
