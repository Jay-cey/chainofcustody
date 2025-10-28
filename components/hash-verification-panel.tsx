"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptographicIntegrityVerification } from "@/components/cryptographic-integrity-verification"
import { TamperDetectionAlert } from "@/components/tamper-detection-alert"

interface HashVerificationPanelProps {
  itemNumber: string
  status: "verified" | "tampered"
  originalHash: string
  currentHash: string
}

export function HashVerificationPanel({ itemNumber, status, originalHash, currentHash }: HashVerificationPanelProps) {
  const [activeTab, setActiveTab] = useState("verification")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-muted">
        <TabsTrigger value="verification">Integrity Verification</TabsTrigger>
        <TabsTrigger value="history">Verification History</TabsTrigger>
      </TabsList>

      <TabsContent value="verification" className="space-y-4">
        {status === "verified" ? (
          <CryptographicIntegrityVerification
            originalHash={originalHash}
            currentHash={currentHash}
            itemNumber={itemNumber}
            verificationTime="2025-10-28 14:35:22 UTC"
            blockchainConfirmed={true}
            blockNumber="8472819"
          />
        ) : (
          <TamperDetectionAlert expectedHash={originalHash} currentHash={currentHash} itemNumber={itemNumber} />
        )}
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Verification History</CardTitle>
            <CardDescription>Previous integrity verification records</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                {
                  date: "2025-10-28 14:35:22 UTC",
                  status: "Verified",
                  hash: originalHash,
                  verifier: "System Automated Check",
                },
                {
                  date: "2025-10-27 09:15:10 UTC",
                  status: "Verified",
                  hash: originalHash,
                  verifier: "Detective Sarah Chen",
                },
                {
                  date: "2025-10-26 16:42:55 UTC",
                  status: "Verified",
                  hash: originalHash,
                  verifier: "Evidence Custodian",
                },
              ].map((record, index) => (
                <div key={index} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{record.date}</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                      {record.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Verified by: {record.verifier}</p>
                  <p className="font-mono text-xs text-foreground break-all">{record.hash}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
