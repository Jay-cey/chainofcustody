"use client"

import { BlockDAGWallet } from "@/lib/blockdag-client"
import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export type UserRole = "admin" | "investigator" | "evidence_custodian" | "viewer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  agency: string
  badge_number?: string
  mfaEnabled?: boolean
  lastLogin?: Date
  sessionExpiry?: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  walletAuthToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
  extendSession: () => void
  authenticateWithWallet: (wallet: BlockDAGWallet) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [walletAuthToken, setWalletAuthToken] = useState<string | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual authentication with MFA
      const mockUser: User = {
        id: "1",
        email,
        name: "Officer Name",
        role: "investigator",
        agency: "Law Enforcement Agency",
        mfaEnabled: true,
        lastLogin: new Date(),
        sessionExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      }
      setUser(mockUser)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setWalletAuthToken(null)
  }, [])

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser)
  }, [])

  const extendSession = useCallback(() => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            sessionExpiry: new Date(Date.now() + 15 * 60 * 1000),
          }
        : null,
    )
  }, [])

  const authenticateWithWallet = useCallback(async (wallet: BlockDAGWallet) => {
    setIsLoading(true)
    try {
      // 1. Create a message to be signed
      const message = `Sign this message to prove you own this wallet and to authenticate for decrypting evidence. Nonce: ${Date.now()}`

      // 2. Simulate the user signing the message with their wallet
      // In a real app, this would use a wallet provider (e.g., MetaMask, Phantom) to request a signature.
      console.log("Requesting wallet signature...")
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate user interaction
      const signature = `sig_Signed by ${wallet.address.slice(0, 10)}... for message: ${message.slice(0, 20)}...`

      // 3. Send the signature to the backend for verification
      const response = await fetch("/api/auth/wallet-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: wallet.address, message, signature }),
      })

      if (!response.ok) {
        throw new Error("Wallet signature verification failed")
      }

      const { token } = await response.json()
      setWalletAuthToken(token)
      console.log("Wallet authentication successful, token received.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        extendSession,
        walletAuthToken,
        authenticateWithWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
