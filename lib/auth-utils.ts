// Password strength validation and security utilities
export function validatePasswordStrength(password: string) {
  const strength = {
    score: 0,
    feedback: [] as string[],
    level: "weak" as "weak" | "medium" | "strong",
  }

  if (password.length < 12) {
    strength.feedback.push("Minimum 12 characters required")
  } else {
    strength.score += 1
  }

  if (!/[A-Z]/.test(password)) {
    strength.feedback.push("Add uppercase letters")
  } else {
    strength.score += 1
  }

  if (!/[a-z]/.test(password)) {
    strength.feedback.push("Add lowercase letters")
  } else {
    strength.score += 1
  }

  if (!/[0-9]/.test(password)) {
    strength.feedback.push("Add numbers")
  } else {
    strength.score += 1
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    strength.feedback.push("Add special characters")
  } else {
    strength.score += 1
  }

  // Check for common breaches (mock implementation)
  const commonPasswords = ["password123", "admin123", "letmein", "welcome123"]
  if (commonPasswords.some((p) => password.toLowerCase().includes(p))) {
    strength.feedback.push("This password appears in known breaches")
  }

  if (strength.score >= 4) {
    strength.level = "strong"
  } else if (strength.score >= 2) {
    strength.level = "medium"
  }

  return strength
}

export function generateSessionTimeout() {
  return Date.now() + 15 * 60 * 1000 // 15 minutes
}

export function generateMFASecret() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
