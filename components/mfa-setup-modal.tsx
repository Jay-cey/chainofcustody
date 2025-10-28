"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, MessageSquare, Key } from "lucide-react"

interface MFASetupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MFASetupModal({ open, onOpenChange }: MFASetupModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<"authenticator" | "sms" | "hardware">("authenticator")
  const [verificationCode, setVerificationCode] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
          <DialogDescription>Enhance your account security with MFA</DialogDescription>
        </DialogHeader>

        <Tabs value={selectedMethod} onValueChange={(v) => setSelectedMethod(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="authenticator" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">App</span>
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">SMS</span>
            </TabsTrigger>
            <TabsTrigger value="hardware" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">Token</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="authenticator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Authenticator App</CardTitle>
                <CardDescription>Use Google Authenticator, Microsoft Authenticator, or Authy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                    <div className="text-center text-xs text-muted-foreground">QR Code</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Verification Code</label>
                  <Input
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <Button className="w-full">Verify & Enable</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">SMS Authentication</CardTitle>
                <CardDescription>Receive codes via text message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input placeholder="+1 (555) 000-0000" type="tel" />
                </div>
                <Button className="w-full">Send Test Code</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hardware" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hardware Security Key</CardTitle>
                <CardDescription>Use a FIDO2 compatible security key</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Insert your security key and press the button when prompted.
                </p>
                <Button className="w-full">Register Security Key</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
