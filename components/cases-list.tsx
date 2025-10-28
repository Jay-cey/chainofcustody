"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Search, FileText, Calendar, User } from "lucide-react"

interface Case {
  id: string
  caseNumber: string
  title: string
  description: string
  status: "open" | "closed" | "archived"
  investigator: string
  createdDate: string
  evidenceCount: number
}

// Mock data
const mockCases: Case[] = [
  {
    id: "1",
    caseNumber: "CASE-2024-001",
    title: "Evidence Collection - Incident A",
    description: "Initial evidence collection and documentation",
    status: "open",
    investigator: "Officer Smith",
    createdDate: "2024-10-15",
    evidenceCount: 5,
  },
  {
    id: "2",
    caseNumber: "CASE-2024-002",
    title: "Chain of Custody Review",
    description: "Review and verification of evidence chain",
    status: "open",
    investigator: "Officer Johnson",
    createdDate: "2024-10-10",
    evidenceCount: 12,
  },
  {
    id: "3",
    caseNumber: "CASE-2024-003",
    title: "Completed Investigation",
    description: "Investigation completed and archived",
    status: "closed",
    investigator: "Officer Williams",
    createdDate: "2024-09-20",
    evidenceCount: 8,
  },
]

const statusColors = {
  open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  closed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

export function CasesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const filteredCases = mockCases.filter(
    (caseItem) =>
      caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search cases by number or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-input border-border"
        />
      </div>

      {/* Cases Grid */}
      <div className="grid gap-4">
        {filteredCases.length > 0 ? (
          filteredCases.map((caseItem) => (
            <Card
              key={caseItem.id}
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => router.push(`/cases/${caseItem.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{caseItem.caseNumber}</CardTitle>
                      <Badge className={statusColors[caseItem.status]}>{caseItem.status}</Badge>
                    </div>
                    <CardDescription className="text-base text-foreground/80">{caseItem.title}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">{caseItem.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{caseItem.investigator}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{caseItem.createdDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{caseItem.evidenceCount} items</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No cases found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
