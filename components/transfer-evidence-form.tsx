"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { DigitalSignature } from "@/components/digital-signature"
import { addCustodyEvent } from "@/lib/blockchain"

export function TransferEvidenceForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [blockchainTx, setBlockchainTx] = useState<any>(null)
  const [formData, setFormData] = useState({
    itemNumber: "",
    currentHolder: "",
    newHolder: "",
    transferReason: "",
    transferDate: new Date().toISOString().split("T")[0],
    notes: "",
  })
  const router = useRouter()
  const { user } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowSignature(true)
  }

  const handleSignatureComplete = async () => {
    setIsLoading(true)
    try {
      const mockHash = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
      const txResult = await addCustodyEvent(
        mockHash,
        formData.currentHolder,
        formData.newHolder,
        formData.transferReason,
      )
      setBlockchainTx(txResult)

      console.log("Transferring evidence:", formData, txResult)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/chain-of-custody")
    } finally {
      setIsLoading(false)
    }
  }

  if (showSignature) {
    return (
      <DigitalSignature
        itemNumber={formData.itemNumber}
        transferDetails={formData}
        onComplete={handleSignatureComplete}
        onCancel={() => setShowSignature(false)}
        isLoading={isLoading}
      />
    )
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Evidence Transfer</CardTitle>
        <CardDescription>
          Record the transfer of evidence between custodians with blockchain verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="itemNumber" className="text-sm font-medium text-foreground">
              Item Number
            </label>
            <Input
              id="itemNumber"
              name="itemNumber"
              placeholder="ITEM-001"
              value={formData.itemNumber}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="currentHolder" className="text-sm font-medium text-foreground">
                Current Holder
              </label>
              <Input
                id="currentHolder"
                name="currentHolder"
                placeholder="Current custodian name"
                value={formData.currentHolder}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="newHolder" className="text-sm font-medium text-foreground">
                New Holder
              </label>
              <Input
                id="newHolder"
                name="newHolder"
                placeholder="Receiving custodian name"
                value={formData.newHolder}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="transferDate" className="text-sm font-medium text-foreground">
                Transfer Date
              </label>
              <Input
                id="transferDate"
                name="transferDate"
                type="date"
                value={formData.transferDate}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="transferReason" className="text-sm font-medium text-foreground">
                Transfer Reason
              </label>
              <select
                id="transferReason"
                name="transferReason"
                value={formData.transferReason}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
              >
                <option value="">Select reason</option>
                <option value="analysis">For Analysis</option>
                <option value="storage">Storage Transfer</option>
                <option value="court">Court Presentation</option>
                <option value="release">Release to Owner</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-foreground">
              Transfer Notes
            </label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Additional details about this transfer"
              value={formData.notes}
              onChange={handleChange}
              className="bg-input border-border min-h-24"
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium text-foreground">Transferring Officer</p>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90">
              Continue to Sign
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
