"use client"

import { validatePasswordStrength } from "@/lib/auth-utils"

interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = validatePasswordStrength(password)

  const getColor = () => {
    if (strength.level === "strong") return "bg-green-500"
    if (strength.level === "medium") return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${getColor()} transition-all`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          ></div>
        </div>
        <span className="text-xs font-medium text-muted-foreground capitalize">{strength.level}</span>
      </div>
      {strength.feedback.length > 0 && (
        <ul className="text-xs text-muted-foreground space-y-1">
          {strength.feedback.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <span className="text-red-500">•</span> {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
