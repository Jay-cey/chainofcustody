"use client"

import { Badge } from "@/components/ui/badge"

interface DataClassificationBadgeProps {
  level: "public" | "internal" | "confidential" | "restricted"
  size?: "sm" | "md" | "lg"
}

export function DataClassificationBadge({ level, size = "md" }: DataClassificationBadgeProps) {
  const classificationConfig = {
    public: {
      label: "Public",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      description: "No access restrictions",
    },
    internal: {
      label: "Internal",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      description: "Internal use only",
    },
    confidential: {
      label: "Confidential",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      description: "Limited distribution",
    },
    restricted: {
      label: "Restricted",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      description: "Highly sensitive - need-to-know only",
    },
  }

  const config = classificationConfig[level]
  const sizeClass = size === "sm" ? "text-xs px-2 py-1" : size === "lg" ? "text-base px-3 py-2" : "text-sm px-2.5 py-1"

  return (
    <Badge className={`${config.color} ${sizeClass}`} title={config.description}>
      {config.label}
    </Badge>
  )
}
