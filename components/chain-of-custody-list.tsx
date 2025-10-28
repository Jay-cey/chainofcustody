"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Search, Lock, Calendar, User, ArrowRight } from "lucide-react"

interface CustodyRecord {
  id: string
  itemNumber: string
  description: string
  currentHolder: string
  previousHolder: string
  transferDate: string
  status: "in-transit" | "received" | "verified"
  caseNumber: string
}

// Mock data
const mockCustodyRecords: CustodyRecord[] = [
  {
    id: "1",
    itemNumber: "ITEM-001",
    description: "Physical evidence - Item A",
    currentHolder: "Evidence Custodian",
    previousHolder: "Officer Smith",
    transferDate: "2024-10-16",
    status: "verified",
    caseNumber: "CASE-2024-001",
  },
  {
    id: "2",
    itemNumber: "ITEM-002",
    description: "Digital evidence - USB drive",
    currentHolder: "Digital Forensics Lab",
    previousHolder: "Officer Johnson",
    transferDate: "2024-10-17",
    status: "received",
    caseNumber: "CASE-2024-001",
  },
  {
    id: "3",
    itemNumber: "ITEM-003",
    description: "Document - Incident report",
    currentHolder: "Records Department",
    previousHolder: "Evidence Custodian",
    transferDate: "2024-10-18",
    status: "in-transit",
    caseNumber: "CASE-2024-002",
  },
]

const statusColors = {
  "in-transit": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  received: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

export function ChainOfCustodyList() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const filteredRecords = mockCustodyRecords.filter(
    (record) =>
      record.itemNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by item number, description, or case..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-input border-border"
        />
      </div>

      {/* Custody Records Grid */}
      <div className="grid gap-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <Card
              key={record.id}
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => router.push(`/chain-of-custody/${record.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Lock className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{record.itemNumber}</CardTitle>
                      <Badge className={statusColors[record.status]}>{record.status}</Badge>
                    </div>
                    <CardDescription className="text-base text-foreground/80">{record.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span className="truncate">{record.previousHolder}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span className="truncate">{record.currentHolder}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{record.transferDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No custody records found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
