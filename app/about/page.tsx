"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif mb-8 text-center">Our Story</h1>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <p className="text-neutral-700 mb-4">
                Founded in 2015, <span className="font-serif italic">umber</span> began with a simple mission: to create
                a space where coffee is celebrated as an art form and where community thrives.
              </p>
              <p className="text-neutral-700 mb-4">
                What started as a small corner café in Tribeca has grown into multiple locations across New York and New
                Jersey, each maintaining our commitment to quality coffee and thoughtful food.
              </p>
              <p className="text-neutral-700">
                We believe that a great café is more than just a place to grab coffee—it's a gathering space, a
                workspace, a moment of respite in a busy day. Every detail of our spaces is designed with this
                philosophy in mind.
              </p>
            </div>
            <div className="relative h-64 md:h-80">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ngMWF9svRW2qEVyMqAgVGVCwkEFYLJ.png"
                alt="Coffee shop interior"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <h2 className="text-2xl font-serif mb-6">Our Coffee</h2>
          <p className="text-neutral-700 mb-4">
            We've proudly partnered with Origin Roasters since our inception. This relationship allows us to serve
            coffee that is not only delicious but ethically sourced and sustainably produced.
          </p>
          <p className="text-neutral-700 mb-8">
            Our baristas are trained in the art and science of coffee preparation, constantly refining their craft to
            bring out the best in every bean. From perfectly pulled espresso shots to meticulously prepared pour-overs,
            we approach each cup with care and attention to detail.
          </p>

          <h2 className="text-2xl font-serif mb-6">Our Food</h2>
          <p className="text-neutral-700 mb-4">
            Our kitchen philosophy mirrors our approach to coffee: thoughtful, seasonal, and made with quality
            ingredients. We source locally whenever possible and create dishes that complement our coffee offerings.
          </p>
          <p className="text-neutral-700 mb-8">
            From hearty breakfast bowls to light lunch options and house-made pastries, our menu is designed to satisfy
            and nourish throughout the day.
          </p>

          <h2 className="text-2xl font-serif mb-6">Our Spaces</h2>
          <p className="text-neutral-700 mb-4">
            Each <span className="font-serif italic">umber</span> location has its own unique character while
            maintaining our signature aesthetic: warm, inviting spaces with thoughtful design elements that encourage
            both conversation and contemplation.
          </p>
          <p className="text-neutral-700 mb-8">
            We believe in creating environments where people feel welcome to linger, work, meet, or simply enjoy a
            moment alone with a great cup of coffee.
          </p>

          <div className="text-center text-neutral-700 italic border-t border-b py-8 my-8">
            "At <span className="font-serif">umber</span>, we are simply passionate about the good things that life has
            to offer."
          </div>

          <p className="text-neutral-700 text-center">We invite you to visit us and become part of our story.</p>
        </div>
      </div>
    </div>
  )
}

