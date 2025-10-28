"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, CheckCircle } from "lucide-react"
import { getBlockchainStatus } from "@/lib/blockchain"

export function BlockchainIntegrationPanel() {
  const status = getBlockchainStatus()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Network Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Blockchain Network Status
          </CardTitle>
          <CardDescription>Current blockchain connection and configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Network</p>
              <p className="text-sm font-medium text-foreground">{status.network}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge className="bg-green-600 text-white w-fit">{status.status}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Gas Price</p>
              <p className="text-sm font-medium text-foreground">{status.gasPrice}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Last Sync</p>
              <p className="text-sm font-medium text-foreground">{new Date(status.lastSync).toLocaleTimeString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Configuration</CardTitle>
          <CardDescription>Evidence management smart contract details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Contract Address</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-muted p-3 rounded-lg text-sm font-mono text-foreground break-all">
                {status.contractAddress}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(status.contractAddress)}
                className="bg-transparent"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2 bg-transparent flex-1"
              onClick={() => window.open(`https://etherscan.io/address/${status.contractAddress}`, "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
              View on Etherscan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Blockchain Transactions</CardTitle>
          <CardDescription>Latest evidence submissions and custody transfers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              type: "Evidence Upload",
              hash: "0xabc123def456",
              status: "confirmed",
              time: "2 hours ago",
            },
            {
              type: "Custody Transfer",
              hash: "0x789ghi012jkl",
              status: "confirmed",
              time: "4 hours ago",
            },
            {
              type: "Evidence Upload",
              hash: "0xmno345pqr678",
              status: "confirmed",
              time: "1 day ago",
            },
          ].map((tx, index) => (
            <div key={index} className="border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
                <Badge className="bg-green-600 text-white text-xs">{tx.status}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted p-2 rounded text-xs font-mono text-foreground truncate">
                  {tx.hash}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")}
                  className="h-8 w-8 p-0"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
