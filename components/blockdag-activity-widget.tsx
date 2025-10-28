"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockData = [
  { name: "Evidence Uploads", value: 384 },
  { name: "Custody Transfers", value: 521 },
  { name: "Digital Signatures", value: 342 },
]

export function BlockDAGActivityWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">⛓️ BlockDAG Activity (Last 30 Days)</CardTitle>
        <CardDescription>Network anchoring statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Anchors</p>
            <p className="text-lg font-bold text-foreground">1,247</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Evidence Uploads</p>
            <p className="text-lg font-bold text-foreground">384</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Custody Transfers</p>
            <p className="text-lg font-bold text-foreground">521</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Digital Signatures</p>
            <p className="text-lg font-bold text-foreground">342</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Network Tip Height:</span>
            <span className="font-mono font-medium">#194,283</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg Finality:</span>
            <span className="font-medium">~8 seconds</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Fees:</span>
            <span className="font-medium">2.4 BDAG (~$1.68)</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockData}>
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
      </CardContent>
    </Card>
  )
}
