"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ComplianceStatusOverview } from "@/components/compliance-status-overview"
import { ControlFamiliesStatus } from "@/components/control-families-status"
import { ComplianceAuditSchedule } from "@/components/compliance-audit-schedule"
import { Download, FileText } from "lucide-react"

export default function CompliancePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Compliance Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  NIST 800-53, ISO 27001, and CJIS Security Policy compliance status
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Export Report
                </Button>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <FileText className="w-4 h-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Compliance Status Overview */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Compliance Status Overview</h2>
            <ComplianceStatusOverview />
          </section>

          {/* Control Families */}
          <section>
            <ControlFamiliesStatus />
          </section>

          {/* Audit Schedule */}
          <section>
            <ComplianceAuditSchedule />
          </section>

          {/* Compliance Gaps */}
          <section>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Identified Compliance Gaps</CardTitle>
                <CardDescription>Outstanding items requiring remediation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      control: "CM-3",
                      name: "Configuration Change Control",
                      status: "In Progress",
                      dueDate: "2025-12-31",
                    },
                    {
                      control: "CM-5",
                      name: "Access Restrictions for Change",
                      status: "In Progress",
                      dueDate: "2025-12-31",
                    },
                    {
                      control: "IR-4",
                      name: "Incident Handling",
                      status: "Planned",
                      dueDate: "2026-01-31",
                    },
                    {
                      control: "IR-6",
                      name: "Incident Reporting",
                      status: "Planned",
                      dueDate: "2026-01-31",
                    },
                  ].map((gap, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {gap.control} - {gap.name}
                        </p>
                        <p className="text-xs text-muted-foreground">Due: {gap.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-muted-foreground">{gap.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Compliance Certifications */}
          <section>
            <Card className="border-border bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Active Compliance Certifications</CardTitle>
                <CardDescription>Current certifications and validations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "NIST 800-53 Rev 5", status: "Compliant", icon: "✓" },
                    { name: "ISO 27001:2013", status: "Certified", icon: "✓" },
                    { name: "ISO 27037:2012", status: "Compliant", icon: "✓" },
                    { name: "CJIS Security Policy v5.9", status: "Compliant", icon: "✓" },
                    { name: "FIPS 140-2", status: "Validated", icon: "✓" },
                    { name: "SOC 2 Type II", status: "In Progress", icon: "→" },
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <span className="text-lg font-bold text-primary">{cert.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">{cert.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  )
}
