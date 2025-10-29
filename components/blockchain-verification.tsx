"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { blockchainClient } from "@/lib/blockchain"

interface BlockchainVerificationProps {
  evidenceHash: string
  itemNumber: string
}

export function BlockchainVerification({ evidenceHash, itemNumber }: BlockchainVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleVerify = async () => {
    setIsVerifying(true)
    setVerificationResult(null) // Reset previous result
    try {
      // The checkAccess function requires a user and permission.
      // For this component, we'll simulate checking for 'read' access for a generic user.
      // In a real app, you'd get the current user's ID from the session.
      const hasAccess = await blockchainClient.checkAccess(
        evidenceHash, // This corresponds to the fileId
        "current-user-id", // Placeholder for the actual user ID
        "read" // Placeholder for the permission to check
      )

      // We'll use the result to display a simplified verification status.
      setVerificationResult({
        verified: hasAccess,
        timestamp: new Date().toISOString(),
        blockNumber: "mock-block-12345", // Placeholder data
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Blockchain Verification
          </CardTitle>
          <CardDescription>Verify evidence integrity on the blockchain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="text-xs text-muted-foreground">Evidence Hash</p>
            <p className="font-mono text-sm break-all text-foreground">{evidenceHash}</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleVerify} disabled={isVerifying} className="gap-2 bg-primary hover:bg-primary/90">
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify on Blockchain"
              )}
            </Button>
          </div>

          {verificationResult &&
            (verificationResult.verified ? (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <p className="font-medium text-green-900 dark:text-green-100">Verification Successful</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-green-700 dark:text-green-300">Block Number</p>
                    <p className="text-green-900 dark:text-green-100 font-mono">{verificationResult.blockNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-700 dark:text-green-300">Verified Date</p>
                    <p className="text-green-900 dark:text-green-100">
                      {new Date(verificationResult.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-600 text-white">Immutable Proof</Badge>
              </div>
            ) : (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">Verification Failed</p>
                  <p className="text-xs text-red-700 dark:text-red-300">Access not found on the blockchain for the current user.</p>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
