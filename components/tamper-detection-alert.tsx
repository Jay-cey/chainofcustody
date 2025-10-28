"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone } from "lucide-react"

interface TamperDetectionAlertProps {
  expectedHash: string
  currentHash: string
  itemNumber: string
}

export function TamperDetectionAlert({ expectedHash, currentHash, itemNumber }: TamperDetectionAlertProps) {
  return (
    <Card className="border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-red-900 dark:text-red-100">CRITICAL: INTEGRITY VIOLATION DETECTED</h3>
            <p className="text-red-800 dark:text-red-200 mt-2">
              This evidence has been MODIFIED since original upload!
            </p>
          </div>
        </div>

        <div className="bg-background p-4 rounded-lg border border-red-200 dark:border-red-800 space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">Expected Hash</p>
            <p className="font-mono text-sm text-foreground break-all">{expectedHash}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Hash</p>
            <p className="font-mono text-sm text-foreground break-all">{currentHash}</p>
          </div>
        </div>

        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <p className="font-bold text-red-900 dark:text-red-100 mb-3">This evidence is NOT admissible in court</p>
          <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Incident logged to audit trail</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Supervisor notified via email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Evidence flagged for investigation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Access restricted pending review</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button className="gap-2 bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4" />
            Report Incident
          </Button>
          <Button variant="outline" className="gap-2 bg-background border-red-200 dark:border-red-800">
            <Phone className="w-4 h-4" />
            Contact Security Team
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
