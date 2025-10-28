"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, RotateCw, Shield } from "lucide-react"

export function KeyManagementDashboard() {
  const keyData = {
    masterKeyStatus: "Active",
    lastRotation: "2025-09-15",
    nextRotation: "2025-12-15",
    hsmStatus: "Connected",
    hsmModel: "Thales Luna HSM 7",
    keyEscrowStatus: "Enabled",
    emergencyRecoveryStatus: "Configured",
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Master Key Status */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Master Key Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {keyData.masterKeyStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Rotation</span>
              <span className="text-sm font-medium">{keyData.lastRotation}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Next Rotation</span>
              <span className="text-sm font-medium">{keyData.nextRotation}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent mt-2">
              <RotateCw className="w-4 h-4" />
              Rotate Key Now
            </Button>
          </CardContent>
        </Card>

        {/* HSM Status */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Hardware Security Module
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {keyData.hsmStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Model</span>
              <span className="text-sm font-medium">{keyData.hsmModel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">FIPS 140-2</span>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Level 3</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Escrow & Recovery */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Key Escrow & Emergency Recovery</CardTitle>
          <CardDescription>Backup and recovery procedures for critical keys</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-medium text-sm">Key Escrow</span>
              </div>
              <p className="text-xs text-muted-foreground">{keyData.keyEscrowStatus}</p>
              <p className="text-xs text-muted-foreground">Backup copies stored in secure vault</p>
            </div>

            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-medium text-sm">Emergency Recovery</span>
              </div>
              <p className="text-xs text-muted-foreground">{keyData.emergencyRecoveryStatus}</p>
              <p className="text-xs text-muted-foreground">Multi-party approval required</p>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium">Key Rotation Schedule</p>
              <p className="text-xs mt-1">
                Master keys are rotated every 90 days. Next rotation scheduled for {keyData.nextRotation}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
