"use client"

import Header from "@/components/header"
import Image from "next/image"

   ""
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
          
          <Header/>
      <div className="container mx-auto px-4 pt-24 pb-12"> {/* Increased top padding */}
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif mb-8 text-center">About Us</h1>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <p className="text-neutral-700 mb-4">
                At <span className="font-serif italic">Umber</span>, we believe coffee is more than just a drink—it's a
                story, a ritual, a connection.
              </p>
              <p className="text-neutral-700 mb-4">
                At <span className="font-serif italic">Umber</span> Speciality Coffee, we believe that great coffee
                shouldn't slow you down—it should move with you. Born in the heart of Chennai,{" "}
                <span className="font-serif italic">Umber</span> was envisioned as a simple, honest, grab-and-go coffee
                experience for people living life in motion.
              </p>
              <p className="text-neutral-700">
                Whether you're on your way to work, heading into a meeting, or just need a moment of calm in a packed
                day, <span className="font-serif italic">Umber</span> is your daily ritual—made effortless.
              </p>
            </div>
            <div className="relative h-64 md:h-80">
              <Image
                src="/stroy.png"
                alt="Coffee shop interior"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <h2 className="text-2xl font-serif mb-6">Our Journey</h2>
          <p className="text-neutral-700 mb-4">
            Our journey began with a single goal: to make speciality coffee more accessible. We wanted to strip away the
            complexity and deliver clean, flavorful brews that speak for themselves.
          </p>
          <p className="text-neutral-700 mb-8">
            What started as a passion for coffee quickly turned into a mission to serve brews that are not only
            delicious but also ethically sourced, organically grown, and completely free from processed sugars.
          </p>
          <p className="text-neutral-700 mb-8">
            We're not just here to serve coffee—we're here to reshape what people think good coffee can be.
          </p>

          <h2 className="text-2xl font-serif mb-6">Our Coffee</h2>
          <p className="text-neutral-700 mb-4">
            <span className="font-serif italic">Umber</span> coffee is bold, smooth, and deeply rooted.
          </p>
          <p className="text-neutral-700 mb-4">
            Every cup at <span className="font-serif italic">Umber</span> is made with intention. We exclusively source
            Arabica beans that's inspired by the bold, earthy flavors of beans grown in Coorg, Chikmagalur where
            centuries-old farming practices meet innovative sustainability.
          </p>
          <p className="text-neutral-700 mb-4">
            The result? Coffee that's naturally low in acidity, rich in chocolate and spice notes, without masking them
            with artificial flavors or unnecessary additives.
          </p>
          <p className="text-neutral-700 mb-8">
            Our brewing methods are crafted to preserve the natural richness of the beans. We keep it simple—because
            coffee should be simple. Whether it's a hot cappuccino or a refreshing cold brew, our menu is built to fit
            into your life, not complicate it. No fluff, no syrupy overload—just pure, honest coffee you can grab and
            go.
          </p>
          <p className="text-neutral-700 mb-8">
            From bean to cup, we prioritize sustainability, health, and taste. That means no shortcuts, no added
            processed sugar, and no compromise.
          </p>

          <div className="text-center text-neutral-700 italic border-t border-b py-8 my-8">
            "At <span className="font-serif">Umber</span>, we believe coffee is more than just a drink—it's a story, a
            ritual, a connection."
          </div>

          <p className="text-neutral-700 text-center">We invite you to experience the Umber difference.</p>
        </div>
      </div>
    </div>
  )
}
