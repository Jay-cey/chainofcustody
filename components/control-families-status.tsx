"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function ControlFamiliesStatus() {
  const controlFamilies = [
    { code: "AC", name: "Access Control", status: "compliant", implemented: 24, total: 24 },
    { code: "AU", name: "Audit & Accountability", status: "compliant", implemented: 16, total: 16 },
    { code: "IA", name: "Identification & Authentication", status: "compliant", implemented: 11, total: 11 },
    { code: "SC", name: "System & Communications Protection", status: "compliant", implemented: 44, total: 44 },
    { code: "CM", name: "Configuration Management", status: "in-progress", implemented: 23, total: 27 },
    { code: "IR", name: "Incident Response", status: "in-progress", implemented: 12, total: 15 },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>NIST 800-53 Control Families Status</CardTitle>
        <CardDescription>Detailed breakdown of security control implementation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {controlFamilies.map((family) => (
            <div key={family.code} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                {family.status === "compliant" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {family.code} - {family.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {family.implemented}/{family.total} controls
                  </p>
                </div>
              </div>
              <Badge
                className={
                  family.status === "compliant"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }
              >
                {family.status === "compliant" ? "100%" : `${Math.round((family.implemented / family.total) * 100)}%`}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
