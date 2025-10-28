"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, User, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface CustodyTimelineProps {
  itemId: string
}

// Mock timeline data
const mockTimeline = [
  {
    id: "1",
    action: "Evidence Received",
    actor: "Officer Smith",
    date: "2024-10-15",
    time: "14:30",
    status: "completed",
    details: "Initial intake at evidence facility",
    signature: "OS-2024-10-15",
  },
  {
    id: "2",
    action: "Hash Verification",
    actor: "Evidence Custodian",
    date: "2024-10-15",
    time: "15:45",
    status: "completed",
    details: "SHA-256 hash verified and recorded",
    signature: "EC-2024-10-15",
  },
  {
    id: "3",
    action: "Transferred to Lab",
    actor: "Digital Forensics Lab",
    date: "2024-10-16",
    time: "09:00",
    status: "completed",
    details: "Evidence transferred for digital analysis",
    signature: "DFL-2024-10-16",
  },
  {
    id: "4",
    action: "Analysis In Progress",
    actor: "Lab Technician",
    date: "2024-10-17",
    time: "10:30",
    status: "in-progress",
    details: "Forensic analysis underway",
    signature: "LT-2024-10-17",
  },
]

const statusIcons = {
  completed: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
  "in-progress": <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  pending: <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
}

export function CustodyTimeline({ itemId }: CustodyTimelineProps) {
  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card>
        <CardHeader>
          <CardTitle>Chain of Custody Timeline</CardTitle>
          <CardDescription>Complete handling history for evidence item</CardDescription>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {mockTimeline.map((entry, index) => (
          <div key={entry.id} className="relative">
            {/* Timeline Line */}
            {index !== mockTimeline.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-24 bg-border" />}

            {/* Timeline Entry */}
            <Card className="ml-16">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{entry.action}</CardTitle>
                      <Badge
                        className={
                          entry.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : entry.status === "in-progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </div>
                    <CardDescription>{entry.details}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{entry.actor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {entry.date} at {entry.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span className="font-mono text-xs">{entry.signature}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Dot */}
            <div className="absolute left-0 top-6 w-12 h-12 flex items-center justify-center">
              <div className="w-12 h-12 bg-card border-4 border-border rounded-full flex items-center justify-center">
                {statusIcons[entry.status as keyof typeof statusIcons]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
