import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "a-very-secret-and-secure-key-for-dev")

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header missing or malformed" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      console.log(`Wallet ${payload.address} authorized to decrypt evidence ${params.id}`)
    } catch (err) {
      // This will catch expired tokens, invalid signatures, etc.
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    // --- Authorization Successful ---
    // In a real application, you would now:
    // 1. Fetch the encrypted evidence data using params.id
    // 2. Use a key management system (KMS) or derive a key to decrypt the data.
    //    The key might be associated with the user's wallet address from the JWT payload.
    // 3. Return the decrypted data.

    // Mocking the decryption process:
    await new Promise((resolve) => setTimeout(resolve, 500))

    const decryptedData = {
      evidenceId: params.id,
      content: "This is the super secret decrypted content of the evidence file.",
      decryptedAt: new Date().toISOString(),
    }

    return NextResponse.json(decryptedData)
  } catch (error) {
    console.error(`Decryption error for evidence ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}