"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Textarea } from "@/components/ui/textarea"

export function CaseForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    caseNumber: "",
    title: "",
    description: "",
    location: "",
    incidentDate: "",
  })
  const router = useRouter()
  const { user } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Submit to backend
      console.log("Creating case:", formData)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/cases")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>New Case Information</CardTitle>
        <CardDescription>Enter the details for the new evidence case</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
              <label htmlFor="incidentDate" className="text-sm font-medium text-foreground">
                Incident Date
              </label>
              <Input
                id="incidentDate"
                name="incidentDate"
                type="date"
                value={formData.incidentDate}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Case Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Brief description of the case"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium text-foreground">
              Incident Location
            </label>
            <Input
              id="location"
              name="location"
              placeholder="Address or location details"
              value={formData.location}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Case Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detailed description of the case and evidence"
              value={formData.description}
              onChange={handleChange}
              required
              className="bg-input border-border min-h-32"
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium text-foreground">Case Investigator</p>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90">
              {isLoading ? "Creating..." : "Create Case"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
