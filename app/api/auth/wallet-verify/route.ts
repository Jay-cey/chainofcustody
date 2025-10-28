import { NextResponse } from "next/server"
import { SignJWT } from "jose"

// In a real app, this would use a BlockDAG crypto library to verify the signature.
// For this mock, we'll just do a simple check.
async function verifySignature(address: string, message: string, signature: string): Promise<boolean> {
  console.log(`Verifying signature for address ${address}...`)
  // Mock verification: check if signature contains parts of the message and address
  const expectedSignatureContent = `Signed by ${address.slice(0, 10)}`
  await new Promise((resolve) => setTimeout(resolve, 200)) // simulate async crypto work
  return signature.includes(expectedSignatureContent)
}

// It's crucial to use a strong, secret key stored in environment variables.
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "a-very-secret-and-secure-key-for-dev")

export async function POST(request: Request) {
  try {
    const { address, message, signature } = await request.json()

    if (!address || !message || !signature) {
      return NextResponse.json({ error: "Missing address, message, or signature" }, { status: 400 })
    }

    const isVerified = await verifySignature(address, message, signature)

    if (!isVerified) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    // Signature is valid, generate a short-lived JWT for specific actions
    const token = await new SignJWT({ address })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m") // Token is valid for 15 minutes
      .sign(JWT_SECRET)

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Wallet verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}