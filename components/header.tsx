"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MapPin, Coffee, ArrowRight } from "lucide-react"
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Locations", href: "/locations" },
    { name: "Menu", href: "/menu" },
  ]

  return (
    <>
      <header
        className="fixed w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-md shadow-sm py-3"
        role="banner"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
  <Link href="/" className="relative" aria-label="umber Coffee Home">
    <Image
      src="/logo.png" // Replace with your actual logo path
      alt="Umber Coffee Logo"
      width={100} // Adjust width
      height={40}  // Adjust height
      className="relative z-10 object-contain"
    />
   
  </Link>
</div>

            <div className="hidden lg:flex items-center space-x-8">
              <nav
                className="flex items-center space-x-8 text-sm font-medium"
                role="navigation"
                aria-label="Main navigation"
              >
                {navItems.map((item) => (
                  <div key={item.name}>
                   <Link
  href={item.href}
  className="transition-colors relative group tracking-wide text-stone-800 hover:text-amber-800"
>
  {item.name}
  <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full bg-amber-800" />
</Link>

                  </div>
                ))}
              </nav>

              <div className="flex items-center space-x-5">
                <Link href="/#locations">
                  <button
                    className="p-2 rounded-full transition-colors text-stone-600 hover:text-amber-800"
                    aria-label="Search"
                  >
                    <MapPin className="h-[18px] w-[18px]" />
                  </button>
                </Link>
                <Link href="/#menu">
                  <button
                    className="p-2 rounded-full transition-colors text-stone-600 hover:text-amber-800"
                    aria-label="Shopping bag"
                  >
                    <Coffee className="h-[18px] w-[18px]" />
                  </button>
                </Link>

                
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-4">
              <button className="p-2 rounded-full transition-colors text-stone-700" aria-label="Shopping bag">
                <Coffee className="h-5 w-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-full transition-colors text-stone-700"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 bg-gradient-to-br from-amber-900 to-amber-950 z-50 lg:hidden flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex justify-between items-center p-6">
          <Link href="/" className="relative" aria-label="umber Coffee Home">
  <Image
    src="/logo.png" // Replace this with your actual logo path in /public
    alt="Umber Coffee Logo"
    width={90} // Adjust to your design
    height={40}
    className="object-contain"
  />
</Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav
            className="flex flex-col items-center justify-center flex-1 space-y-7 text-lg"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}

       
          </nav>

          <div className="p-6 text-white/60 text-center text-sm">
            <p>© {new Date().getFullYear()} by umber Coffee</p>
          </div>
        </div>
      )}
    </>
  )
}
