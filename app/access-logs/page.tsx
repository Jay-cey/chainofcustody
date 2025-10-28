"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AccessLogsList } from "@/components/access-logs-list"

export default function AccessLogsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">Access Logs</h1>
            <p className="text-muted-foreground mt-1">Monitor system access and audit trail for compliance</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AccessLogsList />
        </main>
      </div>
    </ProtectedRoute>
  )
}
