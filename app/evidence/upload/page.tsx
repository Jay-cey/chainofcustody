"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { EvidenceUploadForm } from "@/components/evidence-upload-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function EvidenceUploadPage() {
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
            <h1 className="text-3xl font-bold text-foreground">Upload Evidence</h1>
            <p className="text-muted-foreground mt-1">Add new evidence items to the vault</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EvidenceUploadForm />
        </main>
      </div>
    </ProtectedRoute>
  )
}
