"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Copy, ExternalLink, RotateCw } from "lucide-react"

interface CryptographicIntegrityVerificationProps {
  originalHash: string
  currentHash: string
  itemNumber: string
  verificationTime: string
  blockchainConfirmed: boolean
  blockNumber?: string
}

export function CryptographicIntegrityVerification({
  originalHash,
  currentHash,
  itemNumber,
  verificationTime,
  blockchainConfirmed,
  blockNumber,
}: CryptographicIntegrityVerificationProps) {
  const [copied, setCopied] = useState(false)
  const isVerified = originalHash === currentHash

  const handleCopy = () => {
    navigator.clipboard.writeText(currentHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <div>
            <CardTitle className="text-lg">Cryptographic Integrity Verification</CardTitle>
            <CardDescription>File authenticity and integrity status</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Original Hash */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Original Hash (at upload)</label>
          <div className="bg-background p-4 rounded-lg border border-border">
            <p className="font-mono text-sm break-all text-foreground">{originalHash}</p>
          </div>
        </div>

        {/* Current Hash */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Current Hash (verified now)</label>
          <div className="bg-background p-4 rounded-lg border border-border">
            <p className="font-mono text-sm break-all text-foreground">{currentHash}</p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-background p-4 rounded-lg border border-green-200 dark:border-green-800 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-700 dark:text-green-300">
              {isVerified ? "VERIFIED - File is original and unmodified" : "MISMATCH - File has been modified"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Hash Algorithm</p>
              <p className="font-medium text-foreground">SHA-256 (NIST FIPS 180-4)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Verification Time</p>
              <p className="font-medium text-foreground">{verificationTime}</p>
            </div>
          </div>

          {blockchainConfirmed && (
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm text-foreground">Blockchain Confirmation: Block #{blockNumber}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-2 bg-background">
            <RotateCw className="w-4 h-4" />
            Re-verify Now
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-background" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
            {copied ? "Copied" : "Copy Hash"}
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-background">
            <ExternalLink className="w-4 h-4" />
            View on Chain
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
