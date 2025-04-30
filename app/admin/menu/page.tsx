"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus, Search, Edit, Trash2, Filter, ArrowUpDown, MoreHorizontal, Eye } from 'lucide-react'

type MenuItem = {
    id: string
    name: string
    category: string
    price: string
    status: string
    image: string
  }
export default function AdminMenuItems() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  
  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch("https://backendcoffee-production.up.railway.app/api/menu") // replace with your real API
        const data = await res.json()
        setMenuItems(data)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenuItems()
  }, [])
  
  // Filter menu items based on search and filters
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })
  
  const handleDeleteItem = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await fetch(`https://backendcoffee-production.up.railway.app/api/menu/${id}`, {
          method: "DELETE",
        })
        if (res.ok) {
          setMenuItems(menuItems.filter((item) => item.id !== id))
        } else {
          alert("Failed to delete item.")
        }
      } catch (error) {
        console.error("Error deleting item:", error)
        alert("Error deleting item.")
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-semibold">Menu Items</h1>
        <Link href="/admin/menu/add">
          <Button className="bg-amber-800 hover:bg-amber-900">
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </Link>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-neutral-500" />
              <select
                className="border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="coffee">Coffee</option>
                <option value="food">Food</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-neutral-500" />
              <select
                className="border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu items table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Item
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Category
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Price
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-neutral-200 rounded animate-pulse"></div>
                        <div className="ml-4">
                          <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">{item.name}</div>
                          <div className="text-xs text-neutral-500">ID: {item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/menu/${item.id}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4 text-neutral-500" />
                          </Button>
                        </Link>
                        <Link href={`/admin/menu/edit/${item.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4 text-amber-800" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-neutral-500">
                    No menu items found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!isLoading && filteredItems.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-neutral-200">
            <div className="text-sm text-neutral-500">
              Showing <span className="font-medium">{filteredItems.length}</span> of{" "}
              <span className="font-medium">{menuItems.length}</span> items
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
