"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Eye, EyeOff, Download, Trash2 } from "lucide-react"

interface PrivacyControlsPanelProps {
  itemId: string
  canRedact: boolean
  canAnonymize: boolean
  canExport: boolean
  canDelete: boolean
}

export function PrivacyControlsPanel({
  itemId,
  canRedact,
  canAnonymize,
  canExport,
  canDelete,
}: PrivacyControlsPanelProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Privacy Controls</CardTitle>
        <CardDescription>Data subject rights and privacy actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Data Subject Rights */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Data Subject Rights</h4>

          <div className="space-y-2">
            {[
              {
                icon: Eye,
                label: "Right to Access",
                description: "View all personal data collected",
                enabled: true,
              },
              {
                icon: EyeOff,
                label: "Right to Erasure",
                description: "Request deletion of personal data",
                enabled: canDelete,
              },
              {
                icon: Download,
                label: "Right to Data Portability",
                description: "Export personal data in standard format",
                enabled: canExport,
              },
              {
                icon: CheckCircle2,
                label: "Right to Rectification",
                description: "Correct inaccurate personal data",
                enabled: true,
              },
            ].map((right) => {
              const Icon = right.icon
              return (
                <button
                  key={right.label}
                  disabled={!right.enabled}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                    right.enabled
                      ? "border-border bg-muted hover:bg-muted/80 cursor-pointer"
                      : "border-border/50 bg-muted/50 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 mt-0.5 ${right.enabled ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-foreground">{right.label}</p>
                    <p className="text-xs text-muted-foreground">{right.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Privacy Actions */}
        <div className="border-t border-border pt-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Privacy Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button variant="outline" size="sm" disabled={!canRedact} className="gap-2 bg-transparent">
              <EyeOff className="w-4 h-4" />
              Redact Sensitive Data
            </Button>
            <Button variant="outline" size="sm" disabled={!canAnonymize} className="gap-2 bg-transparent">
              <CheckCircle2 className="w-4 h-4" />
              Anonymize Data
            </Button>
            <Button variant="outline" size="sm" disabled={!canExport} className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!canDelete}
              className="gap-2 bg-transparent border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4" />
              Request Deletion
            </Button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="border-t border-border pt-4 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-900 dark:text-blue-100">
            All privacy actions are logged and require appropriate authorization. Data subjects can exercise their
            rights in accordance with GDPR, CCPA, and applicable privacy laws.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
