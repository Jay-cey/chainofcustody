"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Eye, Share2, Trash2 } from "lucide-react"
import { DataClassificationBadge } from "@/components/data-classification-badge"

interface DataSensitivityPanelProps {
  classification: "public" | "internal" | "confidential" | "restricted"
  pii: boolean
  phi: boolean
  pci: boolean
  containsSensitiveInfo: boolean
}

export function DataSensitivityPanel({
  classification,
  pii,
  phi,
  pci,
  containsSensitiveInfo,
}: DataSensitivityPanelProps) {
  const sensitivityLevels = [
    { icon: Eye, label: "Visibility", value: "Law Enforcement Only" },
    { icon: Share2, label: "Sharing", value: "Restricted to Case Team" },
    { icon: Lock, label: "Encryption", value: "AES-256 at Rest & TLS 1.3 in Transit" },
    { icon: Trash2, label: "Retention", value: "7 Years (CJIS Policy)" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Data Sensitivity & Classification</CardTitle>
            <CardDescription>Privacy and data handling requirements</CardDescription>
          </div>
          <DataClassificationBadge level={classification} size="lg" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sensitivity Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "PII", value: pii, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
            {
              label: "PHI",
              value: phi,
              color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            },
            {
              label: "PCI",
              value: pci,
              color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
            },
            {
              label: "Sensitive Info",
              value: containsSensitiveInfo,
              color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            },
          ].map((indicator) => (
            <div key={indicator.label} className="text-center">
              <Badge className={`${indicator.color} w-full justify-center`}>{indicator.label}</Badge>
              <p className="text-xs text-muted-foreground mt-1">{indicator.value ? "Present" : "Not Present"}</p>
            </div>
          ))}
        </div>

        {/* Handling Requirements */}
        <div className="border-t border-border pt-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Data Handling Requirements</h4>
          {sensitivityLevels.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Privacy Compliance */}
        <div className="border-t border-border pt-4 space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Privacy Compliance</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">GDPR Compliant</span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Yes</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">CCPA Compliant</span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Yes</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Data Subject Rights</span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Enabled</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
