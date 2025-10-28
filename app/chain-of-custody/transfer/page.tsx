"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { TransferEvidenceForm } from "@/components/transfer-evidence-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TransferPage() {
  const router = useRouter()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Transfer Evidence</h1>
            <p className="text-muted-foreground mt-1">Record evidence transfer and update chain of custody</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TransferEvidenceForm />
        </main>
      </div>
    </ProtectedRoute>
  )
}
