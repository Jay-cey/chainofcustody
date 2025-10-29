"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, CheckCircle } from "lucide-react"

interface BlockDAGVerificationTabProps {
  itemNumber: string
  txHash: string
  height: number
  validationWeight: number
}

export function BlockDAGVerificationTab({
  itemNumber,
  txHash,
  height,
  validationWeight,
}: BlockDAGVerificationTabProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      {/* Verification Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>On-Network Verification Status</CardTitle>
              <CardDescription>BlockDAG ledger verification</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              ✅ VERIFIED ON BLOCKDAG
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Transaction Details */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">📋 Transaction Details</h4>
            <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">TX ID:</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono">{txHash.slice(0, 20)}...</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(txHash)} className="h-5 w-5 p-0">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Anchored Height:</span>
                <span className="font-mono">#{height}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="text-xs">{new Date().toISOString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Validation Weight:</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {validationWeight}% ✅
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Network:</span>
                <span>BlockDAG Testnet</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Fee:</span>
                <span>0.002 BDAG (~$0.001)</span>
              </div>
            </div>
          </div>

          {/* Submitted By */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">👤 Submitted By</h4>
            <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span>Officer Mike Johnson</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Badge:</span>
                <span>#3421</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Wallet:</span>
                <code className="text-xs font-mono">dag1qxy3A5c7B9d2F1e8...</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Signature:</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">✅ Verified</Badge>
              </div>
            </div>
          </div>

          {/* On-Network Custody Events */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">📊 On-Network Custody Events</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>INITIAL_UPLOAD</span>
                <code className="text-xs font-mono text-primary">dagtx1p8f3a2c9d...</code>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>CUSTODY_TRANSFER</span>
                <code className="text-xs font-mono text-primary">dagtx1p2b7e9f3a4c8d...</code>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>FORENSIC_ANALYSIS</span>
                <code className="text-xs font-mono text-primary">dagtx1p9c4f1a7b8e2d...</code>
              </div>
            </div>
          </div>

          {/* Cryptographic Proof */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">🔐 Cryptographic Proof</h4>
            <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">SHA-256:</span>
                <code className="text-xs font-mono flex-1 truncate">a7f3c9d2e8b1f4a6c3d7e9f2b8a4c6d8</code>
              </div>
              <p className="text-xs text-muted-foreground">Stored immutably on the BlockDAG ledger.</p>
            </div>
          </div>

          <Button
            className="w-full gap-2 bg-primary hover:bg-primary/90"
            onClick={() => window.open("https://explorer.blockdag.io/", "_blank")}
          >
            <ExternalLink className="w-4 h-4" />
            View on DAG Explorer
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
