"use client"

import type React from "react"

import { useAuth } from "./auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  
  return <>{children}</>
}
