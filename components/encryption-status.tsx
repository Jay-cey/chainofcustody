"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface EncryptionStatusProps {
  itemNumber: string
}

export function EncryptionStatus({ itemNumber }: EncryptionStatusProps) {
  const encryptionData = {
    algorithm: "AES-256-GCM",
    keyLength: 256,
    inTransit: "TLS 1.3",
    atRest: "Encrypted",
    keyRotation: "45 days ago",
    fips140_2: true,
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Encryption Status</span>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Secured</Badge>
        </CardTitle>
        <CardDescription>Cryptographic protection details for this evidence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Algorithm</span>
            </div>
            <span className="text-sm text-foreground font-mono">{encryptionData.algorithm}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Key Length</span>
            </div>
            <span className="text-sm text-foreground font-mono">{encryptionData.keyLength} bits</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">In Transit</span>
            </div>
            <span className="text-sm text-foreground font-mono">{encryptionData.inTransit}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">At Rest</span>
            </div>
            <span className="text-sm text-foreground font-mono">{encryptionData.atRest}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Key Rotation</span>
            </div>
            <span className="text-sm text-foreground font-mono">Last rotated {encryptionData.keyRotation}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">FIPS 140-2</span>
            </div>
            <span className="text-sm text-foreground font-mono">Validated</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
