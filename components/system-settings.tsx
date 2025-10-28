"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Save } from "lucide-react"
import { BlockchainIntegrationPanel } from "@/components/blockchain-integration-panel"
import { KeyManagementDashboard } from "@/components/key-management-dashboard"

export function SystemSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    systemName: "ChainCustody Evidence Management",
    organizationName: "Law Enforcement Agency",
    supportEmail: "support@agency.gov",
    enableTwoFactor: true,
    enableAuditLogging: true,
    enableEncryption: true,
    dataRetentionDays: "2555",
    maxUploadSize: "5000",
    sessionTimeout: "30",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setSettings((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // TODO: Submit settings to backend
      console.log("Saving settings:", settings)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "general"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "security"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab("data")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "data"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Data Management
        </button>
        <button
          onClick={() => setActiveTab("blockchain")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "blockchain"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Blockchain
        </button>
      </div>

      {activeTab === "general" && (
        <>
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure system-wide settings and organization information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="systemName" className="text-sm font-medium text-foreground">
                  System Name
                </label>
                <Input
                  id="systemName"
                  name="systemName"
                  value={settings.systemName}
                  onChange={handleChange}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="organizationName" className="text-sm font-medium text-foreground">
                  Organization Name
                </label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={settings.organizationName}
                  onChange={handleChange}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="supportEmail" className="text-sm font-medium text-foreground">
                  Support Email
                </label>
                <Input
                  id="supportEmail"
                  name="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={handleChange}
                  className="bg-input border-border"
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "security" && (
        <>
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and compliance options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="enableTwoFactor"
                    name="enableTwoFactor"
                    checked={settings.enableTwoFactor}
                    onChange={handleChange}
                  />
                  <label htmlFor="enableTwoFactor" className="text-sm text-foreground cursor-pointer">
                    Enable Two-Factor Authentication
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="enableAuditLogging"
                    name="enableAuditLogging"
                    checked={settings.enableAuditLogging}
                    onChange={handleChange}
                  />
                  <label htmlFor="enableAuditLogging" className="text-sm text-foreground cursor-pointer">
                    Enable Audit Logging
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="enableEncryption"
                    name="enableEncryption"
                    checked={settings.enableEncryption}
                    onChange={handleChange}
                  />
                  <label htmlFor="enableEncryption" className="text-sm text-foreground cursor-pointer">
                    Enable End-to-End Encryption
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="sessionTimeout" className="text-sm font-medium text-foreground">
                    Session Timeout (minutes)
                  </label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={handleChange}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="maxUploadSize" className="text-sm font-medium text-foreground">
                    Max Upload Size (MB)
                  </label>
                  <Input
                    id="maxUploadSize"
                    name="maxUploadSize"
                    type="number"
                    value={settings.maxUploadSize}
                    onChange={handleChange}
                    className="bg-input border-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <KeyManagementDashboard />
        </>
      )}

      {activeTab === "data" && (
        <>
          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Configure data retention and storage policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="dataRetentionDays" className="text-sm font-medium text-foreground">
                  Data Retention Period (days)
                </label>
                <Input
                  id="dataRetentionDays"
                  name="dataRetentionDays"
                  type="number"
                  value={settings.dataRetentionDays}
                  onChange={handleChange}
                  className="bg-input border-border"
                />
                <p className="text-xs text-muted-foreground">Default: 2555 days (7 years)</p>
              </div>

              <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium">Data Retention Notice</p>
                  <p className="text-xs mt-1">
                    Changing retention policies may affect compliance with legal requirements. Consult with legal
                    counsel before modifying.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "blockchain" && (
        <>
          <BlockchainIntegrationPanel />
        </>
      )}

      {activeTab !== "blockchain" && (
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      )}
    </div>
  )
}
