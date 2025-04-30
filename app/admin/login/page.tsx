"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Coffee, Loader2, AlertCircle } from "lucide-react"



export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Make direct API call to login endpoint
      const response = await fetch(`https://backendcoffee-production.up.railway.app/api/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Invalid email or password")
      }

      const data = await response.json()

      // Store token and user data in localStorage
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("adminToken", data.token || "authenticated") // Add this line to store the token
        router.push("/admin");
      } else {
        throw new Error("Login failed. No user data received.");
      }
      
    } catch (err: any) {
      setError(err.message || "Invalid email or password")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
            <Coffee className="h-6 w-6 text-amber-800" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-serif text-neutral-900">
          umber <span className="text-neutral-500 text-lg font-sans">admin</span>
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">Sign in to access the admin dashboard</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-amber-800 focus:border-amber-800 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-amber-800 focus:border-amber-800 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
             

              <div className="text-sm">
                <a href="#" className="font-medium text-amber-800 hover:text-amber-900">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-900 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">Demo credentials</span>
              </div>
            </div>

            <div className="mt-4 bg-neutral-50 p-3 rounded-md text-sm text-neutral-700">
              <p>
                <strong>Email:</strong> admin@umber.coffee
              </p>
              <p>
                <strong>Password:</strong> password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

