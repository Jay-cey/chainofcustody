"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, Eye, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock analytics data
const caseStatusData = [
  { name: "Open", value: 12, fill: "#3b82f6" },
  { name: "Closed", value: 8, fill: "#10b981" },
  { name: "Archived", value: 5, fill: "#6b7280" },
]

const evidenceTypeData = [
  { name: "Physical", count: 24 },
  { name: "Digital", count: 18 },
  { name: "Document", count: 15 },
]

const recentReports = [
  {
    id: "1",
    caseNumber: "CASE-2024-001",
    title: "Evidence Collection Report",
    generatedDate: "2024-10-18",
    generatedBy: "Officer Smith",
    status: "completed",
  },
  {
    id: "2",
    caseNumber: "CASE-2024-002",
    title: "Chain of Custody Summary",
    generatedDate: "2024-10-17",
    generatedBy: "Evidence Custodian",
    status: "completed",
  },
  {
    id: "3",
    caseNumber: "CASE-2024-003",
    title: "Forensic Analysis Report",
    generatedDate: "2024-10-16",
    generatedBy: "Lab Technician",
    status: "completed",
  },
]

export function ReportsOverview() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">25</div>
            <p className="text-xs text-muted-foreground mt-1">Active and archived</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Evidence Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">57</div>
            <p className="text-xs text-muted-foreground mt-1">In vault</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2.3h</div>
            <p className="text-xs text-muted-foreground mt-1">Per case</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Case Status Distribution</CardTitle>
            <CardDescription>Overview of all cases by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Evidence Type Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Evidence by Type</CardTitle>
            <CardDescription>Distribution of evidence items</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={evidenceTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Latest generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <FileText className="w-4 h-4 text-primary" />
                    <p className="font-medium text-foreground">{report.title}</p>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {report.caseNumber} • {report.generatedDate} • {report.generatedBy}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/reports/${report.id}`)}
                    className="gap-2 bg-transparent"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
