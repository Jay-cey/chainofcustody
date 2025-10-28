"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedAuditLogEntry } from "@/components/enhanced-audit-log-entry"
import { AuditLogRetentionBanner } from "@/components/audit-log-retention-banner"

interface AccessLog {
  id: string
  timestamp: string
  user: string
  badge: string
  action: string
  resource: string
  resourceType: "case" | "evidence" | "report" | "settings"
  status: "success" | "failed" | "unauthorized"
  ipAddress: string
  geolocation: string
  device: string
  browser: string
  sessionId: string
  hash: string
  mfaStatus: string
  permissionLevel: string
  caseAccess: string
  encryption: string
}

// Mock access logs data
const mockAccessLogs: AccessLog[] = [
  {
    id: "1",
    timestamp: "2025-10-28 14:32:15.847 UTC",
    user: "Detective Sarah Chen",
    badge: "#4782",
    action: "EVIDENCE_DOWNLOADED",
    resource: "EVD-2025-10284-A7F3 (Dashcam Video)",
    resourceType: "evidence",
    status: "success",
    ipAddress: "192.168.1.45",
    geolocation: "NYPD 19th Precinct, Manhattan",
    device: "iPad Pro (iOS 17.1)",
    browser: "Safari 17.0",
    sessionId: "sess_a7f3c9d2e8b1",
    hash: "a7f3c9d2e8b1f4a6c3d7e9f2b8a4c6d8",
    mfaStatus: "Verified",
    permissionLevel: "Detective (Full Access)",
    caseAccess: "Authorized via Case #2025-CR-10284",
    encryption: "TLS 1.3 with Perfect Forward Secrecy",
  },
  {
    id: "2",
    timestamp: "2025-10-28 13:15:42.521 UTC",
    user: "Officer Mike Johnson",
    badge: "#3421",
    action: "EVIDENCE_UPLOADED",
    resource: "EVD-2025-10284-B2F8 (Physical Evidence)",
    resourceType: "evidence",
    status: "success",
    ipAddress: "192.168.1.50",
    geolocation: "NYPD Central Evidence Unit",
    device: "Desktop (Windows 11)",
    browser: "Chrome 119.0",
    sessionId: "sess_b2f8d4e1a9c3",
    hash: "b2f8d4e1a9c3f5b7d9e1f3a5c7b9d1e3",
    mfaStatus: "Verified",
    permissionLevel: "Officer (Standard Access)",
    caseAccess: "Authorized via Case #2025-CR-10284",
    encryption: "TLS 1.3 with Perfect Forward Secrecy",
  },
  {
    id: "3",
    timestamp: "2025-10-28 12:45:30.103 UTC",
    user: "Unknown User",
    badge: "N/A",
    action: "UNAUTHORIZED_ACCESS_ATTEMPT",
    resource: "CASE-2025-10284 (Restricted Case)",
    resourceType: "case",
    status: "unauthorized",
    ipAddress: "203.0.113.45",
    geolocation: "External Network",
    device: "Unknown",
    browser: "Unknown",
    sessionId: "N/A",
    hash: "N/A",
    mfaStatus: "Failed",
    permissionLevel: "None",
    caseAccess: "Denied - Insufficient Permissions",
    encryption: "N/A",
  },
]

const statusColors = {
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  unauthorized: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function AccessLogsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "failed" | "unauthorized">("all")

  const filteredLogs = mockAccessLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || log.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Retention Banner */}
      <AuditLogRetentionBanner />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by user, resource, or action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
          className="px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="unauthorized">Unauthorized</option>
        </select>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export Logs
        </Button>
      </div>

      {/* Enhanced Audit Logs */}
      <div className="space-y-3">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <EnhancedAuditLogEntry
              key={log.id}
              timestamp={log.timestamp}
              user={log.user}
              badge={log.badge}
              action={log.action}
              resource={log.resource}
              result={log.status}
              ipAddress={log.ipAddress}
              geolocation={log.geolocation}
              device={log.device}
              browser={log.browser}
              sessionId={log.sessionId}
              hash={log.hash}
              mfaStatus={log.mfaStatus}
              permissionLevel={log.permissionLevel}
              caseAccess={log.caseAccess}
              encryption={log.encryption}
            />
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <p>No access logs found matching your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Compliance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Access Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockAccessLogs.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Successful Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {mockAccessLogs.filter((l) => l.status === "success").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Authorized access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {mockAccessLogs.filter((l) => l.status !== "success").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Unauthorized attempts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
