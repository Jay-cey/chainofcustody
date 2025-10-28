"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Lock, Users, Calendar, MapPin, AlertCircle } from "lucide-react"

interface CaseDetailProps {
  caseId: string
}

// Mock case data
const mockCaseDetail = {
  id: "1",
  caseNumber: "CASE-2024-001",
  title: "Evidence Collection - Incident A",
  description: "Initial evidence collection and documentation for the incident",
  status: "open" as const,
  investigator: "Officer Smith",
  agency: "Police Department",
  createdDate: "2024-10-15",
  incidentDate: "2024-10-14",
  location: "123 Main Street, Downtown",
  evidenceCount: 5,
  chainOfCustodyItems: [
    {
      id: "1",
      itemNumber: "ITEM-001",
      description: "Physical evidence - Item A",
      status: "in-custody",
      receivedBy: "Officer Smith",
      receivedDate: "2024-10-15",
    },
    {
      id: "2",
      itemNumber: "ITEM-002",
      description: "Digital evidence - USB drive",
      status: "in-custody",
      receivedBy: "Evidence Custodian",
      receivedDate: "2024-10-15",
    },
  ],
}

export function CaseDetail({ caseId }: CaseDetailProps) {
  const caseData = mockCaseDetail

  return (
    <div className="space-y-6">
      {/* Case Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{caseData.caseNumber}</CardTitle>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {caseData.status}
                </Badge>
              </div>
              <CardDescription className="text-base text-foreground/80">{caseData.title}</CardDescription>
            </div>
            <Button variant="outline" className="bg-transparent">
              Edit Case
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{caseData.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="w-3 h-3" />
                Investigator
              </p>
              <p className="text-sm font-medium text-foreground">{caseData.investigator}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Created
              </p>
              <p className="text-sm font-medium text-foreground">{caseData.createdDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Incident Date
              </p>
              <p className="text-sm font-medium text-foreground">{caseData.incidentDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Location
              </p>
              <p className="text-sm font-medium text-foreground">{caseData.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="evidence" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="evidence" className="gap-2">
            <FileText className="w-4 h-4" />
            Evidence ({caseData.evidenceCount})
          </TabsTrigger>
          <TabsTrigger value="custody" className="gap-2">
            <Lock className="w-4 h-4" />
            Chain of Custody
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="evidence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Items</CardTitle>
              <CardDescription>All evidence associated with this case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No evidence items yet. Upload evidence to get started.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custody" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chain of Custody</CardTitle>
              <CardDescription>Track evidence handling and transfers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseData.chainOfCustodyItems.map((item) => (
                <div key={item.id} className="border border-border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.itemNumber}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Received By</p>
                      <p className="text-foreground">{item.receivedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-foreground">{item.receivedDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent actions on this case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No activity yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
