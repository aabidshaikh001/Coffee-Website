"use client";

import { usePathname } from 'next/navigation';
import { MapPin, ArrowRight, Menu, X, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const AnimatedHeader = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const navItems = [
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Locations", href: "/locations" },
    { name: "Menu", href: "/menu" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    setIsLoaded(true);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
            <Link href="/" className="text-3xl font-serif tracking-wide relative" aria-label="umber Coffee Home">
              <span className={`relative z-10 ${scrollY > 50 ? "text-stone-800" : "text-white"}`}>umber</span>
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
                  aria-label="Locations"
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
                  aria-label="Menu"
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
              aria-label="Menu"
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
              <Link href="/" className="text-3xl font-serif tracking-wide text-white" aria-label="umber Coffee Home">
                umber
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
              <p>© {new Date().getFullYear()} by umber Coffee</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const SimpleHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Locations", href: "/locations" },
    { name: "Menu", href: "/menu" },
  ];

  return (
    <>
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm py-3" role="banner">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl font-serif tracking-wide text-stone-800" aria-label="umber Coffee Home">
              umber
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-8 text-sm font-medium" role="navigation" aria-label="Main navigation">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className="text-stone-700 hover:text-amber-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-5">
                <Link href="/#locations" className="p-2 rounded-full text-stone-600 hover:text-amber-800">
                  <MapPin className="h-[18px] w-[18px]" />
                </Link>
                <Link href="/#menu" className="p-2 rounded-full text-stone-600 hover:text-amber-800">
                  <Coffee className="h-[18px] w-[18px]" />
                </Link>
                <Link href="#contact">
                  <Button className="bg-amber-800 hover:bg-amber-900 text-white rounded-full px-6 text-sm font-medium shadow-sm">
                    Book A Seat
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-4">
              <button className="p-2 rounded-full text-stone-700">
                <Coffee className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-full text-stone-700"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-amber-900 to-amber-950 z-50 lg:hidden flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center p-6">
              <Link href="/" className="text-3xl font-serif tracking-wide text-white" onClick={() => setMobileMenuOpen(false)}>
                umber
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
              <p>© {new Date().getFullYear()} by umber Coffee</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Header = () => {
  const pathname = usePathname();
  
  if (pathname === '/') {
    return <AnimatedHeader />;
  }
  
  return <SimpleHeader />;
};