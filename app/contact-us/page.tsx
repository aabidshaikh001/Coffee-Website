"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Location {
  _id: string;
  id: string;
  name: string;
  subtitle: string;
  address: string;
  subtext: string;
  hours: string;
  hours2: string;
  phone: string;
  email: string;
  description: string;
  amenities: string[];
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function ContactPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("https://backendcoffee-production.up.railway.app/api/locations");
        const data = await res.json();
        if (Array.isArray(data)) {
          setLocations(data);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch("https://backendcoffee-production.up.railway.app/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Something went wrong");

      setSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to submit the form.");
    } finally {
      setLoading(false);
    }
  };

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
              {locations.map((location) => (
                <div key={location._id}>
                  <h3 className="text-xl mb-2 font-medium">{location.name}</h3>
                  <p className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                    <span>
                      {location.address}
                      <span className="block text-neutral-600 text-sm">{location.subtext}</span>
                    </span>
                  </p>
                  <p className="text-neutral-700 ml-6">{location.hours}</p>
                  {location.hours2 && <p className="text-neutral-700 ml-6">{location.hours2}</p>}
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-serif mb-4">Call:</h2>
            <div className="space-y-2 mb-8">
              {locations.map((location) => (
                <p key={location._id} className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-amber-800" />
                  <span className="font-medium">{location.name}:</span>
                  {location.phone ? (
                    <a href={`tel:${location.phone.replace(/\s+/g, '')}`} className="ml-2 hover:text-amber-800">
                      {location.phone}
                    </a>
                  ) : (
                    <span className="ml-2 text-neutral-500">Not available</span>
                  )}
                </p>
              ))}
            </div>

            <h2 className="text-2xl font-serif mb-4">Connect:</h2>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="text-neutral-800 hover:text-amber-800">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/helloumbercoffee/" className="text-neutral-800 hover:text-amber-800">
                <Instagram className="h-6 w-6" />
              </a>
              {locations[0]?.email && (
                <a href={`mailto:${locations[0].email}`} className="text-neutral-800 hover:text-amber-800">
                  <Mail className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Send your message and we will get back to you:</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800"
                  required
                />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800"
                  required
                />
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800"
                />
              </div>

              <textarea
                id="message"
                placeholder="Type your message here..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-800"
                required
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
                src="/conatact.png"
                alt="Coffee beans being roasted"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}