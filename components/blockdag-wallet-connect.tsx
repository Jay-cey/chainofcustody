"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { connectBlockDAGWallet } from "@/lib/blockdag"

interface BlockDAGWalletConnectProps {
  onConnect: (address: string) => void
}

export function BlockDAGWalletConnect({ onConnect }: BlockDAGWalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (walletType: "metamask" | "blockdag") => {
    setIsConnecting(true)
    try {
      const wallet = await connectBlockDAGWallet(walletType)
      onConnect(wallet.address)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base">Web3 Wallet Connection</CardTitle>
        <CardDescription>Connect with your blockchain wallet for advanced features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={() => handleConnect("metamask")}
          disabled={isConnecting}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {isConnecting ? "Connecting..." : "🦊 Connect with MetaMask"}
        </Button>
        <Button
          onClick={() => handleConnect("blockdag")}
          disabled={isConnecting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isConnecting ? "Connecting..." : "🔗 Connect with BlockDAG Wallet"}
        </Button>
      </CardContent>
    </Card>
  )
}
