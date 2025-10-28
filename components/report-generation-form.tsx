"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export function ReportGenerationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    caseNumber: "",
    reportType: "comprehensive",
    includeEvidence: true,
    includeCustody: true,
    includeAnalysis: true,
    additionalNotes: "",
  })
  const router = useRouter()
  const { user } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Submit to backend for report generation
      console.log("Generating report:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/reports")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
        <CardDescription>Create a court-ready case report with selected sections</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="caseNumber" className="text-sm font-medium text-foreground">
              Case Number
            </label>
            <Input
              id="caseNumber"
              name="caseNumber"
              placeholder="CASE-2024-001"
              value={formData.caseNumber}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reportType" className="text-sm font-medium text-foreground">
              Report Type
            </label>
            <select
              id="reportType"
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
            >
              <option value="comprehensive">Comprehensive Report</option>
              <option value="evidence">Evidence Summary</option>
              <option value="custody">Chain of Custody Only</option>
              <option value="analysis">Analysis Report</option>
              <option value="court">Court Presentation</option>
            </select>
          </div>

          {/* Report Sections */}
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-foreground">Report Sections</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="includeEvidence"
                  name="includeEvidence"
                  checked={formData.includeEvidence}
                  onChange={handleChange}
                />
                <label htmlFor="includeEvidence" className="text-sm text-foreground cursor-pointer">
                  Include Evidence Inventory
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="includeCustody"
                  name="includeCustody"
                  checked={formData.includeCustody}
                  onChange={handleChange}
                />
                <label htmlFor="includeCustody" className="text-sm text-foreground cursor-pointer">
                  Include Chain of Custody
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="includeAnalysis"
                  name="includeAnalysis"
                  checked={formData.includeAnalysis}
                  onChange={handleChange}
                />
                <label htmlFor="includeAnalysis" className="text-sm text-foreground cursor-pointer">
                  Include Analysis Results
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="additionalNotes" className="text-sm font-medium text-foreground">
              Additional Notes
            </label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Any additional information to include in the report"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="bg-input border-border min-h-24"
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium text-foreground">Report Generated By</p>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90">
              {isLoading ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
