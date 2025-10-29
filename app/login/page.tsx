"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Shield, AlertCircle } from "lucide-react"
import { PasswordStrengthIndicator } from "@/components/password-strength-indicator"
import { MFASetupModal } from "@/components/mfa-setup-modal"
import { BlockDAGWalletConnect } from "@/components/blockdag-wallet-connect"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [mfaOpen, setMfaOpen] = useState(false)
  const [showMFAPrompt, setShowMFAPrompt] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isLocked) {
      setError("Account temporarily locked. Try again in 15 minutes.")
      return
    }

    setIsLoading(true)

    try {
      await login(email, password)
      setFailedAttempts(0)
      setShowMFAPrompt(true)
      // Add navigation to homepage after successful login
      router.push('/') // or router.push('/') depending on your homepage route
    } catch (err) {
      const newAttempts = failedAttempts + 1
      setFailedAttempts(newAttempts)

      if (newAttempts >= 5) {
        setIsLocked(true)
        setError("Account locked after 5 failed attempts. Try again in 15 minutes.")
      } else {
        setError(`Invalid email or password. ${5 - newAttempts} attempts remaining.`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">ChainCustody</h1>
            </div>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Access the evidence management platform</CardDescription>
            </CardHeader>
            <CardContent>
              {!walletConnected ? (
                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="officer@agency.gov"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLocked}
                        className="bg-input border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password (Minimum 12 characters)
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLocked}
                        className="bg-input border-border"
                      />
                      {password && <PasswordStrengthIndicator password={password} />}
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <input type="checkbox" id="remember" className="w-4 h-4" />
                      <label htmlFor="remember" className="text-sm text-muted-foreground">
                        Remember this device (30 days)
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || isLocked}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Sign In
                        </span>
                      )}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">OR</span>
                    </div>
                  </div>

                  <BlockDAGWalletConnect onConnect={() => setWalletConnected(true)} />
                </div>
              ) : (
                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="officer@agency.gov"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLocked}
                        className="bg-input border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password (Minimum 12 characters)
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLocked}
                        className="bg-input border-border"
                      />
                      {password && <PasswordStrengthIndicator password={password} />}
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <input type="checkbox" id="remember" className="w-4 h-4" />
                      <label htmlFor="remember" className="text-sm text-muted-foreground">
                        Remember this device (30 days)
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || isLocked}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Sign In
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  This system is for authorized law enforcement use only. Unauthorized access is prohibited and
                  prosecuted under 18 U.S.C. § 1030.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>ChainCustody v1.0 • Evidence Management Platform</p>
          </div>
        </div>
      </div>

      <MFASetupModal open={mfaOpen} onOpenChange={setMfaOpen} />
    </>
  )
}
