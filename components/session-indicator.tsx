"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { useAuth } from "@/components/auth-context"

export function SessionIndicator() {
  const [timeRemaining, setTimeRemaining] = useState(15 * 60) // 15 minutes in seconds
  const [showWarning, setShowWarning] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1
        if (newTime === 120) {
          // 2 minutes remaining
          setShowWarning(true)
        }
        if (newTime <= 0) {
          logout()
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [logout])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${showWarning ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-muted"}`}
    >
      <Clock className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-medium">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
      {showWarning && (
        <Button variant="ghost" size="sm" onClick={() => setTimeRemaining(15 * 60)} className="ml-2 h-6 px-2 text-xs">
          Extend
        </Button>
      )}
    </div>
  )
}
