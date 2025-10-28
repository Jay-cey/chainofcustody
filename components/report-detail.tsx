"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Printer as Print, Share2, FileText, Calendar, User } from "lucide-react"

interface ReportDetailProps {
  reportId: string
}

// Mock report data
const mockReport = {
  id: "1",
  caseNumber: "CASE-2024-001",
  title: "Evidence Collection Report",
  generatedDate: "2024-10-18",
  generatedBy: "Officer Smith",
  status: "completed",
  reportType: "comprehensive",
  summary: "Complete evidence collection and chain of custody documentation for incident investigation.",
  sections: {
    evidence: {
      title: "Evidence Inventory",
      items: [
        { number: "ITEM-001", description: "Physical evidence - Item A", type: "physical", status: "in-custody" },
        { number: "ITEM-002", description: "Digital evidence - USB drive", type: "digital", status: "in-custody" },
      ],
    },
    custody: {
      title: "Chain of Custody",
      entries: [
        { date: "2024-10-15", action: "Received", by: "Officer Smith" },
        { date: "2024-10-16", action: "Verified", by: "Evidence Custodian" },
      ],
    },
    analysis: {
      title: "Analysis Results",
      findings: "Preliminary analysis indicates no anomalies. Further forensic examination recommended.",
    },
  },
}

export function ReportDetail({ reportId }: ReportDetailProps) {
  const report = mockReport

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">{report.title}</CardTitle>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {report.status}
                </Badge>
              </div>
              <CardDescription className="text-base text-foreground/80">{report.caseNumber}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Print className="w-4 h-4" />
                Print
              </Button>
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
          <p className="text-muted-foreground">{report.summary}</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Generated
              </p>
              <p className="text-foreground">{report.generatedDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="w-3 h-3" />
                By
              </p>
              <p className="text-foreground">{report.generatedBy}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="text-foreground capitalize">{report.reportType}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Sections */}
      <Tabs defaultValue="evidence" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="evidence">Evidence Inventory</TabsTrigger>
          <TabsTrigger value="custody">Chain of Custody</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="evidence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{report.sections.evidence.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.sections.evidence.items.map((item) => (
                <div key={item.number} className="border border-border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.number}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Status: {item.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custody" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{report.sections.custody.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.sections.custody.entries.map((entry, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{entry.action}</p>
                      <p className="text-sm text-muted-foreground">By: {entry.by}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{report.sections.analysis.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{report.sections.analysis.findings}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
