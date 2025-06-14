"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Coffee, MapPin, Users, TrendingUp, Calendar, ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const [menuItems, setMenuItems] = useState([])
  const [locations, setLocations] = useState([])
  const [activeUsers, setActiveUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [menuResponse, locationsResponse, usersResponse] = await Promise.all([
          fetch("https://backendcoffee-1.onrender.com/api/menu"),
          fetch("https://backendcoffee-1.onrender.com/api/locations"),
          fetch("https://backendcoffee-1.onrender.com/api/leads"),
        ])

        const menuData = await menuResponse.json()
        const locationsData = await locationsResponse.json()
        const usersData = await usersResponse.json()

        setMenuItems(menuData)
        setLocations(locationsData)
        setActiveUsers(usersData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("adminToken") // or check cookie
    if (!token) {
      router.push("/admin/login")
    }
  }, [])

  const refreshData = async () => {
    setIsLoading(true)
    try {
      const [menuResponse, locationsResponse, usersResponse] = await Promise.all([
        fetch("https://backendcoffee-1.onrender.com/api/menu"),
        fetch("https://backendcoffee-1.onrender.com/api/locations"),
        fetch("https://backendcoffee-1.onrender.com/api/leads"),
      ])

      const menuData = await menuResponse.json()
      const locationsData = await locationsResponse.json()
      const usersData = await usersResponse.json()

      setMenuItems(menuData)
      setLocations(locationsData)
      setActiveUsers(usersData)
      setIsLoading(false)
    } catch (error) {
      console.error("Error refreshing data:", error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">Last updated: Today, 10:30 AM</span>
          <Button variant="outline" size="sm" onClick={refreshData}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Menu Items",
            value: isLoading ? "-" : menuItems.length.toString(),
            icon: Coffee,
            change: `${menuItems.length > 22 ? "+" : ""}${menuItems.length - 22} this week`,
            trend: menuItems.length >= 22 ? "up" : "neutral",
          },
          {
            title: "Locations",
            value: isLoading ? "-" : locations.length.toString(),
            icon: MapPin,
            change: `${locations.length > 3 ? "+" : ""}${locations.length - 3} this week`,
            trend: locations.length > 3 ? "up" : "neutral",
          },
          {
            title: "Active Users",
            value: isLoading ? "-" : activeUsers.length.toString(),
            icon: Users,
            change: `${activeUsers.length > 7 ? "+" : ""}${activeUsers.length - 7} this week`,
            trend: activeUsers.length > 7 ? "up" : "neutral",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-semibold">
                  {isLoading ? <div className="h-8 w-16 bg-neutral-200 animate-pulse rounded"></div> : stat.value}
                </h3>
              </div>
              <div className="p-2 bg-amber-50 rounded-md">
                <stat.icon className="h-5 w-5 text-amber-800" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              {isLoading ? (
                <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded"></div>
              ) : (
                <>
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-neutral-500"}>{stat.change}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Link href="/admin/activity" className="flex items-center text-amber-800 text-sm font-medium">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-neutral-200 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="h-3 w-1/2 bg-neutral-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {[
                {
                  user: "Admin",
                  action: "Added new menu item",
                  item: "Seasonal Latte",
                  time: "10 minutes ago",
                },
                {
                  user: "Admin",
                  action: "Updated location details",
                  item: "Manhattan",
                  time: "1 hour ago",
                },
                {
                  user: "Sarah",
                  action: "Updated menu item price",
                  item: "Avocado Toast",
                  time: "3 hours ago",
                },
                {
                  user: "John",
                  action: "Added new user",
                  item: "Barista account",
                  time: "Yesterday",
                },
                {
                  user: "Admin",
                  action: "Published new menu category",
                  item: "Seasonal Drinks",
                  time: "Yesterday",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-medium">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-xs text-amber-800 mt-1">
                      {activity.item} <span className="text-neutral-500">• {activity.time}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>

          <div className="space-y-3">
            <Link href="/admin/menu/add">
              <Button className="w-full justify-between bg-amber-800 hover:bg-amber-900">
                Add Menu Item
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/locations/add">
              <Button
                variant="outline"
                className="w-full justify-between border-amber-800 text-amber-800 hover:bg-amber-50"
              >
                Add Location
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/leads">
              <Button variant="outline" className="w-full justify-between">
                Add User
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#">
              <Button variant="outline" className="w-full justify-between">
                Update Settings
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200">
            <h3 className="text-sm font-medium mb-3">Upcoming</h3>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-16 bg-neutral-200 animate-pulse rounded"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-md border border-neutral-200">
                  <Calendar className="h-5 w-5 text-amber-800" />
                  <div>
                    <p className="text-sm font-medium">Menu Update</p>
                    <p className="text-xs text-neutral-500">Scheduled for tomorrow</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-md border border-neutral-200">
                  <Calendar className="h-5 w-5 text-amber-800" />
                  <div>
                    <p className="text-sm font-medium">Seasonal Promotion</p>
                    <p className="text-xs text-neutral-500">Starts next week</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
