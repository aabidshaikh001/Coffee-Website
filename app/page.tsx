"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowRight, Menu, X, Coffee } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useInView } from "framer-motion"
import api from "@/lib/api"

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



  const navItems = [
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Locations", href: "/locations" },
    { name: "Menu", href: "/menu" },
   
  ]

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-stone-50">
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollY > 50 ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-6"
            >
              <Link href="/" className="text-3xl font-serif tracking-wide relative" aria-label="Aroma Coffee Home">
                <span className={`relative z-10 ${scrollY > 50 ? "text-stone-800" : "text-white"}`}>aroma</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-amber-700/60 w-full -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: isLoaded ? "100%" : 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </Link>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-8">
              <motion.nav
                className="flex items-center space-x-8 text-sm font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                role="navigation"
                aria-label="Main navigation"
              >
                {navItems.map((item) => (
                  <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href={item.href}
                      className={`transition-colors relative group tracking-wide ${
                        scrollY > 50 ? "text-stone-700 hover:text-amber-800" : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                          scrollY > 50 ? "bg-amber-800" : "bg-white"
                        }`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="flex items-center space-x-5">
                <Link href="#locations">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`p-2 rounded-full ${
                    scrollY > 50 ? "text-stone-600 hover:text-amber-800" : "text-white/80 hover:text-white"
                  }`}
                  aria-label="Search"
                >
                  <MapPin className="h-[18px] w-[18px]" />
                </motion.button>
                </Link>
                <Link href="#menu">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`p-2 rounded-full ${
                    scrollY > 50 ? "text-stone-600 hover:text-amber-800" : "text-white/80 hover:text-white"
                  }`}
                  aria-label="Shopping bag"
                >
                  <Coffee className="h-[18px] w-[18px]" />
                </motion.button>
                </Link>


                <Link href="#contact">

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Button
                    className={`rounded-full px-6 text-sm font-medium tracking-wide ${
                      scrollY > 50
                        ? "bg-amber-800 hover:bg-amber-900 text-white shadow-sm"
                        : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20"
                    }`}
                  >
                    Book A Seat
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.span>
                  </Button>
                </motion.div>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`p-2 rounded-full ${scrollY > 50 ? "text-stone-700" : "text-white"}`}
                aria-label="Shopping bag"
              >
                <Coffee className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 rounded-full ${scrollY > 50 ? "text-stone-700" : "text-white"}`}
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 bg-gradient-to-br from-amber-900 to-amber-950 z-50 lg:hidden flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex justify-between items-center p-6">
              <Link href="/" className="text-3xl font-serif tracking-wide text-white" aria-label="Aroma Coffee Home">
                aroma
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/80 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <motion.nav
              className="flex flex-col items-center justify-center flex-1 space-y-7 text-lg"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="text-white/90 hover:text-white transition-colors tracking-wide"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={fadeInUp} className="pt-6">
                <Button className="bg-white text-amber-900 hover:bg-amber-50 rounded-full px-8 shadow-lg">
                  Book A Seat
                </Button>
              </motion.div>
            </motion.nav>

            <div className="p-6 text-white/60 text-center text-sm">
              <p>© {new Date().getFullYear()} by Aroma Coffee</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* About Section */}
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
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7GoBwhD5SnEtEvnqBsi9Q2qWMo8rfW.png"
                      alt="Coffee being poured into a cup"
                      width={600}
                      height={600}
                      className="rounded-2xl"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9JxYjZkZfRTHjrxkiMowyACG38gcCY.png"
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
                    Truly Great Coffee
                  </h2>

                  <div className="w-16 h-[2px] bg-amber-700/60 mb-6"></div>
                </FadeInView>

                <div className="space-y-5 text-stone-700">
                  {[
                    <p key="1" className="leading-relaxed">
                      <span className="font-serif italic">aroma</span> pays tribute to an infinite and evolving coffee
                      culture served in unique atmosphere along with fresh food options.
                    </p>,
                    <p key="2" className="leading-relaxed">
                      Our well trained Baristas (some are a bit weird, some are too obsessed) are constantly trying to
                      push the envelope in the art of coffee.
                    </p>,
                    <p key="3" className="leading-relaxed">
                      Our kitchen is light and seasonal with an emphasis on fresh vegetables, made to order dishes,
                      vegan options, healthy bowls and one of a kind pastries.
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
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Instagram, label: "Instagram" },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href="#"
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
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Eub7NeqNEpaYUYJLt36LbRur2WzVuU.png"
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

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm text-stone-600">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
                          aria-required="true"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm text-stone-600">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm text-stone-600">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
                          aria-required="true"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm text-stone-600">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm text-stone-600">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-amber-700 bg-transparent"
                        aria-required="true"
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        className="bg-amber-700 hover:bg-amber-800 text-white px-8 rounded-full shadow-md"
                      >
                        Submit
                      </Button>
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

      <footer className="bg-white py-16 border-t border-stone-100 relative overflow-hidden" role="contentinfo">
        <div className="absolute -top-24 right-0 w-64 h-64 bg-amber-50 rounded-full opacity-30 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <Link
                href="/"
                className="text-2xl font-serif tracking-wide text-stone-800 mb-4 inline-block"
                aria-label="Aroma Coffee Home"
              >
                aroma
              </Link>
              <p className="text-stone-600 mt-4 mb-6">
                Crafting exceptional coffee experiences since 2015. A tribute to coffee culture and community.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="text-stone-600 hover:text-amber-700 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    aria-label={`Visit our ${item.label} page`}
                  >
                    <item.Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-stone-800 mb-4">Manhattan</h3>
              <p className="flex items-start text-stone-600 mb-2">
                <MapPin className="h-4 w-4 mr-2 text-amber-700 flex-shrink-0 mt-1" aria-hidden="true" />
                <span>130 Franklin St. New York, NY, 10013</span>
              </p>
              <p className="text-stone-500 text-sm ml-6">Open daily from 8am-5pm</p>
            </div>

            <div>
              <h3 className="font-medium text-stone-800 mb-4">Jersey City</h3>
              <p className="flex items-start text-stone-600 mb-2">
                <MapPin className="h-4 w-4 mr-2 text-amber-700 flex-shrink-0 mt-1" aria-hidden="true" />
                <span>198 Van Vorst St. Jersey City, NJ 07302</span>
              </p>
              <p className="text-stone-500 text-sm ml-6">Open daily 7am-6pm</p>
            </div>

            <div>
              <h3 className="font-medium text-stone-800 mb-4">Contact</h3>
              <div className="space-y-2">
                <p className="flex items-center text-stone-600">
                  <Phone className="h-4 w-4 mr-2 text-amber-700" aria-hidden="true" />
                  <a href="tel:2124315200" className="hover:text-amber-700 transition-colors">
                    212.431.5200
                  </a>
                </p>
                <p className="flex items-center text-stone-600">
                  <Mail className="h-4 w-4 mr-2 text-amber-700" aria-hidden="true" />
                  <a href="mailto:info@aroma.coffee" className="hover:text-amber-700 transition-colors">
                    info@aroma.coffee
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 md:mb-0" aria-label="Footer navigation">
              {["About", "Contact Us", "Locations", "Menu", "Privacy Policy"].map((item, i) => (
                <motion.div key={item} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-amber-700 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p>© {new Date().getFullYear()} by Aroma Coffee</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

