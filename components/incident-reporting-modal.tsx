"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface IncidentReportingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IncidentReportingModal({ open, onOpenChange }: IncidentReportingModalProps) {
  const [incidentType, setIncidentType] = useState("unauthorized_access")
  const [severity, setSeverity] = useState("medium")
  const [description, setDescription] = useState("")
  const [affectedResources, setAffectedResources] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketNumber, setTicketNumber] = useState("")

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setTicketNumber(`INC-${Date.now().toString().slice(-6)}`)
    setSubmitted(true)
    setIsSubmitting(false)
  }

  const handleClose = () => {
    setSubmitted(false)
    setDescription("")
    setAffectedResources("")
    onOpenChange(false)
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Incident Reported Successfully
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
              <CardContent className="pt-6 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Ticket Number</p>
                  <p className="text-lg font-mono font-bold text-foreground">{ticketNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Submitted to Security Team</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Steps</p>
                  <p className="text-sm text-foreground">
                    The security team will investigate and contact you within 2 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Report Security Incident
          </DialogTitle>
          <DialogDescription>
            Report a security concern to the security team for immediate investigation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Incident Type</label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
            >
              <option value="unauthorized_access">Unauthorized Access Attempt</option>
              <option value="data_breach">Data Breach</option>
              <option value="integrity_violation">Integrity Violation</option>
              <option value="malware">Malware Detection</option>
              <option value="suspicious_activity">Suspicious Activity</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              placeholder="Describe the incident in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-input border-border min-h-24"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Affected Resources</label>
            <Input
              placeholder="e.g., CASE-2025-001, EVD-2025-10284"
              value={affectedResources}
              onChange={(e) => setAffectedResources(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !description}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
