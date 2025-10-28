"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"
import type { BlockDAGWallet } from "@/lib/blockdag"

interface BlockDAGStatusBarProps {
  wallet?: BlockDAGWallet
}

export function BlockDAGStatusBar({ wallet }: BlockDAGStatusBarProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!wallet) {
    return null
  }

  const shortAddress = `${wallet.address.slice(0, 8)}...${wallet.address.slice(-6)}`

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-muted/50 border-b border-border text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">🔗 BlockDAG Network Status</span>
        <Badge className={wallet.isConnected ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}>
          {wallet.isConnected ? "Connected ✅" : "Disconnected ❌"}
        </Badge>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <span>Network: {wallet.network}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Wallet:</span>
        <code className="text-xs bg-background px-2 py-1 rounded">{shortAddress}</code>
        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(wallet.address)} className="h-6 w-6 p-0">
          <Copy className="w-3 h-3" />
        </Button>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <span>Balance: {wallet.balance} BDAG</span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="ml-auto h-6 gap-1 text-xs"
        onClick={() => window.open("https://explorer.blockdag.io/", "_blank")}
      >
        <ExternalLink className="w-3 h-3" />
        DAG Explorer
      </Button>
    </div>
  )
}
