"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Clock, User } from "lucide-react"

interface AuditEntry {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  status: "success" | "failed"
  details: string
}

interface AuditTrailProps {
  entries: AuditEntry[]
  title?: string
  description?: string
}

export function AuditTrail({
  entries,
  title = "Audit Trail",
  description = "Complete history of actions",
}: AuditTrailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id} className="border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {entry.status === "success" ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{entry.action}</p>
                        <p className="text-sm text-muted-foreground">{entry.resource}</p>
                        <Badge
                          className={
                            entry.status === "success"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }
                        >
                          {entry.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.details}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{entry.user}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{entry.timestamp}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No audit entries found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
