"use client"

import React, { createContext, useContext, type ReactNode } from "react"

interface User {
  id: string
  name: string
  // You can add other user properties here, like role or email
}

interface AuthContextType {
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// For development, we'll provide a mock user.
const mockUser: User = {
  id: "officer-jones",
  name: "Officer Jones",
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext.Provider value={{ user: mockUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}