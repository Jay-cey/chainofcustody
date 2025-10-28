"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { blockdagClient, type BlockDAGActivity } from "@/lib/blockdag-client"
import { Loader2 } from "lucide-react"

export function BlockDAGActivityWidget() {
  const [activity, setActivity] = useState<BlockDAGActivity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setIsLoading(true)
        const data = await blockdagClient.getActivity()
        setActivity(data)
      } catch (error) {
        console.error("Failed to fetch BlockDAG activity:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchActivity()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">⛓️ BlockDAG Activity (Last 30 Days)</CardTitle>
        <CardDescription>Network anchoring statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 min-h-[300px] flex flex-col justify-center">
        {isLoading || !activity ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading Activity...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Anchors</p>
                <p className="text-lg font-bold text-foreground">{activity.totalAnchors.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Evidence Uploads</p>
                <p className="text-lg font-bold text-foreground">{activity.evidenceUploads.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Custody Transfers</p>
                <p className="text-lg font-bold text-foreground">{activity.custodyTransfers.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Digital Signatures</p>
                <p className="text-lg font-bold text-foreground">{activity.digitalSignatures.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network Tip Height:</span>
                <span className="font-mono font-medium">#{activity.tipHeight.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Avg Finality:</span>
                <span className="font-medium">{activity.avgFinality}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Fees:</span>
                <span className="font-medium">{activity.totalFees}</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activity.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                  }}
                />
                <Bar dataKey="value" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>

            <Button variant="outline" className="w-full bg-transparent">
              📊 View Detailed DAG Analytics
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
