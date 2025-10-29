"use client"

import React, { createContext, useContext, type ReactNode } from "react"

interface User {
  id: string
  name: string
  role: string
  agency: string
  badge_number: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// For development, we'll provide a mock user.
const mockUser: User = {
  id: "officer-jones",
  name: "Officer Jones",
  role: "field_officer",
  agency: "Metropolitan Police Department",
  badge_number: "7891",
}

const mockLogout = () => {
  console.log("User logged out (mock)")
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext.Provider value={{ user: mockUser, isAuthenticated: true, isLoading: false, logout: mockLogout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}