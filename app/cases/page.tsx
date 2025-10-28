"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { CasesList } from "@/components/cases-list"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

export default function CasesPage() {
  const router = useRouter()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cases</h1>
              <p className="text-muted-foreground mt-1">Manage and track evidence cases</p>
            </div>
            <Button onClick={() => router.push("/cases/new")} className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              New Case
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CasesList />
        </main>
      </div>
    </ProtectedRoute>
  )
}
