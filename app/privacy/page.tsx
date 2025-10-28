"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataClassificationBadge } from "@/components/data-classification-badge"
import { Download, FileText } from "lucide-react"

export default function PrivacyPage() {
  const dataInventory = [
    {
      id: "1",
      name: "Officer Personal Information",
      classification: "confidential" as const,
      records: 245,
      pii: true,
      phi: false,
      pci: false,
    },
    {
      id: "2",
      name: "Witness Statements",
      classification: "restricted" as const,
      records: 1203,
      pii: true,
      phi: false,
      pci: false,
    },
    {
      id: "3",
      name: "Medical Evidence",
      classification: "restricted" as const,
      records: 89,
      pii: false,
      phi: true,
      pci: false,
    },
    {
      id: "4",
      name: "Financial Records",
      classification: "confidential" as const,
      records: 156,
      pii: false,
      phi: false,
      pci: true,
    },
    {
      id: "5",
      name: "Case Reports",
      classification: "internal" as const,
      records: 567,
      pii: false,
      phi: false,
      pci: false,
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Privacy & Data Classification</h1>
                <p className="text-muted-foreground mt-1">
                  Manage data sensitivity levels, privacy controls, and data subject rights
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Export Inventory
                </Button>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <FileText className="w-4 h-4" />
                  Privacy Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Data Classification Overview */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Data Classification Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { level: "public" as const, count: 0, description: "No restrictions" },
                { level: "internal" as const, count: 567, description: "Internal use" },
                { level: "confidential" as const, count: 401, description: "Limited access" },
                { level: "restricted" as const, count: 1292, description: "Need-to-know" },
              ].map((item) => (
                <Card key={item.level} className="border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        <DataClassificationBadge level={item.level} />
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-2xl font-bold text-foreground">{item.count}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Data Inventory */}
          <section>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Data Inventory</CardTitle>
                <CardDescription>Classification and sensitivity of all data categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dataInventory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {item.pii && (
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded">
                              PII
                            </span>
                          )}
                          {item.phi && (
                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded">
                              PHI
                            </span>
                          )}
                          {item.pci && (
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
                              PCI
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">{item.records} records</span>
                        </div>
                      </div>
                      <DataClassificationBadge level={item.classification} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Privacy Regulations */}
          <section>
            <Card className="border-border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle>Privacy Regulations Compliance</CardTitle>
                <CardDescription>Applicable privacy laws and regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "GDPR",
                      description: "General Data Protection Regulation (EU)",
                      status: "Compliant",
                    },
                    {
                      name: "CCPA",
                      description: "California Consumer Privacy Act",
                      status: "Compliant",
                    },
                    {
                      name: "HIPAA",
                      description: "Health Insurance Portability and Accountability Act",
                      status: "Compliant",
                    },
                    {
                      name: "FERPA",
                      description: "Family Educational Rights and Privacy Act",
                      status: "Compliant",
                    },
                  ].map((reg) => (
                    <div
                      key={reg.name}
                      className="p-4 bg-background rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <p className="font-medium text-foreground">{reg.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{reg.description}</p>
                      <p className="text-xs font-medium text-green-700 dark:text-green-300 mt-2">✓ {reg.status}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Data Retention Policy */}
          <section>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Data Retention Policy</CardTitle>
                <CardDescription>Retention periods by data classification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { classification: "Public", retention: "1 Year", reason: "No sensitive data" },
                    { classification: "Internal", retention: "3 Years", reason: "Standard business records" },
                    { classification: "Confidential", retention: "5 Years", reason: "Regulatory requirement" },
                    { classification: "Restricted", retention: "7 Years", reason: "CJIS Policy 5.4.1.2" },
                  ].map((policy, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{policy.classification}</p>
                        <p className="text-xs text-muted-foreground">{policy.reason}</p>
                      </div>
                      <p className="text-sm font-medium text-foreground">{policy.retention}</p>
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
