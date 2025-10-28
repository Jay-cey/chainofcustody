"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { EvidenceDetail } from "@/components/evidence-detail"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function EvidenceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Evidence Details</h1>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EvidenceDetail evidenceId={params.id} />
        </main>
      </div>
    </ProtectedRoute>
  )
}
