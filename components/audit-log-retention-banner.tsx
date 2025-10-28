"use client"

import { AlertCircle, Database, Lock } from "lucide-react"

export function AuditLogRetentionBanner() {
  const storageUsed = 234 // GB
  const storageTotal = 2000 // GB
  const storagePercentage = (storageUsed / storageTotal) * 100

  return (
    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-blue-900 dark:text-blue-100">Audit Log Retention Policy</p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
            Audit logs are retained for 7 years per CJIS Policy 5.4.1.2
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <Database className="w-4 h-4" />
            <span>Storage Usage</span>
          </div>
          <span className="font-medium text-blue-900 dark:text-blue-100">
            {storageUsed} GB / {storageTotal} GB
          </span>
        </div>
        <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 dark:bg-blue-400 transition-all"
            style={{ width: `${storagePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
        <Lock className="w-4 h-4" />
        <span>Logs are immutable and cryptographically signed</span>
      </div>
    </div>
  )
}
