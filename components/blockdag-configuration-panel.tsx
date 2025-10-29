"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Save } from "lucide-react"

export function BlockDAGConfigurationPanel() {
  const [isSaving, setIsSaving] = useState(false)
  const [config, setConfig] = useState({
    network: "testnet",
    rpcUrl: "https://rpc.blockdag.io/testnet",
    explorerUrl: "https://explorer.blockdag.io/",
    feeStrategy: "medium",
    autoApprove: true,
    maxFee: "0.01",
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("BlockDAG config saved:", config)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>⛓️ BlockDAG Configuration</CardTitle>
        <CardDescription>Configure BlockDAG network settings and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Network:</span>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">● BlockDAG Testnet</Badge>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Node RPC</label>
            <Input
              value={config.rpcUrl}
              onChange={(e) => setConfig({ ...config, rpcUrl: e.target.value })}
              className="bg-input border-border text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Explorer URL</label>
            <Input
              value={config.explorerUrl}
              onChange={(e) => setConfig({ ...config, explorerUrl: e.target.value })}
              className="bg-input border-border text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Fee Strategy</label>
            <div className="flex gap-4">
              {["fast", "medium", "low"].map((strategy) => (
                <label key={strategy} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="feeStrategy"
                    value={strategy}
                    checked={config.feeStrategy === strategy}
                    onChange={(e) => setConfig({ ...config, feeStrategy: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm capitalize">{strategy}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Max Fee (BDAG)</label>
            <Input
              value={config.maxFee}
              onChange={(e) => setConfig({ ...config, maxFee: e.target.value })}
              className="bg-input border-border text-sm"
            />
          </div>

          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={config.autoApprove}
                onCheckedChange={(checked) => setConfig({ ...config, autoApprove: checked as boolean })}
              />
              <span className="text-sm text-foreground">Auto-approve DAG transactions</span>
            </label>
          </div>

          <div className="flex items-center justify-between text-sm p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <span className="text-green-900 dark:text-green-100">Last Sync: 2 hours ago</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">✅</Badge>
          </div>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2 bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Configuration"}
        </Button>
      </CardContent>
    </Card>
  )
}
