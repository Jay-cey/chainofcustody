"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Loader2 } from "lucide-react"

interface EncryptionFlowVisualizationProps {
  currentStep?: number
}

export function EncryptionFlowVisualization({ currentStep = 6 }: EncryptionFlowVisualizationProps) {
  const steps = [
    { number: 1, label: "File Selected", icon: "📁" },
    { number: 2, label: "Calculating Hash (SHA-256)...", icon: "📊" },
    { number: 3, label: "Encrypting with AES-256...", icon: "🔐" },
    { number: 4, label: "Generating Key Pair...", icon: "🔑" },
    { number: 5, label: "Uploading to Secure Storage...", icon: "☁️" },
    { number: 6, label: "Recording on Blockchain...", icon: "⛓️" },
    { number: 7, label: "Secured & Verified", icon: "✅" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>File Upload Encryption Flow</CardTitle>
        <CardDescription>Step-by-step encryption and verification process</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    step.number < currentStep
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      : step.number === currentStep
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 animate-pulse"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.number < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : step.number === currentStep ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-1 h-8 mt-1 ${step.number < currentStep ? "bg-green-200 dark:bg-green-800" : "bg-muted"}`}
                  ></div>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    step.number <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
