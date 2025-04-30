"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone,  Instagram, ArrowRight, } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion,  useInView } from "framer-motion"
import api from "@/lib/api"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

const BlurredTextReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(8px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 1.2, delay }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}

const FadeInView = ({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [featuredLocations, setFeaturedLocations] = useState([])
  const [featuredMenuItems, setFeaturedMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [responseMsg, setResponseMsg] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponseMsg("")

    try {
      const res = await fetch("https://backendcoffee-production.up.railway.app/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setResponseMsg("Message sent successfully!")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: ""
        })
      } else {
        setResponseMsg(data.message || "Something went wrong.")
      }
    } catch (error) {
      console.error(error)
      setResponseMsg("Server error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    // Set loaded state after initial render to enable animations
    setIsLoaded(true)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch featured locations and menu items in parallel
        const [locationsData, menuItemsData] = await Promise.all([
          api.locations.getFeatured(),
          api.menu.getFeatured()
        ])
        
        setFeaturedLocations(locationsData)
        setFeaturedMenuItems(menuItemsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])





  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-stone-50">
    <Header/>
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative h-screen flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="https://wallpapercat.com/w/full/4/1/3/593669-3840x2160-desktop-4k-coffee-beans-wallpaper.jpg"
              alt="Coffee beans being roasted"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8 overflow-hidden"
            >
              <span className="inline-block py-1.5 px-5 rounded-full text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20">
                Crafting exceptional coffee experiences since 2015
              </span>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <BlurredTextReveal delay={0.8}>
                <h1
                  id="hero-heading"
                  className="text-6xl md:text-7xl lg:text-8xl font-serif tracking-wide leading-tight"
                >
                  coffee <span className="text-amber-300">culture</span> tribute
                </h1>
              </BlurredTextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-white/80 max-w-xl mx-auto mb-10 text-lg"
            >
              A unique coffee experience that celebrates the art of coffee making and the joy of community
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <Link href="/menu">
                <Button className="bg-amber-700 hover:bg-amber-800 text-white rounded-full px-8 py-6 text-base shadow-xl">
                  Explore Our Menu
                </Button>
              </Link>

              <Link href="/locations">
                <Button
                  variant="outline"
                  className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base backdrop-blur-sm"
                >
                  Find a Location
                </Button>
              </Link>
            </motion.div>
          </div>

          
          
                  </section>

        {/* Locations Section */}
        <section className="py-24 bg-white relative" aria-labelledby="locations-heading" id="locations">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-50 to-transparent" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-md mx-auto text-center mb-16">
              <FadeInView>
                <span className="text-amber-700 text-sm uppercase tracking-widest font-medium">Our Spaces</span>
                <h2 id="locations-heading" className="text-3xl md:text-4xl font-serif text-stone-800 mt-2 mb-4">
                  Visit Us
                </h2>
                <div className="w-16 h-[2px] bg-amber-700/60 mx-auto mb-6"></div>
                <p className="text-stone-600">
                  Three carefully designed spaces, each with its own unique character but the same commitment to
                  quality.
                </p>
              </FadeInView>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {isLoading ? (
                // Loading skeleton
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col animate-pulse">
                    <div className="relative h-56 bg-neutral-200"></div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="h-6 bg-neutral-200 rounded w-1/2 mb-4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-5/6 mb-2"></div>
                      <div className="mt-auto pt-4 border-t border-stone-100">
                        <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : featuredLocations.length > 0 ? (
                featuredLocations.map((location: any, i) => (
                  <FadeInView key={location.id} delay={0.2 * i} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={location.image || "/placeholder.svg"}
                          alt={`${location.name} location`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <h3 className="text-xl font-serif">{location.name}</h3>
                          <p className="text-white/80 text-sm">{location.subtitle}</p>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <p className="flex items-start mb-2 text-stone-700">
                            <MapPin className="h-4 w-4 mr-2 text-amber-700 flex-shrink-0 mt-1" aria-hidden="true" />
                            <span>{location.address}</span>
                          </p>
                          <p className="text-stone-500 text-sm ml-6 mb-4">{location.subtext}</p>
                          <p className="text-stone-700 ml-6">{location.hours}</p>
                          {location.hours2 && <p className="text-stone-700 text-sm ml-6">{location.hours2}</p>}
                          {location.note && <p className="text-amber-700 font-medium ml-6 mt-2">{location.note}</p>}
                        </div>

                        <div className="mt-6 pt-4 border-t border-stone-100">
                          <Link
                            href={`/locations/${location.id}`}
                            className="inline-flex items-center text-amber-700 font-medium text-sm group-hover:text-amber-800 transition-colors"
                          >
                            Get directions
                            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeInView>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-neutral-500">No locations found. Please check back later.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* StorySection */}
<section className="py-24 bg-stone-50 relative overflow-hidden" aria-labelledby="about-heading">
  <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-40 blur-3xl" />
  <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full opacity-30 blur-3xl" />

  <div className="container mx-auto px-4 md:px-8 relative z-10">
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
      <FadeInView className="relative">
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-100 rounded-full opacity-70 blur-xl" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-200 rounded-full opacity-60 blur-xl" />

        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/ourstory.png"
              alt="Coffee being poured into a cup"
              width={600}
              height={600}
              className="rounded-2xl"
              loading="lazy"
            />
          </div>

          <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-xl overflow-hidden shadow-lg border-4 border-white">
            <Image
              src="/ourstory1.png"
              alt="Coffee shop interior"
              width={160}
              height={160}
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </FadeInView>

      <div className="space-y-8">
        <FadeInView delay={0.2}>
          <span className="text-amber-700 text-sm uppercase tracking-widest font-medium">Our Story</span>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-serif text-stone-800 mt-2 mb-6">
            More Than Coffee
          </h2>
          <div className="w-16 h-[2px] bg-amber-700/60 mb-6"></div>
        </FadeInView>

        <div className="space-y-5 text-stone-700">
          {[
            <p key="1" className="leading-relaxed">
              At <span className="font-serif italic">Umber</span>, we believe coffee is more than just a drink—it's a story, a ritual, a connection.
            </p>,
            <p key="2" className="leading-relaxed">
              Born in the heart of Chennai, <span className="font-serif italic">Umber Speciality Coffee</span> was crafted as a grab-and-go concept for people in motion. Whether you're navigating a packed schedule or pausing for a mindful moment, we’re your daily ritual—made effortless.
            </p>,
            <p key="3" className="leading-relaxed">
              Our mission is simple: make specialty coffee more accessible. We cut through the noise to bring you clean, ethically sourced brews—free from processed sugars, full of purpose, and rich in flavor.
            </p>,
            <p key="4" className="leading-relaxed">
              We’re not here just to serve coffee. We’re here to redefine what coffee can be—honest, intentional, and beautifully brewed.
            </p>,
          ].map((paragraph, i) => (
            <FadeInView key={i} delay={0.3 + i * 0.1}>
              {paragraph}
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.6}>
          <div className="pt-4">
            <Link href="/about">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white rounded-full px-8">Our Story</Button>
            </Link>
          </div>
        </FadeInView>
      </div>
    </div>
  </div>
</section>

        {/* Menu Preview Section */}
        <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="menu-heading" id="menu">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-50 rounded-full opacity-70 blur-3xl" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-md mx-auto text-center mb-16">
              <FadeInView>
                <span className="text-amber-700 text-sm uppercase tracking-widest font-medium">Taste</span>
                <h2 id="menu-heading" className="text-3xl md:text-4xl font-serif text-stone-800 mt-2 mb-4">
                  Our Menu
                </h2>
                <div className="w-16 h-[2px] bg-amber-700/60 mx-auto mb-6"></div>
                <p className="text-stone-600">Discover our carefully crafted coffee and food offerings</p>
              </FadeInView>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                // Loading skeleton
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col animate-pulse">
                    <div className="relative h-48 bg-neutral-200"></div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="h-6 bg-neutral-200 rounded w-1/3 mb-4"></div>
                      <div className="space-y-2 flex-1">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="flex justify-between">
                            <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                            <div className="h-4 bg-neutral-200 rounded w-1/6"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : featuredMenuItems.length > 0 ? (
                // Group menu items by category
                (() => {
                  const categories: Record<string, any[]> = {};
                  
                  featuredMenuItems.forEach((item: any) => {
                    if (!categories[item.category]) {
                      categories[item.category] = [];
                    }
                    categories[item.category].push(item);
                  });
                  
                  return Object.entries(categories).map(([category, items], i) => (
                    <FadeInView key={category} delay={0.2 * i} className="group">
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={items[0]?.image || "/placeholder.svg"}
                            alt={category}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-xl font-serif">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                          </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex-1 space-y-3">
                            {items.slice(0, 4).map((item: any) => (
                              <div key={item.id} className="flex justify-between items-center text-stone-700">
                                <span>{item.name}</span>
                                <span className="text-amber-700 font-medium">{item.priceRange}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </FadeInView>
                  ));
                })()
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-neutral-500">No menu items found. Please check back later.</p>
                </div>
              )}
            </div>

            <FadeInView delay={0.6} className="mt-12 text-center">
              <Link href="/menu">
                <Button className="bg-amber-700 hover:bg-amber-800 text-white rounded-full px-8 py-6">
                  View Full Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </FadeInView>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-stone-50 relative overflow-hidden" aria-labelledby="contact-heading" id="contact">
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-40 blur-3xl" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <FadeInView>
                  <span className="text-amber-700 text-sm uppercase tracking-widest font-medium">Get in Touch</span>
                  <h2 id="contact-heading" className="text-3xl md:text-4xl font-serif text-stone-800 mt-2 mb-6">
                    Contact Us
                  </h2>
                  <div className="w-16 h-[2px] bg-amber-700/60 mb-8"></div>
                </FadeInView>

                <FadeInView delay={0.2} className="text-amber-700 mb-8">
                  <p className="italic">
                    * Please note - we do not take reservations at this time (walk-in only). Thank you!
                  </p>
                </FadeInView>

                <FadeInView delay={0.3}>
                  <h3 className="text-xl font-serif mb-4 text-stone-800">Call:</h3>
                </FadeInView>

                <div className="space-y-3 mb-10">
                  {featuredLocations.slice(0, 3).map((location: any, i) => (
                    <FadeInView key={location.id} delay={0.4 + i * 0.1} className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-amber-700" aria-hidden="true" />
                      <span className="font-medium text-stone-700">{location.name}:</span>{" "}
                      <a
                        href={`tel:${location.phone.replace(/\D/g, "")}`}
                        className="ml-1 hover:text-amber-700 transition-colors"
                      >
                        {location.phone}
                      </a>
                    </FadeInView>
                  ))}
                </div>

                <FadeInView delay={0.6} className="flex space-x-5 mb-10">
                  {[
                  
                    { Icon: Instagram, label: "Instagram" , href: "https://www.instagram.com/helloumbercoffee/" },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      className="text-stone-700 hover:text-amber-700 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      aria-label={`Visit our ${item.label} page`}
                    >
                      <item.Icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </FadeInView>

                <FadeInView delay={0.7}>
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/conatact.png"
                      alt="Coffee beans being roasted"
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </FadeInView>
              </div>

              <FadeInView delay={0.4}>
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                  <h3 className="text-xl font-serif mb-6 text-stone-800">
                    Send your message and we will get back to you:
                  </h3>

                  <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm text-stone-600">First Name</label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm text-stone-600">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-stone-600">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm text-stone-600">Phone</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-stone-600">Message</label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
          required
        />
      </div>

      <div className="text-center">
        <Button type="submit" className="bg-amber-700 hover:bg-amber-800 text-white px-8 rounded-full shadow-md" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {responseMsg && <p className="mt-4 text-sm text-stone-700">{responseMsg}</p>}
      </div>
    </form>
                    </div>
              </FadeInView>
            </div>
          </div>
        </section>

   {/* Newsletter Section */}
<section
  className="relative overflow-hidden bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 py-20 text-white"
  aria-labelledby="newsletter-heading"
>
  {/* Decorative Background Elements */}
  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5" />
  <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-700 rounded-full opacity-20 blur-3xl" />
  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600 rounded-full opacity-30 blur-3xl" />
  <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-amber-500 opacity-10 blur-[120px] pointer-events-none" />

  {/* Content */}
  <motion.div
    className="relative z-10 container mx-auto px-4 md:px-8 text-center"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <BlurredTextReveal>
      <h2
        id="newsletter-heading"
        className="text-4xl md:text-5xl font-serif mb-6 leading-snug tracking-tight"
      >
        Never miss an update
      </h2>
    </BlurredTextReveal>

    <p className="max-w-2xl mx-auto text-white/80 mb-8 text-base md:text-lg">
      Get exclusive updates, early access, and special offers straight to your inbox.
    </p>

    <motion.form
      className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex-1">
        <label htmlFor="email-newsletter" className="sr-only">
          Email address
        </label>
        <input
          id="email-newsletter"
          type="email"
          required
          placeholder="Your email address"
          className="w-full py-3 px-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full sm:rounded-r-none sm:rounded-l-full focus:outline-none focus:ring-2 focus:ring-amber-300 text-white placeholder:text-white/70 transition-all duration-200"
        />
      </div>
      <Button
        type="submit"
        className="px-8 py-4 bg-white text-amber-900 hover:bg-amber-100 rounded-full sm:rounded-l-none sm:rounded-r-full font-semibold transition-all duration-200 shadow-md"
      >
        Subscribe
      </Button>
    </motion.form>

    <p className="mt-4 text-sm text-white/70">
      *You can unsubscribe anytime. Read our{" "}
      <a href="/privacy-policy" className="underline hover:text-white">
        Privacy Policy
      </a>
      .
    </p>
  </motion.div>
</section>
  </main>
<Footer/>
     
    </div>
  )
}

