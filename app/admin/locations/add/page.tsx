"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Plus, Minus, Loader2, Check, MapPin, AlertCircle } from "lucide-react"

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backendcoffee.onrender.com/api"

export default function AddLocation() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    subtitle: "",
    address: "",
    subtext: "",
    hours: "",
    hours2: "",
    note: "",
    phone: "",
    email: "",
    coordinates: "",
    mapUrl: "",
    description: "",
    status: "active",
    amenities: [""],
    featured: false,
  })

  // Get auth token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  }

  // Generate slug/ID from name
  const generateId = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  // Handle name change and auto-generate ID
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData({
      ...formData,
      name,
      id: generateId(name),
    })
  }

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview immediately and store as base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64String = e.target?.result as string
      setPreviewImage(base64String)
    }
    reader.readAsDataURL(file)
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
      amenities: [...formData.amenities, ""],
    })
  }

  // Remove amenity
  const removeAmenity = (index: number) => {
    if (formData.amenities.length > 1) {
      const updatedAmenities = formData.amenities.filter((_, i) => i !== index)
      setFormData({ ...formData, amenities: updatedAmenities })
    }
  }

  // Generate Google Maps embed URL from coordinates
  const generateMapUrl = () => {
    if (!formData.coordinates) return

    const [lat, lng] = formData.coordinates.split(",").map((coord) => coord.trim())
    if (!lat || !lng) return

    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcke01hdGgucm91bmQobGF0ICogNjApfSdOICR7TWF0aC5yb3VuZChsbmcgKiA2MCl9J0U!5e0!3m2!1sen!2sus!4v1712400000000!5m2!1sen!2sus`

    setFormData({
      ...formData,
      mapUrl,
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
     
      // Create the location data object with the image included
      const locationData = {
        ...formData,
        image: previewImage || "/placeholder.svg", // Include the base64 image string directly
      }

      // Submit to API
      const response = await fetch(`${API_URL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(locationData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add location")
      }

      // Show success message
      alert("Location added successfully!")

      // Redirect to locations list
      router.push("/admin/locations")
    } catch (err: any) {
      setError(err.message || "Failed to add location")
      console.error("Error adding location:", err)
      setIsSubmitting(false)
    }
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
        <h1 className="text-2xl font-semibold">Add New Location</h1>
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
                  onChange={handleNameChange}
                  placeholder="e.g., Downtown Manhattan"
                />
              </div>

              <div>
                <label htmlFor="id" className="block text-sm font-medium text-neutral-700 mb-1">
                  Location ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="id"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800 bg-neutral-50"
                  value={formData.id}
                  readOnly
                />
                <p className="mt-1 text-xs text-neutral-500">Auto-generated from name</p>
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
                  placeholder="e.g., TriBeCa"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="coming-soon">Coming Soon</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  className="h-4 w-4 text-amber-800 focus:ring-amber-800 border-neutral-300 rounded"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-neutral-700">
                  Featured Location (will appear on homepage)
                </label>
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
                          name="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageSelect}
                          ref={fileInputRef}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 5MB</p>
                    {previewImage && <p className="text-xs text-green-600 mt-2">✓ Image selected</p>}
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
                    <p className="text-neutral-400 text-sm">No image uploaded</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Address & Contact</h2>

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
                  placeholder="e.g., 130 Franklin St. New York, NY 10013"
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
                  placeholder="e.g., (Between West Broadway and Varick)"
                />
              </div>

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
                  placeholder="e.g., 212.431.5200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g., manhattan@aroma.coffee"
                />
              </div>

              <div>
                <label htmlFor="coordinates" className="block text-sm font-medium text-neutral-700 mb-1">
                  Map Coordinates
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coordinates"
                    className="w-full border border-neutral-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                    value={formData.coordinates}
                    onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                    placeholder="e.g., 40.7165,-74.0070"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-l-none border-l-0"
                    onClick={generateMapUrl}
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Generate Map
                  </Button>
                </div>
                <p className="mt-1 text-xs text-neutral-500">Format: latitude,longitude</p>
              </div>

              <div>
                <label htmlFor="mapUrl" className="block text-sm font-medium text-neutral-700 mb-1">
                  Map Embed URL
                </label>
                <input
                  type="text"
                  id="mapUrl"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                  placeholder="Google Maps embed URL"
                />
                <p className="mt-1 text-xs text-neutral-500">
                  Will be auto-generated from coordinates, or you can paste a custom embed URL
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Hours & Notes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  placeholder="e.g., Open daily from 8am-5pm"
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
                  value={formData.hours2}
                  onChange={(e) => setFormData({ ...formData, hours2: e.target.value })}
                  placeholder="e.g., (*Kitchen opens at 8 am) / Sat & Sun 8 am to 5 pm"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="note" className="block text-sm font-medium text-neutral-700 mb-1">
                  Special Note
                </label>
                <input
                  type="text"
                  id="note"
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="e.g., **LIMITED MENU OPTIONS**"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Description</h2>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                Location Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this location, its atmosphere, and unique features..."
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
                      placeholder="e.g., Free Wi-Fi, Outdoor Seating, etc."
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
                  Saving...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save Location
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

