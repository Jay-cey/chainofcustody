"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, CheckCircle2, AlertCircle, Copy } from "lucide-react"

interface AuditLogEntryProps {
  timestamp: string
  user: string
  badge: string
  action: string
  resource: string
  result: "success" | "failed" | "unauthorized"
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

export function EnhancedAuditLogEntry({
  timestamp,
  user,
  badge,
  action,
  resource,
  result,
  ipAddress,
  geolocation,
  device,
  browser,
  sessionId,
  hash,
  mfaStatus,
  permissionLevel,
  caseAccess,
  encryption,
}: AuditLogEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const resultIcon =
    result === "success" ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-600" />
    )
  const resultColor =
    result === "success"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"

  return (
    <Card className="border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="mt-1">{resultIcon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono text-muted-foreground">{timestamp}</span>
              <Badge className={resultColor}>{result}</Badge>
            </div>
            <p className="font-medium text-foreground mb-1">
              {user} ({badge}) - {action}
            </p>
            <p className="text-sm text-muted-foreground">{resource}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border bg-muted/30 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">Technical Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Address:</span>
                  <span className="font-mono text-foreground">{ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Geolocation:</span>
                  <span className="text-foreground">{geolocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Device:</span>
                  <span className="text-foreground">{device}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Browser:</span>
                  <span className="text-foreground">{browser}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Session ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-foreground">{sessionId}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hash Verified:</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="font-mono text-xs text-foreground">{hash}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">Security Context</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">MFA Status:</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">{mfaStatus}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Permission Level:</span>
                  <span className="text-foreground">{permissionLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Case Access:</span>
                  <span className="text-foreground">{caseAccess}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Encryption:</span>
                  <span className="text-foreground">{encryption}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">Compliance</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">NIST AU-2</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">NIST AU-3</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">ISO 27001 A.12.4.1</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">CJIS 5.4</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
