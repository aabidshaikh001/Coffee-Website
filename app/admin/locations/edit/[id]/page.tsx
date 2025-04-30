"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Plus, Minus, Loader2, Check, AlertCircle, MapPin } from 'lucide-react'

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

type LocationType = {
  id: string
  name: string
  subtitle: string
  address: string
  subtext: string
  hours: string
  hours2?: string
  note?: string
  phone: string
  email?: string
  description: string
  mapUrl: string
  image: string
  amenities: string[]
}

export default function EditLocation() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<LocationType>({
    id: "",
    name: "",
    subtitle: "",
    address: "",
    subtext: "",
    hours: "",
    hours2: "",
    note: "",
    phone: "",
    email: "",
    description: "",
    mapUrl: "",
    image: "",
    amenities: [""]
  })

  // Fetch location data
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(`${API_URL}/locations/${id}`)
        if (!res.ok) {
          throw new Error("Failed to fetch location")
        }
        const data = await res.json()

        // Set form data with fetched location
        setFormData(data)

        // Set preview image if available
        if (data.image) {
          setPreviewImage(data.image)
        }

        setIsLoading(false)
      } catch (err: any) {
        setError(err.message || "Failed to fetch location")
        console.error("Error fetching location:", err)
        setIsLoading(false)
      }
    }

    if (id) {
      fetchLocation()
    }
  }, [id])

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setImageFile(file)
  }

  // Handle amenity changes
  const handleAmenityChange = (index: number, value: string) => {
    const updatedAmenities = [...formData.amenities]
    updatedAmenities[index] = value
    setFormData({ ...formData, amenities: updatedAmenities })
  }

  // Add new amenity
  const addAmenity = () => {
    setFormData({
      ...formData,
      amenities: [...formData.amenities, ""]
    })
  }

  // Remove amenity
  const removeAmenity = (index: number) => {
    if (formData.amenities.length > 1) {
      const updatedAmenities = formData.amenities.filter((_, i) => i !== index)
      setFormData({ ...formData, amenities: updatedAmenities })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      let base64Image: string | null = null

      // Convert image file to base64 if available
      if (imageFile) {
        const reader = new FileReader()
        const fileLoaded = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
        })
        reader.readAsDataURL(imageFile)
        base64Image = await fileLoaded
      }

      // Construct payload
      const payload = {
        ...formData,
        image: base64Image || formData.image // Use new image or keep existing one
      }

      const response = await fetch(`${API_URL}/locations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update location")
      }

      alert("Location updated successfully!")
      router.push("/admin/locations")
    } catch (err: any) {
      setError(err.message || "Failed to update location")
      console.error("Error updating location:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-amber-800" />
        <span className="ml-2">Loading location data...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center mb-8">
        <Link href="/admin/locations" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Edit Location</h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Location Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-neutral-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  id="subtitle"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g., Downtown Flagship Store"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Location Image</h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Upload Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-neutral-400" />
                    <div className="flex text-sm text-neutral-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-amber-800 hover:text-amber-900"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Preview</label>
                <div className="mt-1 border border-neutral-300 rounded-md overflow-hidden h-48 bg-neutral-100 flex items-center justify-center">
                  {previewImage ? (
                    <Image
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-neutral-400 text-sm">No image selected</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Address & Hours</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full street address"
                />
              </div>

              <div>
                <label htmlFor="subtext" className="block text-sm font-medium text-neutral-700 mb-1">
                  Address Subtext
                </label>
                <input
                  type="text"
                  id="subtext"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.subtext}
                  onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                  placeholder="e.g., Near Central Park, 2nd Floor"
                />
              </div>

              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-neutral-700 mb-1">
                  Hours <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="hours"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="e.g., Mon-Fri: 7am-7pm"
                />
              </div>

              <div>
                <label htmlFor="hours2" className="block text-sm font-medium text-neutral-700 mb-1">
                  Additional Hours
                </label>
                <input
                  type="text"
                  id="hours2"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.hours2 || ""}
                  onChange={(e) => setFormData({ ...formData, hours2: e.target.value })}
                  placeholder="e.g., Sat-Sun: 8am-6pm"
                />
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-neutral-700 mb-1">
                  Special Note
                </label>
                <input
                  type="text"
                  id="note"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.note || ""}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="e.g., Closed on public holidays"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g., (123) 456-7890"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g., location@example.com"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Map Information</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="mapUrl" className="block text-sm font-medium text-neutral-700 mb-1">
                  Google Maps Embed URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="mapUrl"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                  placeholder="e.g., https://www.google.com/maps/embed?pb=..."
                />
                <p className="mt-1 text-xs text-neutral-500">
                  Get this from Google Maps by clicking "Share" and then "Embed a map"
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Description</h2>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                Location Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                required
                rows={4}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of this location"
              ></textarea>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Amenities</h2>
              <Button type="button" variant="outline" size="sm" onClick={addAmenity}>
                <Plus className="mr-1 h-3 w-3" />
                Add Amenity
              </Button>
            </div>

            <div className="space-y-3">
              {formData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className={index === 0 ? "block text-sm font-medium text-neutral-700 mb-1" : "sr-only"}>
                      Amenity
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                      value={amenity}
                      onChange={(e) => handleAmenityChange(index, e.target.value)}
                      placeholder="e.g., Free WiFi, Outdoor Seating"
                    />
                  </div>

                  <div className={index === 0 ? "mt-7" : ""}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 text-red-600"
                      onClick={() => removeAmenity(index)}
                      disabled={formData.amenities.length <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 flex justify-end gap-3">
            <Link href="/admin/locations">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="bg-amber-800 hover:bg-amber-900" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Update Location
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
