"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Plus, Minus, Loader2, Check, AlertCircle } from "lucide-react"

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backendcoffee-production.up.railway.app/api"

type MenuItem = {
  id: string
  name: string
  category: string
  description: string
  longDescription: string
  status: string
  prices: { size: string; price: string }[]
  ingredients: string[]
  nutritionalInfo: string
  featured: boolean
  image: string
}

export default function EditMenuItem() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<MenuItem>({
    name: "",
    id: "",
    category: "coffee",
    description: "",
    longDescription: "",
    status: "active",
    prices: [{ size: "", price: "" }],
    ingredients: [""],
    nutritionalInfo: "",
    featured: false,
    image: "",
  })

  // Fetch menu item data
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await fetch(`${API_URL}/menu/${id}`)
        if (!res.ok) {
          throw new Error("Failed to fetch menu item")
        }
        const data = await res.json()

        // Set form data with fetched item
        setFormData(data)

        // Set preview image if available
        if (data.image) {
          setPreviewImage(data.image)
        }

        setIsLoading(false)
      } catch (err: any) {
        setError(err.message || "Failed to fetch menu item")
        console.error("Error fetching menu item:", err)
        setIsLoading(false)
      }
    }

    if (id) {
      fetchMenuItem()
    }
  }, [id])

  // Handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }

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

  // Handle price changes
  const handlePriceChange = (index: number, field: "size" | "price", value: string) => {
    const updatedPrices = [...formData.prices]
    updatedPrices[index] = { ...updatedPrices[index], [field]: value }
    setFormData({ ...formData, prices: updatedPrices })
  }

  // Add new price option
  const addPriceOption = () => {
    setFormData({
      ...formData,
      prices: [...formData.prices, { size: "", price: "" }],
    })
  }

  // Remove price option
  const removePriceOption = (index: number) => {
    if (formData.prices.length > 1) {
      const updatedPrices = formData.prices.filter((_, i) => i !== index)
      setFormData({ ...formData, prices: updatedPrices })
    }
  }

  // Handle ingredient changes
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...formData.ingredients]
    updatedIngredients[index] = value
    setFormData({ ...formData, ingredients: updatedIngredients })
  }

  // Add new ingredient
  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    })
  }

  // Remove ingredient
  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index)
      setFormData({ ...formData, ingredients: updatedIngredients })
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
        image: base64Image || formData.image, // Use new image or keep existing one
      }

      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update menu item")
      }

      alert("Menu item updated successfully!")
      router.push("/admin/menu")
    } catch (err: any) {
      setError(err.message || "Failed to update menu item")
      console.error("Error updating menu item:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-amber-800" />
        <span className="ml-2">Loading menu item...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center mb-8">
        <Link href="/admin/menu" className="mr-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu Items
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Edit Menu Item</h1>
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
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.name}
                  onChange={handleNameChange}
                />
              </div>

              <div>
                <label htmlFor="id" className="block text-sm font-medium text-neutral-700 mb-1">
                  Item ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="id"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800 bg-neutral-50"
                  value={formData.id}
                  readOnly
                />
                <p className="mt-1 text-xs text-neutral-500">ID cannot be changed</p>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="coffee">Coffee</option>
                  <option value="food">Food</option>
                  <option value="beverage">Beverage</option>
                  <option value="pastry">Pastry</option>
                  <option value="other">Other</option>
                </select>
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
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
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
                  Featured Item (will appear on homepage)
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Item Image</h2>

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
            <h2 className="text-lg font-medium mb-4">Description</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="description"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description for menu listings"
                />
              </div>

              <div>
                <label htmlFor="longDescription" className="block text-sm font-medium text-neutral-700 mb-1">
                  Long Description
                </label>
                <textarea
                  id="longDescription"
                  rows={4}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  placeholder="Detailed description for the product page"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Pricing</h2>
              <Button type="button" variant="outline" size="sm" onClick={addPriceOption}>
                <Plus className="mr-1 h-3 w-3" />
                Add Price Option
              </Button>
            </div>

            <div className="space-y-3">
              {formData.prices.map((price, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className={index === 0 ? "block text-sm font-medium text-neutral-700 mb-1" : "sr-only"}>
                      Size/Option
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                      value={price.size}
                      onChange={(e) => handlePriceChange(index, "size", e.target.value)}
                      placeholder="e.g., Small, Regular, etc."
                    />
                  </div>

                  <div className="flex-1">
                    <label className={index === 0 ? "block text-sm font-medium text-neutral-700 mb-1" : "sr-only"}>
                      Price
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                      value={price.price}
                      onChange={(e) => handlePriceChange(index, "price", e.target.value)}
                      placeholder="e.g., $4.50"
                    />
                  </div>

                  <div className={index === 0 ? "mt-7" : ""}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 text-red-600"
                      onClick={() => removePriceOption(index)}
                      disabled={formData.prices.length <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Ingredients</h2>
              <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                <Plus className="mr-1 h-3 w-3" />
                Add Ingredient
              </Button>
            </div>

            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className={index === 0 ? "block text-sm font-medium text-neutral-700 mb-1" : "sr-only"}>
                      Ingredient
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder="e.g., 100% Arabica coffee beans"
                    />
                  </div>

                  <div className={index === 0 ? "mt-7" : ""}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 text-red-600"
                      onClick={() => removeIngredient(index)}
                      disabled={formData.ingredients.length <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium mb-4">Nutritional Information</h2>

            <div>
              <label htmlFor="nutritionalInfo" className="block text-sm font-medium text-neutral-700 mb-1">
                Nutritional Info
              </label>
              <input
                type="text"
                id="nutritionalInfo"
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                value={formData.nutritionalInfo}
                onChange={(e) => setFormData({ ...formData, nutritionalInfo: e.target.value })}
                placeholder="e.g., Serving Size: 12 oz (360ml) | Calories: 120 | Protein: 8g | Fat: 7g"
              />
            </div>
          </div>

          <div className="p-6 flex justify-end gap-3">
            <Link href="/admin/menu">
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
                  Update Menu Item
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
