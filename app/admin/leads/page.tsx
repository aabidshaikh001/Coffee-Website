"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Search,
  Filter,
  ArrowUpDown,
  Trash2,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  Download,
} from "lucide-react"

// Backend API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backendcoffee-1.onrender.com/api"

type Lead = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  createdAt: string
  status: "new" | "contacted" | "resolved"
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")
  

  // Fetch leads from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${API_URL}/leads`)

        if (!res.ok) {
          throw new Error("Failed to fetch leads")
        }

        const data = await res.json()
        setLeads(data)
      } catch (error: any) {
        console.error("Error fetching leads:", error)
        setError(error.message || "Failed to load leads")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  // Handle sort
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // In your LeadsPage component

const handleStatusChange = async (id: string, status: "new" | "contacted" | "resolved") => {
    try {
      // Validate ID before making the request
      if (!id) {
        throw new Error("Lead ID is missing");
      }
  
      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update lead status");
      }
  
      const updatedLead = await response.json();
  
      // Update state using the returned lead data
      setLeads(leads.map(lead => 
        lead.id === updatedLead._id ? { ...lead, status: updatedLead.status } : lead
      ));
      
    } catch (error: any) {
      console.error("Status update error:", {
        error: error.message,
        id, // Log the ID that caused the issue
        status
      });
      alert(`Update failed: ${error.message}`);
    }
  };
  // Handle delete lead
  const handleDeleteLead = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        const res = await fetch(`https://backendcoffee-1.onrender.com/api/leads/${id}`, {
          method: "DELETE",
        })

        if (!res.ok) {
          throw new Error("Failed to delete lead")
        }

        // Remove lead from state
        setLeads(leads.filter((lead) => lead.id !== id))
      } catch (error: any) {
        console.error("Error deleting lead:", error)
        alert("Failed to delete lead: " + error.message)
      }
    }
  }

  // Export leads as CSV
  const exportLeads = () => {
    // Create CSV content
    const headers = ["First Name", "Last Name", "Email", "Phone", "Message", "Status", "Created At"]
    const csvContent = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          `"${lead.firstName}"`,
          `"${lead.lastName}"`,
          `"${lead.email}"`,
          `"${lead.phone}"`,
          `"${lead.message.replace(/"/g, '""')}"`,
          `"${lead.status}"`,
          `"${new Date(lead.createdAt).toLocaleString()}"`,
        ].join(","),
      ),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `leads-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter and sort leads
  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.message.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortField === "createdAt") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      if (sortField === "name") {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
        return sortDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
      }

      return 0
    })

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center">
          <Link href="/admin" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Contact Form Leads</h1>
        </div>

        <Button
          onClick={exportLeads}
          className="bg-amber-800 hover:bg-amber-900 text-white"
          disabled={leads.length === 0}
        >
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      {/* Filters and search */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-neutral-500" />
            <select
  className="border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-800"
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="all">All Status</option>
  <option value="new">New</option>
  <option value="contacted">Contacted</option>
  <option value="resolved">Resolved</option>
</select>

          </div>
        </div>
      </div>

      {/* Leads table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Name
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Contact Info
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Message
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center gap-1">
                    Date
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-40 bg-neutral-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-full bg-neutral-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="h-8 w-20 bg-neutral-200 rounded animate-pulse ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-50">
                 
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">
                        {lead.firstName} {lead.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-neutral-500">
                          <Mail className="h-3.5 w-3.5 mr-1 text-neutral-400" />
                          <a href={`mailto:${lead.email}`} className="hover:text-amber-800">
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center text-sm text-neutral-500 mt-1">
                            <Phone className="h-3.5 w-3.5 mr-1 text-neutral-400" />
                            <a href={`tel:${lead.phone}`} className="hover:text-amber-800">
                              {lead.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-500 line-clamp-2">{lead.message}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-neutral-500">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-neutral-400" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <select
        value={lead.status}
        onChange={(e) => handleStatusChange(
          lead.id , // Handle both id and _id cases
          e.target.value as "new" | "contacted" | "resolved"
        )}
          className={`text-xs rounded-full px-2 py-1 font-medium border focus:outline-none focus:ring-1 focus:ring-amber-800 ${
            lead.status === "new"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : lead.status === "contacted"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-green-50 text-green-700 border-green-200"
          }`}
        >
  <option value="new">New</option>
  <option value="contacted">Contacted</option>
  <option value="resolved">Resolved</option>
</select>

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600"
                        onClick={() => handleDeleteLead(lead.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-neutral-500">
                    No leads found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && filteredLeads.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-neutral-200">
            <div className="text-sm text-neutral-500">
              Showing <span className="font-medium">{filteredLeads.length}</span> of{" "}
              <span className="font-medium">{leads.length}</span> leads
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
