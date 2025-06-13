"use client"

import type React from "react"
import { Clock, Phone, ExternalLink } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight, Menu, X, Coffee, Star, TrendingUp,Leaf } from "lucide-react"
import { FaStar, FaRocket, FaCheckCircle, FaBolt } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence, useInView } from "framer-motion"
import api from "@/lib/api"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
interface Location {
  id: string
  name: string
  subtitle: string
  address: string
  subtext: string
  hours: string
  hours2?: string
  note?: string
  image: string
  phone?: string
  features?: string[]
}
// Counter component for animated numbers
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
}: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const startCount = 0

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * (end - startCount) + startCount))

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Rating bar component with platform logos
const RatingBar = ({
  platform,
  rating,
  maxRating = 5,
  color,
  delay = 0,
}: {
  platform: string
  rating: number
  maxRating?: number
  color: string
  delay?: number
}) => {
  const percentage = (rating / maxRating) * 100
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Platform logo mapping
  const platformLogos = {
    Zomato: "https://play-lh.googleusercontent.com/Zqv3j3gWCWrxuHW1VkRKNWso3beRsrwPCj58kG_Ile6iGGSf1YfkPYhKExXKY7_L0lU=s256-rw",
    Swiggy: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk50Ut-wJKwbca3BTPssDUl_fqnsEE_D2tcw&s",
    Google: "https://yt3.googleusercontent.com/2eI1TjX447QZFDe6R32K0V2mjbVMKT5mIfQR-wK5bAsxttS_7qzUDS1ojoSKeSP0NuWd6sl7qQ=s900-c-k-c0x00ffffff-no-rj",
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src={platformLogos[platform as keyof typeof platformLogos] || "/placeholder.svg"}
              alt={`${platform} logo`}
              width={60}
              height={20}
              className="object-contain"
            />
          </div>
          <Star className="h-4 w-4 text-amber-500 fill-current" />
        </div>
        <span className="text-sm font-semibold text-stone-600">
          {rating.toFixed(1)}/{maxRating}
        </span>
      </div>
      <div className="relative h-2 bg-stone-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  )
}

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

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stopColor="#f3f4f6" offset="20%" />
      <stop stopColor="#e5e7eb" offset="50%" />
      <stop stopColor="#f3f4f6" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f3f4f6" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)
export default function Home() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }
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
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [responseMsg, setResponseMsg] = useState("")

  // Sample restaurant metrics data
  const restaurantMetrics = {
    totalCupsServed: 125000,
    ratings: {
      zomato: 4.3,
      swiggy: 4.5,
      google: 4.2,
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponseMsg("")

    try {
      const res = await fetch("https://backendcoffee-1.onrender.com/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setResponseMsg("Message sent successfully!")
        toast.success("Message sent successfully!")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
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
    setIsLoaded(true)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const [locationsData, menuItemsData] = await Promise.all([api.locations.getFeatured(), api.menu.getFeatured()])

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
              <Link href="/" className="relative" aria-label="umber Coffee Home">
                <Image
                  src="/logo.png"
                  alt="Umber Coffee Logo"
                  width={100}
                  height={40}
                  className={`relative z-10 transition-colors duration-300 ${scrollY > 50 ? "brightness-100" : "brightness-100"}`}
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
                <Link href="/#locations">
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
                <Link href="/#menu">
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
            className="fixed inset-0 bg-white z-50 lg:hidden flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex justify-between items-center p-6">
              <Link href="/" className="relative" aria-label="umber Coffee Home">
                <Image src="/logo.png" alt="Umber Coffee Logo" width={90} height={40} className="object-contain" />
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-amber-700 hover:text-amber-800"
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
                    className="text-amber-700 hover:text-amber-800 transition-colors tracking-wide"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="p-6 text-amber-700 text-center text-sm">
              <p>© {new Date().getFullYear()} by umber Coffee</p>
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
                Welcome to Umber
              </span>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <BlurredTextReveal delay={0.8}>
                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide leading-tight"
                >
                  At Umber, we believe coffee is more than just a drink—it's a{" "}
                  <span className="text-amber-300">story</span>, a <span className="text-amber-300">ritual</span>, a{" "}
                  <span className="text-amber-300">connection</span>.
                </h1>
              </BlurredTextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-white/80 max-w-xl mx-auto mb-10 text-lg"
            >
              Discover the perfect blend of tradition and innovation in every cup
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

      
         <section
      className="py-24 md:py-32 relative bg-gradient-to-b from-stone-50 to-white"
      aria-labelledby="locations-heading"
      id="locations"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#9a7c52_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-50 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md mx-auto text-center mb-16 md:mb-24"
        >
          <span className="text-amber-700 text-sm uppercase tracking-widest font-medium inline-block px-3 py-1 rounded-full bg-amber-50 mb-2">
            Our Spaces
          </span>
          <h2 id="locations-heading" className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-800 mt-2 mb-4">
            Visit Our Cafés
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-[2px] w-12 bg-amber-700/30"></div>
            <div className="h-[3px] w-12 bg-amber-700/60"></div>
            <div className="h-[2px] w-12 bg-amber-700/30"></div>
          </div>
          <p className="text-stone-600 leading-relaxed md:text-lg">
            Three carefully designed spaces, each with its own unique character but the same commitment to quality
            coffee and exceptional experiences.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 md:space-y-24"
        >
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <motion.div key={i} variants={item} className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="relative w-full md:w-1/2 h-64 md:h-80 bg-stone-100 overflow-hidden rounded-lg">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}")`,
                      backgroundSize: "cover",
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                  <div className="h-8 bg-stone-100 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-stone-100 rounded w-1/3 mb-8"></div>

                  <div className="flex items-start mb-6">
                    <div className="w-5 h-5 rounded-full bg-stone-100 mr-3 mt-0.5"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-stone-100 rounded w-full mb-2"></div>
                      <div className="h-3 bg-stone-100 rounded w-4/5"></div>
                    </div>
                  </div>

                  <div className="flex items-start mb-6">
                    <div className="w-5 h-5 rounded-full bg-stone-100 mr-3 mt-0.5"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-stone-100 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-stone-100 rounded w-1/2"></div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 flex justify-between">
                    <div className="h-5 bg-stone-100 rounded w-1/4"></div>
                    <div className="h-5 bg-stone-100 rounded w-1/4"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : featuredLocations.length > 0 ? (
            featuredLocations.map((location: Location, i) => (
              <motion.div
                key={location.id}
                variants={item}
                className={cn("group", i < featuredLocations.length - 1 && "pb-16 md:pb-24 border-b border-stone-200")}
              >
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
                  <div className="relative w-full md:w-1/2 h-64 md:h-80 overflow-hidden rounded-lg">
                    <Image
                      src={location.image || "/placeholder.svg?height=800&width=1200"}
                      alt={`${location.name} location`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={i < 1 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent",
                        "opacity-80 group-hover:opacity-70 transition-opacity duration-300",
                      )}
                    />

                    {/* Feature tags */}
                    {location.features && location.features.length > 0 && (
                      <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end max-w-[70%]">
                        {location.features.map((feature, index) => (
                          <span
                            key={index}
                            className={cn(
                              "bg-white/90 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium",
                              "shadow-sm transform transition-transform duration-300",
                              "group-hover:translate-y-[-2px] group-hover:shadow-md",
                              "delay-[calc(75ms*var(--index))]",
                            )}
                            style={{ "--index": index } as React.CSSProperties}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-serif text-stone-800 group-hover:text-amber-800 transition-colors duration-300">
                      {location.name}
                    </h3>
                    <p className="text-stone-600 mt-1 mb-6">{location.subtitle}</p>

                    <div className="space-y-6 mb-8">
                      <div className="flex items-start text-stone-700">
                        <MapPin
                          className={cn(
                            "h-5 w-5 mr-3 text-amber-700 flex-shrink-0 mt-0.5",
                            "transition-transform duration-300 ease-out",
                            "group-hover:text-amber-600 group-hover:scale-110",
                          )}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-medium">{location.address}</p>
                          <p className="text-stone-500 text-sm mt-1">{location.subtext}</p>
                        </div>
                      </div>

                      <div className="flex items-start text-stone-700">
                        <Clock
                          className={cn(
                            "h-5 w-5 mr-3 text-amber-700 flex-shrink-0 mt-0.5",
                            "transition-transform duration-300 ease-out delay-75",
                            "group-hover:text-amber-600 group-hover:scale-110",
                          )}
                          aria-hidden="true"
                        />
                        <div>
                          <p>{location.hours}</p>
                          {location.hours2 && <p className="text-stone-500 text-sm mt-1">{location.hours2}</p>}
                        </div>
                      </div>

                      {location.phone && (
                        <div className="flex items-start text-stone-700">
                          <Phone
                            className={cn(
                              "h-5 w-5 mr-3 text-amber-700 flex-shrink-0 mt-0.5",
                              "transition-transform duration-300 ease-out delay-150",
                              "group-hover:text-amber-600 group-hover:scale-110",
                            )}
                            aria-hidden="true"
                          />
                          <p>{location.phone}</p>
                        </div>
                      )}
                    </div>

                    {location.note && (
                      <div
                        className={cn(
                          "p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400 mb-6",
                          "transform transition-all duration-300 ease-out",
                          "group-hover:border-amber-500 group-hover:bg-amber-50/80",
                        )}
                      >
                        <p className="text-amber-800 text-sm">{location.note}</p>
                      </div>
                    )}

                    <div className="mt-auto flex justify-between items-center">
                      <Link
                        href={`/locations/${location.id}`}
                        className={cn(
                          "inline-flex items-center text-amber-700 font-medium",
                          "transition-colors duration-300 group-hover:text-amber-800",
                          "focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md",
                        )}
                      >
                        View details
                        <ArrowRight
                          className={cn(
                            "ml-1.5 h-4 w-4",
                            "transition-transform duration-300 ease-out",
                            "group-hover:translate-x-1",
                          )}
                        />
                      </Link>

                      <Link
                        href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center text-stone-500 text-sm",
                          "hover:text-stone-700 transition-colors duration-300",
                          "focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 rounded-md",
                        )}
                        aria-label={`Get directions to ${location.name}`}
                      >
                        Get directions
                        <ExternalLink
                          className={cn(
                            "ml-1 h-3 w-3",
                            "transition-transform duration-300 ease-out",
                            "group-hover:translate-y-[-1px] group-hover:translate-x-[1px]",
                          )}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div variants={item} className="text-center py-16 bg-stone-50 rounded-lg">
              <MapPin className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600 font-medium">No locations found. Please check back later.</p>
              <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
                We're constantly expanding to new neighborhoods. Sign up for our newsletter to be notified when we open
                near you.
              </p>
            </motion.div>
          )}
        </motion.div>

       
      </div>
    </section>
        {/* Story Section */}
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
                      At <span className="font-serif italic">Umber</span>, we believe coffee is more than just a
                      drink—it's a story, a ritual, a connection.
                    </p>,
                    <p key="2" className="leading-relaxed">
                      Born in the heart of Chennai, <span className="font-serif italic">Umber Speciality Coffee</span>{" "}
                      was crafted as a grab-and-go concept for people in motion. Whether you're navigating a packed
                      schedule or pausing for a mindful moment, we're your daily ritual—made effortless.
                    </p>,
                    <p key="3" className="leading-relaxed">
                      Our mission is simple: make specialty coffee more accessible. We cut through the noise to bring
                      you clean, ethically sourced brews—free from processed sugars, full of purpose, and rich in
                      flavor.
                    </p>,
                    <p key="4" className="leading-relaxed">
                      We're not here just to serve coffee. We're here to redefine what coffee can be—honest,
                      intentional, and beautifully brewed.
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
                      <Button className="bg-amber-700 hover:bg-amber-800 text-white rounded-full px-8">
                        Our Story
                      </Button>
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
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col animate-pulse"
                  >
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
                (() => {
                  const categories: Record<string, any[]> = {}

                  featuredMenuItems.forEach((item: any) => {
                    if (!categories[item.category]) {
                      categories[item.category] = []
                    }
                    categories[item.category].push(item)
                  })

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
                            <h3 className="text-xl font-serif">
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </h3>
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
                  ))
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
          {/* Trusted by Coffee Lovers Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200 rounded-full opacity-30 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-300 rounded-full opacity-20 blur-2xl" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-amber-400 rounded-full opacity-10 blur-3xl" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <FadeInView className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="h-4 w-4" />
                <span className="uppercase tracking-wider">Our Performance</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">
                Trusted by <span className="text-amber-700">Coffee Lovers</span>
              </h2>
              <div className="w-24 h-[3px] bg-gradient-to-r from-amber-600 to-amber-800 mx-auto mb-8 rounded-full"></div>
              <p className="text-stone-600 max-w-3xl mx-auto text-lg leading-relaxed">
                From our first cup to our latest brew, we've built a thriving community of coffee enthusiasts who trust
                us for
                <span className="font-semibold text-amber-700"> quality</span>,
                <span className="font-semibold text-amber-700"> consistency</span>, and
                <span className="font-semibold text-amber-700"> exceptional taste</span>.
              </p>
            </FadeInView>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {[
  {
    label: "Customer Rating",
    value: 4.3,
    suffix: "/5",
    icon: Star,
    color: "from-yellow-500 to-yellow-600",
    description: "Average across platforms",
  },
  {
    label: "Repeat Customers",
    value: 89,
    suffix: "%",
    icon: TrendingUp,
    color: "from-green-500 to-green-600",
    description: "Come back regularly",
  },

  {
    label: "Specialty Beverages",
    value: 25,
    suffix: "+",
    icon: Coffee,
    color: "from-rose-500 to-rose-600",
    description: "Unique handcrafted recipes",
  },
  {
    label: "Eco-Friendly Packaging",
    value: 100,
    suffix: "%",
    icon: Leaf,
    color: "from-lime-500 to-lime-600",
    description: "Sustainable commitment",
  },
]
.map((metric, index) => (
                <FadeInView key={metric.label} delay={0.1 * index}>
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`mx-auto w-14 h-14 bg-gradient-to-br ${metric.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <metric.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-stone-800 mb-1">
                        <AnimatedCounter end={metric.value} duration={2500} suffix={metric.suffix} />
                      </div>
                      <p className="font-semibold text-stone-700 mb-1">{metric.label}</p>
                      <p className="text-xs text-stone-500">{metric.description}</p>
                    </CardContent>
                  </Card>
                </FadeInView>
              ))}
            </div>

            {/* Platform Ratings Showcase */}
            <FadeInView delay={0.4}>
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-20 border border-amber-100">
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4">
                    Rated Excellent Across All Platforms
                  </h3>
                  <p className="text-stone-600 max-w-2xl mx-auto">
                    Our commitment to quality is reflected in consistently high ratings across major food delivery
                    platforms
                  </p>
                </div>

                {/* Platform Logos Header */}
                <div className="flex items-center justify-center gap-8 md:gap-12 mb-12 pb-8 border-b border-stone-200">
                  {[
                    { name: "Zomato", logo: "https://play-lh.googleusercontent.com/Zqv3j3gWCWrxuHW1VkRKNWso3beRsrwPCj58kG_Ile6iGGSf1YfkPYhKExXKY7_L0lU=s256-rw", color: "#E23744" },
                    { name: "Swiggy", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk50Ut-wJKwbca3BTPssDUl_fqnsEE_D2tcw&s", color: "#FC8019" },
                    { name: "Google", logo: "https://yt3.googleusercontent.com/2eI1TjX447QZFDe6R32K0V2mjbVMKT5mIfQR-wK5bAsxttS_7qzUDS1ojoSKeSP0NuWd6sl7qQ=s900-c-k-c0x00ffffff-no-rj", color: "#4285F4" },
                  ].map((platform, index) => (
                    <motion.div
                      key={platform.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="text-center group cursor-pointer"
                    >
                      <div className="bg-white rounded-xl p-4 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                        <Image
                          src={platform.logo || "/placeholder.svg"}
                          alt={`${platform.name} logo`}
                          width={100}
                          height={32}
                          className="object-contain mx-auto"
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }} />
                        <span className="text-xs font-medium text-stone-600">{platform.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Rating Bars */}
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { platform: "Zomato", rating: 4.5, reviews: "262", color: "#E23744" },
                    { platform: "Swiggy", rating: 4.7, reviews: "52", color: "#FC8019" },
                    { platform: "Google", rating: 4.1, reviews: "42", color: "#4285F4" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.platform}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-stone-800">{item.platform}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(item.rating) ? "text-amber-500 fill-current" : "text-stone-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-stone-800">{item.rating}/5</div>
                          <div className="text-xs text-stone-500">{item.reviews} reviews</div>
                        </div>
                      </div>

                      <div className="relative h-3 bg-stone-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.rating / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                          className="h-full rounded-full relative"
                          style={{ backgroundColor: item.color }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
                        </motion.div>
                      </div>

                      <div className="text-center">
                        <span className="text-sm font-medium" style={{ color: item.color }}>
                          Excellent Rating
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

               {/* Trust Indicators */}
<div className="mt-12 pt-8 border-t border-stone-200">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    {[
      { label: "Verified Reviews", value: "4.9k+", icon: <FaCheckCircle className="text-blue-600 text-2xl" /> },
      { label: "Response Rate", value: "98%", icon: <FaBolt className="text-yellow-500 text-2xl" /> },
      { label: "On-Time Delivery", value: "95%", icon: <FaRocket className="text-green-500 text-2xl" /> },
      { label: "Quality Score", value: "A+", icon: <FaStar className="text-orange-400 text-2xl" /> },
    ].map((indicator, index) => (
      <FadeInView key={indicator.label} delay={0.8 + index * 0.1}>
        <div className="space-y-2">
          <div>{indicator.icon}</div>
          <div className="font-bold text-lg text-stone-800">{indicator.value}</div>
          <div className="text-sm text-stone-600">{indicator.label}</div>
        </div>
      </FadeInView>
    ))}
  </div>
</div>             </div>
            </FadeInView>

            {/* Enhanced Customer Testimonials */}
            <FadeInView delay={0.6}>
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4">What Our Customers Say</h3>
                <div className="w-16 h-[2px] bg-amber-700/60 mx-auto mb-4"></div>
                <p className="text-stone-600">Real reviews from real coffee lovers</p>
              </div>
            </FadeInView>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Priya Sharma",
                  role: "Regular Customer",
                  review:
                    "Umber has completely changed my morning routine. Their specialty coffee is consistently excellent, and the grab-and-go concept is perfect for my busy schedule. The quality never disappoints!",
                  rating: 5,
                  platform: "Google",
                  avatar: "PS",
                  verified: true,
                  date: "2 weeks ago",
                },
                {
                  name: "Meera Patel",
                  role: "Local Foodie",
                  review:
                    "The attention to detail at Umber is remarkable. Every cup tells a story, and you can taste the passion in their brewing. It's not just coffee; it's an experience that brightens my day.",
                  rating: 5,
                  platform: "Swiggy",
                  avatar: "MP",
                  verified: true,
                  date: "3 weeks ago",
                },
                {
                  name: "Arjun Iyer",
                  role: "Coffee Enthusiast",
                  review:
                    "Umber's commitment to quality is evident in every sip. Their specialty drinks are a revelation, and I love that they focus on clean ingredients. It's refreshing to find a coffee shop that truly cares.",
                  rating: 4,
                  platform: "Zomato",
                  avatar: "AI",
                  verified: true,
                  date: "1 month ago",
                },
              ].map((testimonial, index) => (
                <FadeInView key={testimonial.name} delay={0.8 + index * 0.1}>
                  <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 h-full group hover:-translate-y-1">
                    <CardContent className="p-8">
                      {/* Rating Stars */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
                          ))}
                        </div>
                        {testimonial.verified && (
                          <div className="flex items-center gap-1 text-green-600 text-xs">
                            <span>✓</span>
                            <span>Verified</span>
                          </div>
                        )}
                      </div>

                      {/* Review Text */}
                      <blockquote className="text-stone-700 leading-relaxed mb-6 italic">
                        "{testimonial.review}"
                      </blockquote>

                      {/* Customer Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{testimonial.avatar}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-stone-800">{testimonial.name}</p>
                            <p className="text-stone-500 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                testimonial.platform === "Google"
                                  ? "bg-blue-500"
                                  : testimonial.platform === "Zomato"
                                    ? "bg-red-500"
                                    : "bg-orange-500"
                              }`}
                            />
                            <span className="text-xs text-stone-500">{testimonial.platform}</span>
                          </div>
                          <p className="text-xs text-stone-400">{testimonial.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInView>
              ))}
            </div>

            {/* Call to Action */}
            <FadeInView delay={1.2}>
              <div className="text-center bg-gradient-to-r from-amber-700 to-amber-800 rounded-3xl p-12 text-white">
                <h3 className="text-2xl md:text-3xl font-serif mb-4">Join Our Coffee Community</h3>
                <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who trust Umber for their daily coffee ritual. Experience the
                  difference that quality, passion, and dedication make.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/menu">
                    <Button className="bg-white text-amber-800 hover:bg-amber-50 rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      Try Our Coffee
                    </Button>
                  </Link>
                  <Link href="/locations">
                    <Button
                      variant="outline"
                      className="border-white/30 text-white bg-white/20 hover:bg-white/10 rounded-full px-8 py-3 backdrop-blur-sm"
                    >
                      Visit Us Today
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInView>
          </div>
        </section>


        {/* Newsletter Section */}
        <section
          className="relative overflow-hidden bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 py-20 text-white"
          aria-labelledby="newsletter-heading"
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-700 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600 rounded-full opacity-30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-amber-500 opacity-10 blur-[120px] pointer-events-none" />

          <motion.div
            className="relative z-10 container mx-auto px-4 md:px-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <BlurredTextReveal>
              <h2 id="newsletter-heading" className="text-4xl md:text-5xl font-serif mb-6 leading-snug tracking-tight">
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
              onSubmit={(e) => {
                e.preventDefault()
                toast.success("Thank you for subscribing!")
                ;(e.target as HTMLFormElement).reset()
              }}
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
                  className="w-full h-full py-3 px-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full sm:rounded-r-none sm:rounded-l-full focus:outline-none focus:ring-2 focus:ring-amber-300 text-white placeholder:text-white/70 transition-all duration-200"
                />
              </div>
              <Button
                type="submit"
                className="h-full px-8 py-3 bg-white text-amber-900 hover:bg-amber-100 rounded-full sm:rounded-l-none sm:rounded-r-full font-semibold transition-all duration-200 shadow-md"
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
      <Footer />
    </div>
  )
}
