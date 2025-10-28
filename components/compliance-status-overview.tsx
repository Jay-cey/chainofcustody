"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function ComplianceStatusOverview() {
  const complianceData = [
    {
      name: "NIST 800-53 Controls",
      percentage: 87,
      implemented: 174,
      total: 200,
      status: "in-progress",
    },
    {
      name: "ISO 27001 Requirements",
      percentage: 94,
      implemented: 113,
      total: 120,
      status: "compliant",
    },
    {
      name: "CJIS Security Policy",
      percentage: 100,
      implemented: 45,
      total: 45,
      status: "compliant",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {complianceData.map((item) => (
        <Card key={item.name} className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base">{item.name}</CardTitle>
              {item.status === "compliant" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                <Badge
                  className={
                    item.status === "compliant"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }
                >
                  {item.status === "compliant" ? "Compliant" : "In Progress"}
                </Badge>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${item.status === "compliant" ? "bg-green-500" : "bg-yellow-500"}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {item.implemented} of {item.total} requirements
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
