"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Check } from "lucide-react"

interface DigitalSignatureProps {
  itemNumber: string
  transferDetails: Record<string, string>
  onComplete: () => void
  onCancel: () => void
  isLoading: boolean
}

export function DigitalSignature({
  itemNumber,
  transferDetails,
  onComplete,
  onCancel,
  isLoading,
}: DigitalSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isSigned, setIsSigned] = useState(false)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setIsSigned(true)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsSigned(false)
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Digital Signature</CardTitle>
        <CardDescription>Sign to confirm the evidence transfer for {itemNumber}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transfer Summary */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <p className="text-sm font-medium text-foreground">Transfer Summary</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>
              <p className="text-xs">From: {transferDetails.currentHolder}</p>
              <p className="text-xs">To: {transferDetails.newHolder}</p>
            </div>
            <div>
              <p className="text-xs">Date: {transferDetails.transferDate}</p>
              <p className="text-xs">Reason: {transferDetails.transferReason}</p>
            </div>
          </div>
        </div>

        {/* Signature Canvas */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Your Signature</label>
          <div className="border-2 border-dashed border-border rounded-lg overflow-hidden bg-white dark:bg-slate-950">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full cursor-crosshair"
            />
          </div>
          <p className="text-xs text-muted-foreground">Draw your signature in the box above</p>
        </div>

        {/* Warning */}
        <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 dark:text-amber-200">
            <p className="font-medium">Legal Notice</p>
            <p className="text-xs mt-1">
              By signing, you confirm the accuracy of this evidence transfer and accept responsibility for the chain of
              custody.
            </p>
          </div>
        </div>

        {/* Signature Status */}
        {isSigned && (
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200">Signature captured and ready to submit</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={clearSignature} className="flex-1 bg-transparent">
            Clear Signature
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onComplete}
            disabled={!isSigned || isLoading}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Submitting..." : "Confirm Transfer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
