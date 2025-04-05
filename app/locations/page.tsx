import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowLeft, Clock, ExternalLink } from "lucide-react"

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-serif mb-12 text-center">Our Locations</h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ngMWF9svRW2qEVyMqAgVGVCwkEFYLJ.png"
                alt="Manhattan location"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-serif mb-4">Downtown Manhattan</h2>
              <p className="flex items-start mb-2">
                <MapPin className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                <span>130 Franklin St. New York, NY 10013</span>
              </p>
              <p className="text-neutral-600 ml-6 mb-4">(Between West Broadway and Varick)</p>

              <p className="flex items-start mb-4">
                <Clock className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                <span>Open daily from 8am-5pm</span>
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-800 hover:text-amber-900"
              >
                View on map
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ngMWF9svRW2qEVyMqAgVGVCwkEFYLJ.png"
                alt="Jersey City location"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-serif mb-4">Jersey City</h2>
              <p className="flex items-start mb-2">
                <MapPin className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                <span>198 Van Vorst St. Jersey City, NJ 07302</span>
              </p>
              <p className="text-neutral-600 ml-6 mb-4">(Downtown Jersey City)</p>

              <p className="flex items-start mb-2">
                <Clock className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                <span>Open daily 7am-6pm</span>
              </p>
              <p className="text-amber-800 font-medium ml-6 mb-4">**LIMITED MENU OPTIONS**</p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-800 hover:text-amber-900"
              >
                View on map
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ngMWF9svRW2qEVyMqAgVGVCwkEFYLJ.png"
                alt="Weehawken location"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-serif mb-4">Weehawken</h2>
              <p className="flex items-start mb-2">
                <MapPin className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                <span>2812 Palisade Ave Weehawken NJ 07086</span>
              </p>
              <p className="text-neutral-600 ml-6 mb-4">(corner of Palisade Ave & 32nd St)</p>

              <p className="flex items-start mb-2">
                <Clock className="h-4 w-4 mr-2 text-amber-800 flex-shrink-0 mt-1" />
                <span>Monday-Friday 7 am to 5 pm</span>
              </p>
              <p className="text-neutral-700 ml-6 mb-4">Sat & Sun 8 am to 5 pm</p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-800 hover:text-amber-900"
              >
                View on map
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

