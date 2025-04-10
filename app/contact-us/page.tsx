"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError("")

    try {
      const response = await fetch("https://backendcoffee.onrender.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Something went wrong")

      setSuccess(true)
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
    } catch (err: any) {
      setError(err.message || "Failed to submit the form.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-serif mb-12 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <p className="text-amber-800 mb-6">
              * Please note - we do not take reservations at this time (walk-in only). Thank you!
            </p>

            <h2 className="text-2xl font-serif mb-6">Visit:</h2>
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl mb-2 font-medium">umber Downtown (Manhattan)</h3>
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                  <span>130 Franklin St. New York, NY 10013</span>
                </p>
                <p className="text-neutral-600 ml-6 mb-1">(Between West Broadway and Varick)</p>
                <p className="text-neutral-700 ml-6">Open daily from 8am-5pm</p>
              </div>

              <div>
                <h3 className="text-xl mb-2 font-medium">umber Express (Jersey City)</h3>
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                  <span>198 Van Vorst St. Jersey City, NJ 07302</span>
                </p>
                <p className="text-neutral-600 ml-6 mb-1">(Downtown Jersey City)</p>
                <p className="text-neutral-700 ml-6">Open daily 7am-6pm</p>
                <p className="text-amber-800 font-medium ml-6 mt-1">**LIMITED MENU OPTIONS**</p>
              </div>

              <div>
                <h3 className="text-xl mb-2 font-medium">umber Uptown (Weehawken)</h3>
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                  <span>2812 Palisade Ave Weehawken NJ 07086</span>
                </p>
                <p className="text-neutral-600 ml-6 mb-1">(corner of Palisade Ave & 32nd St)</p>
                <p className="text-neutral-700 ml-6">Open Monday-Friday 7 am to 5 pm</p>
                <p className="text-neutral-700 ml-6">(*Kitchen opens at 8 am) / Sat & Sun 8 am to 5 pm</p>
              </div>
            </div>

            <h2 className="text-2xl font-serif mb-4">Call:</h2>
            <div className="space-y-2 mb-8">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-amber-800" />
                <span className="font-medium">Manhattan (Downtown):</span> 212.431.5200
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-amber-800" />
                <span className="font-medium">Jersey City:</span> 201.431.1233
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-amber-800" />
                <span className="font-medium">Weehawken:</span> 201.389.4025
              </p>
            </div>

            <h2 className="text-2xl font-serif mb-4">Connect:</h2>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="text-neutral-800 hover:text-amber-800">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-800 hover:text-amber-800">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="mailto:info@umber.coffee" className="text-neutral-800 hover:text-amber-800">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Send your message and we will get back to you:</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input id="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange}
                  className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800" />
                <input id="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange}
                  className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input id="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}
                  className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800" />
                <input id="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange}
                  className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800" />
              </div>

              <textarea
                id="message"
                placeholder="Type your message here..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800"
              ></textarea>

              <div className="text-center">
                <Button className="bg-amber-800 hover:bg-amber-900 text-white px-8" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Submit"}
                </Button>
              </div>

              {success && <p className="text-green-600 text-center">Thank you! We'll get back to you soon.</p>}
              {error && <p className="text-red-600 text-center">{error}</p>}
            </form>

            <div className="mt-8 relative h-64">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Eub7NeqNEpaYUYJLt36LbRur2WzVuU.png"
                alt="Coffee beans being roasted"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

