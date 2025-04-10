'use client'
import Link from "next/link"
import { ReactNode } from "react"
import { LayoutDashboard, Coffee, MapPin, Users, Settings, LogOut, MenuIcon, ChevronDown } from 'lucide-react'

import { useRouter,usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
 
  const router = useRouter()
  const pathname = usePathname() // Add this line to get the current path

  // Check if we're on the login page
  const isLoginPage = pathname === "/admin/login"

  // If it's the login page, just render the children without the admin layout
  if (isLoginPage) {
    return <>{children}</>
  }


  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-neutral-200">
          <Link href="/admin" className="text-xl font-serif text-amber-800">
            umber <span className="text-neutral-500 text-sm font-sans">admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link 
                href="/admin" 
                className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-md"
              >
                <LayoutDashboard className="h-5 w-5 text-neutral-500" />
                Dashboard
              </Link>
            </li>
            <li>
              <details className="group [&[open]>summary]:bg-neutral-100">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-md">
                  <div className="flex items-center gap-3">
                    <Coffee className="h-5 w-5 text-neutral-500" />
                    Menu Management
                  </div>
                  <ChevronDown className="h-4 w-4 text-neutral-500 group-[&[open]]:rotate-180 transition-transform" />
                </summary>
                <ul className="mt-1 space-y-1 px-8">
                  <li>
                    <Link 
                      href="/admin/menu" 
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-md"
                    >
                      All Items
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/menu/add" 
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-md"
                    >
                      Add New Item
                    </Link>
                  </li>
                
                </ul>
              </details>
            </li>
            <li>
              <details className="group [&[open]>summary]:bg-neutral-100">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-md">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-neutral-500" />
                    Location Management
                  </div>
                  <ChevronDown className="h-4 w-4 text-neutral-500 group-[&[open]]:rotate-180 transition-transform" />
                </summary>
                <ul className="mt-1 space-y-1 px-8">
                  <li>
                    <Link 
                      href="/admin/locations" 
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-md"
                    >
                      All Locations
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/locations/add" 
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-md"
                    >
                      Add New Location
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link 
                href="/admin/leads" 
                className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-md"
              >
                <Users className="h-5 w-5 text-neutral-500" />
                User Management
              </Link>
            </li>
            <li>
              <Link 
                href="#" 
                className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-md"
              >
                <Settings className="h-5 w-5 text-neutral-500" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-neutral-200">
        <Link 
  href="#" 
  onClick={(e) => {
    e.preventDefault()
    localStorage.removeItem('adminToken')
    router.push('/admin/login') // works correctly in nested routes
  }}
  className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-md"
>
  <LogOut className="h-5 w-5 text-neutral-500" />
  Logout
</Link>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="bg-white border-b border-neutral-200 py-4 px-6 md:hidden sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="text-xl font-serif text-amber-800">
              umber <span className="text-neutral-500 text-sm font-sans">admin</span>
            </Link>
            <button className="p-2 rounded-md hover:bg-neutral-100">
              <MenuIcon className="h-6 w-6 text-neutral-700" />
            </button>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
