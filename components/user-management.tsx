"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit2, Trash2, UserIcon } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "investigator" | "evidence_custodian" | "viewer"
  agency: string
  status: "active" | "inactive"
  lastLogin: string
}

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Officer Smith",
    email: "smith@agency.gov",
    role: "investigator",
    agency: "Police Department",
    status: "active",
    lastLogin: "2024-10-18 14:32",
  },
  {
    id: "2",
    name: "Evidence Custodian",
    email: "custodian@agency.gov",
    role: "evidence_custodian",
    agency: "Police Department",
    status: "active",
    lastLogin: "2024-10-18 13:15",
  },
  {
    id: "3",
    name: "Lab Technician",
    email: "lab@agency.gov",
    role: "investigator",
    agency: "Forensics Lab",
    status: "active",
    lastLogin: "2024-10-17 10:45",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@agency.gov",
    role: "admin",
    agency: "Police Department",
    status: "active",
    lastLogin: "2024-10-18 09:00",
  },
  {
    id: "5",
    name: "Viewer Account",
    email: "viewer@agency.gov",
    role: "viewer",
    agency: "District Attorney",
    status: "inactive",
    lastLogin: "2024-10-10 15:20",
  },
]

const roleColors = {
  admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  investigator: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  evidence_custodian: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  viewer: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddUser, setShowAddUser] = useState(false)

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.agency.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name, email, or agency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        <Button onClick={() => setShowAddUser(true)} className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        <UserIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{user.name}</p>
                          <Badge className={roleColors[user.role]}>{user.role.replace("_", " ")}</Badge>
                          <Badge className={statusColors[user.status]}>{user.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Agency:</span> {user.agency}
                    </div>
                    <div>
                      <span className="font-medium">Last Login:</span> {user.lastLogin}
                    </div>
                    <div>
                      <span className="font-medium">ID:</span> {user.id}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No users found matching your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockUsers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {mockUsers.filter((u) => u.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {mockUsers.filter((u) => u.role === "admin").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Agencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{new Set(mockUsers.map((u) => u.agency)).size}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
