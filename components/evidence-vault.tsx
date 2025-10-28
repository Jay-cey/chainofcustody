"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Search, FileIcon, Lock, Calendar, Hash } from "lucide-react"

interface EvidenceItem {
  id: string
  itemNumber: string
  description: string
  type: "physical" | "digital" | "document"
  status: "in-custody" | "transferred" | "released"
  caseNumber: string
  uploadDate: string
  fileSize: string
  hash: string
}

// Mock data
const mockEvidence: EvidenceItem[] = [
  {
    id: "1",
    itemNumber: "ITEM-001",
    description: "Physical evidence - Recovered item A",
    type: "physical",
    status: "in-custody",
    caseNumber: "CASE-2024-001",
    uploadDate: "2024-10-15",
    fileSize: "N/A",
    hash: "a1b2c3d4e5f6...",
  },
  {
    id: "2",
    itemNumber: "ITEM-002",
    description: "Digital evidence - USB drive contents",
    type: "digital",
    status: "in-custody",
    caseNumber: "CASE-2024-001",
    uploadDate: "2024-10-15",
    fileSize: "2.4 GB",
    hash: "f6e5d4c3b2a1...",
  },
  {
    id: "3",
    itemNumber: "ITEM-003",
    description: "Document - Incident report",
    type: "document",
    status: "in-custody",
    caseNumber: "CASE-2024-002",
    uploadDate: "2024-10-10",
    fileSize: "1.2 MB",
    hash: "9z8y7x6w5v4u...",
  },
]

const typeColors = {
  physical: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  digital: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  document: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
}

const statusColors = {
  "in-custody": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  transferred: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  released: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
}

export function EvidenceVault() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const filteredEvidence = mockEvidence.filter(
    (item) =>
      item.itemNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search evidence by item number, description, or case..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-input border-border"
        />
      </div>

      {/* Evidence Grid */}
      <div className="grid gap-4">
        {filteredEvidence.length > 0 ? (
          filteredEvidence.map((item) => (
            <Card
              key={item.id}
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => router.push(`/evidence/${item.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileIcon className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{item.itemNumber}</CardTitle>
                      <Badge className={typeColors[item.type]}>{item.type}</Badge>
                      <Badge className={statusColors[item.status]}>{item.status}</Badge>
                    </div>
                    <CardDescription className="text-base text-foreground/80">{item.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Hash className="w-4 h-4" />
                    <span className="truncate">{item.caseNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{item.uploadDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span className="truncate text-xs">{item.hash}</span>
                  </div>
                  <div className="text-muted-foreground">
                    <span>{item.fileSize}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No evidence items found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
