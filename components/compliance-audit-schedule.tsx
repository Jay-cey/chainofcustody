"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle2 } from "lucide-react"

export function ComplianceAuditSchedule() {
  const auditInfo = {
    lastAudit: "2025-09-15",
    nextAudit: "2026-03-15",
    auditType: "Annual Comprehensive Audit",
    auditor: "Third-Party Compliance Firm",
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Compliance Audit Schedule
        </CardTitle>
        <CardDescription>Scheduled audits and compliance reviews</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-sm font-medium text-foreground">Last Audit</p>
            </div>
            <p className="text-lg font-bold text-foreground">{auditInfo.lastAudit}</p>
            <p className="text-xs text-muted-foreground">Completed successfully</p>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-foreground">Next Audit</p>
            </div>
            <p className="text-lg font-bold text-foreground">{auditInfo.nextAudit}</p>
            <p className="text-xs text-muted-foreground">Scheduled for annual review</p>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">Audit Type</p>
            <p className="text-sm font-medium text-foreground">{auditInfo.auditType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Auditor</p>
            <p className="text-sm font-medium text-foreground">{auditInfo.auditor}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
