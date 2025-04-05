import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Coffee, ArrowLeft } from "lucide-react"

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-serif mb-12 text-center">Our Menu</h1>

        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl font-serif mb-8 flex items-center text-amber-800">
              <Coffee className="mr-2 h-5 w-5" />
              Coffee
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link
                href="/menu/espresso"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Espresso" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Espresso</h3>
                    <span className="text-amber-800 font-medium">$3.50 - $4.25</span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-2">
                    Our signature espresso blend with notes of chocolate and caramel.
                  </p>
                  <div className="text-sm text-neutral-500">
                    <span className="block">Single: $3.50</span>
                    <span className="block">Double: $4.25</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/menu/americano"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Americano" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Americano</h3>
                    <span className="text-amber-800 font-medium">$3.75 - $4.50</span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-2">
                    Espresso diluted with hot water, maintaining the flavor but reducing intensity.
                  </p>
                  <div className="text-sm text-neutral-500">
                    <span className="block">Small: $3.75</span>
                    <span className="block">Large: $4.50</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/menu/cappuccino"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Cappuccino" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Cappuccino</h3>
                    <span className="text-amber-800 font-medium">$4.50 - $5.25</span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-2">
                    Equal parts espresso, steamed milk, and milk foam for a balanced coffee experience.
                  </p>
                  <div className="text-sm text-neutral-500">
                    <span className="block">Small: $4.50</span>
                    <span className="block">Large: $5.25</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/menu/latte"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Latte" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Latte</h3>
                    <span className="text-amber-800 font-medium">$4.75 - $5.50</span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-2">
                    Espresso with steamed milk and a light layer of foam. Smooth and creamy.
                  </p>
                  <div className="text-sm text-neutral-500">
                    <span className="block">Small: $4.75</span>
                    <span className="block">Large: $5.50</span>
                    <span className="block">Add flavor: +$0.75</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/menu/pour-over"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Pour Over" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Pour Over</h3>
                    <span className="text-amber-800 font-medium">$5.50</span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-2">
                    Hand-poured coffee highlighting the unique characteristics of our single-origin beans.
                  </p>
                  <div className="text-sm text-neutral-500">
                    <span className="block">Single Origin: $5.50</span>
                    <span className="block italic">Ask about our rotating selection</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/menu/cold-brew"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Cold Brew" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Cold Brew</h3>
                    <span className="text-amber-800 font-medium">$4.75 - $5.50</span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-2">
                    Steeped for 18 hours, our cold brew is smooth, rich, and less acidic than hot coffee.
                  </p>
                  <div className="text-sm text-neutral-500">
                    <span className="block">Regular: $4.75</span>
                    <span className="block">Nitro: $5.50</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-8 text-amber-800">Food</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link
                href="/menu/avocado-toast"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Avocado Toast"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Avocado Toast</h3>
                    <span className="text-amber-800 font-medium">$9.50</span>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    Sourdough, smashed avocado, cherry tomatoes, microgreens, and a sprinkle of sea salt.
                  </p>
                </div>
              </Link>

              <Link
                href="/menu/breakfast-bowl"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Breakfast Bowl"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Breakfast Bowl</h3>
                    <span className="text-amber-800 font-medium">$12.50</span>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    Quinoa, poached egg, kale, roasted sweet potato, avocado, and tahini dressing.
                  </p>
                </div>
              </Link>

              <Link
                href="/menu/granola-yogurt"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Granola & Yogurt"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Granola & Yogurt</h3>
                    <span className="text-amber-800 font-medium">$8.75</span>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    House-made granola, Greek yogurt, seasonal fruit, and a drizzle of local honey.
                  </p>
                </div>
              </Link>

              <Link
                href="/menu/seasonal-salad"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Seasonal Salad"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Seasonal Salad</h3>
                    <span className="text-amber-800 font-medium">$11.50</span>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    Mixed greens, seasonal vegetables, house vinaigrette, and toasted seeds.
                  </p>
                </div>
              </Link>

              <Link
                href="/menu/grain-bowl"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Grain Bowl" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Grain Bowl</h3>
                    <span className="text-amber-800 font-medium">$13.75</span>
                  </div>
                  <p className="text-neutral-600 text-sm">
                    Farro, roasted seasonal vegetables, tahini dressing, and fresh herbs.
                  </p>
                </div>
              </Link>

              <Link
                href="/menu/pastries"
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Pastries" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">Pastries</h3>
                    <span className="text-amber-800 font-medium">$4.25 - $4.75</span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-2">House-made pastries baked fresh daily.</p>
                  <div className="text-sm text-neutral-500">
                    <span className="block">Croissant: $4.25</span>
                    <span className="block">Pain au Chocolat: $4.75</span>
                    <span className="block">Seasonal Scone: $4.50</span>
                    <span className="block">Banana Bread: $4.25</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-amber-800 hover:bg-amber-900 text-white">Order Online</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

