"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function SecurityStatusDashboard() {
  const securityData = {
    systemHealth: "operational",
    lastSecurityScan: "2 hours ago",
    threatLevel: "low",
    failedLogins: 0,
    unauthorizedAttempts: 0,
    integrityViolations: 0,
    passwordExpirations: 3,
    mfaVerifications: 12,
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Security Status
            </CardTitle>
            <CardDescription>Real-time system security monitoring</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            View Full Report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Health */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">System Health</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              All Systems Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Security Scan</span>
            <span className="text-foreground">{securityData.lastSecurityScan}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Threat Level</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 capitalize">
              {securityData.threatLevel}
            </Badge>
          </div>
        </div>

        {/* Security Events */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Recent Security Events (Last 24 hours)</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">Failed login attempts</span>
              </div>
              <span className="font-medium text-foreground">{securityData.failedLogins}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">Unauthorized access attempts</span>
              </div>
              <span className="font-medium text-foreground">{securityData.unauthorizedAttempts}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">Integrity violations</span>
              </div>
              <span className="font-medium text-foreground">{securityData.integrityViolations}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-muted-foreground">Password expiration warnings</span>
              </div>
              <span className="font-medium text-foreground">{securityData.passwordExpirations}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">Successful MFA verifications</span>
              </div>
              <span className="font-medium text-foreground">{securityData.mfaVerifications}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="bg-transparent">
            View Full Security Report
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Report Incident
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
