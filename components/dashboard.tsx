"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Shield, FileText, Lock, Users, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { SecurityStatusDashboard } from "@/components/security-status-dashboard"
import { IncidentReportingModal } from "@/components/incident-reporting-modal"

export function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [incidentModalOpen, setIncidentModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const quickActions = [
    {
      icon: FileText,
      title: "New Case",
      description: "Create a new evidence case",
      href: "/cases/new",
    },
    {
      icon: Lock,
      title: "Evidence Vault",
      description: "Access stored evidence",
      href: "/evidence",
    },
    {
      icon: BarChart3,
      title: "Reports",
      description: "Generate case reports",
      href: "/reports",
    },
    {
      icon: Users,
      title: "Access Logs",
      description: "View audit trail",
      href: "/access-logs",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">ChainCustody</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.role.replace("_", " ")}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}</h2>
            <p className="text-muted-foreground">
              {user?.agency} • Badge #{user?.badge_number || "N/A"}
            </p>
          </div>

          {/* Security Status Dashboard */}
          <div className="mb-8">
            <SecurityStatusDashboard />
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Card key={action.title} className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                        <CardDescription className="text-xs mt-1">{action.description}</CardDescription>
                      </div>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Recent Activity Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent cases and evidence submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No recent activity. Create a new case to get started.</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <IncidentReportingModal open={incidentModalOpen} onOpenChange={setIncidentModalOpen} />
    </>
  )
}
