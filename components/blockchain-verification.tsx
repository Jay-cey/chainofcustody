"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, ExternalLink } from "lucide-react"
import { verifyEvidenceHash, getChainOfCustody } from "@/lib/blockchain"

interface BlockchainVerificationProps {
  evidenceHash: string
  itemNumber: string
}

export function BlockchainVerification({ evidenceHash, itemNumber }: BlockchainVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [custodyHistory, setCustodyHistory] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)
    try {
      const result = await verifyEvidenceHash(evidenceHash, "0x742d35Cc6634C0532925a3b844Bc9e7595f42e0")
      setVerificationResult(result)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleLoadHistory = async () => {
    setIsLoadingHistory(true)
    try {
      const history = await getChainOfCustody(evidenceHash)
      setCustodyHistory(history)
      setShowHistory(true)
    } finally {
      setIsLoadingHistory(false)
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
            <Button
              onClick={handleLoadHistory}
              disabled={isLoadingHistory}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              {isLoadingHistory ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "View Custody History"
              )}
            </Button>
          </div>

          {verificationResult && (
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
                    {new Date(verificationResult.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">Immutable Proof</Badge>
            </div>
          )}

          {showHistory && custodyHistory.length > 0 && (
            <div className="space-y-3 border-t border-border pt-4">
              <p className="font-medium text-foreground">Blockchain Custody History</p>
              {custodyHistory.map((event, index) => (
                <div key={index} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {event.fromCustodian} → {event.toCustodian}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.confirmed ? "Confirmed" : "Pending"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Transaction</p>
                      <p className="font-mono text-foreground truncate">{event.transactionHash}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gas Used</p>
                      <p className="text-foreground">{event.gasUsed}</p>
                    </div>
                  </div>
                  <a
                    href={`https://etherscan.io/tx/${event.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    View on Etherscan
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
