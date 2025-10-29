import { NextResponse } from "next/server"
import { blockchainClient } from "@/lib/blockchain"
import { getSession } from "@/lib/auth" // Assuming you have a way to get the current user

export async function POST(request: Request) {
  try {
    const session = await getSession() // Server-side session check
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { fileId, userId, permission } = await request.json()

    if (!fileId || !userId || !permission) {
      return NextResponse.json({ error: "Missing required fields: fileId, userId, permission" }, { status: 400 })
    }

    // In a real app, you'd verify the `session.user.id` has permission to grant access.
    // For now, we'll allow it and pass their ID as `grantedBy`.
    const grantedBy = session.user.id

    const newBlock = await blockchainClient.grantAccess(fileId, userId, permission, grantedBy)

    return NextResponse.json(newBlock)
  } catch (error) {
    console.error("Failed to grant access:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}