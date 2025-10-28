"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileIcon, Lock, Download, Share2, Hash, Calendar, User } from "lucide-react"
import { BlockchainVerification } from "@/components/blockchain-verification"
import { EncryptionStatus } from "@/components/encryption-status"
import { HashVerificationPanel } from "@/components/hash-verification-panel"

interface EvidenceDetailProps {
  evidenceId: string
}

// Mock evidence detail
const mockEvidenceDetail = {
  id: "1",
  itemNumber: "ITEM-001",
  description: "Physical evidence - Recovered item A",
  type: "physical",
  status: "in-custody",
  caseNumber: "CASE-2024-001",
  uploadDate: "2024-10-15",
  uploadedBy: "Officer Smith",
  fileSize: "N/A",
  hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  location: "Vault A - Shelf 3",
  notes: "Initial evidence collection from incident scene",
  hashStatus: "verified" as const,
  chainOfCustody: [
    {
      date: "2024-10-15",
      action: "Received",
      by: "Officer Smith",
      notes: "Initial intake",
    },
    {
      date: "2024-10-16",
      action: "Verified",
      by: "Evidence Custodian",
      notes: "Hash verification completed",
    },
  ],
}

export function EvidenceDetail({ evidenceId }: EvidenceDetailProps) {
  const evidence = mockEvidenceDetail

  return (
    <div className="space-y-6">
      {/* Evidence Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileIcon className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">{evidence.itemNumber}</CardTitle>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {evidence.type}
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {evidence.status}
                </Badge>
              </div>
              <CardDescription className="text-base text-foreground/80">{evidence.description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{evidence.notes}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Hash className="w-3 h-3" />
                Case
              </p>
              <p className="text-sm font-medium text-foreground">{evidence.caseNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Uploaded
              </p>
              <p className="text-sm font-medium text-foreground">{evidence.uploadDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="w-3 h-3" />
                By
              </p>
              <p className="text-sm font-medium text-foreground">{evidence.uploadedBy}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-medium text-foreground">{evidence.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <BlockchainVerification evidenceHash={evidence.hash} itemNumber={evidence.itemNumber} />

      <EncryptionStatus itemNumber={evidence.itemNumber} />

      <HashVerificationPanel
        itemNumber={evidence.itemNumber}
        status={evidence.hashStatus}
        originalHash={evidence.hash}
        currentHash={evidence.hash}
      />

      {/* Tabs */}
      <Tabs defaultValue="hash" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="hash" className="gap-2">
            <Lock className="w-4 h-4" />
            Cryptographic Hash
          </TabsTrigger>
          <TabsTrigger value="custody" className="gap-2">
            <FileIcon className="w-4 h-4" />
            Chain of Custody
          </TabsTrigger>
          <TabsTrigger value="access" className="gap-2">
            <User className="w-4 h-4" />
            Access Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hash" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cryptographic Hash</CardTitle>
              <CardDescription>SHA-256 hash for integrity verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm break-all text-foreground">{evidence.hash}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Copy Hash
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Verify Integrity
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custody" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chain of Custody</CardTitle>
              <CardDescription>Complete handling history of this evidence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {evidence.chainOfCustody.map((entry, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{entry.action}</p>
                      <p className="text-sm text-muted-foreground">{entry.notes}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-foreground">{entry.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">By</p>
                      <p className="text-foreground">{entry.by}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Log</CardTitle>
              <CardDescription>Who has accessed this evidence and when</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No access records yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
