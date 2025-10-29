import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

// --- Mock KMS State (In-memory for demonstration) ---
// In a real application, this would be persisted in a secure database
// and managed by a dedicated KMS/HSM service.

let currentMasterKey: CryptoKey | null = null
let currentMasterKeyId: string = "kek-initial"
let masterKeyStatus: {
  status: "Active" | "Inactive" | "Rotating"
  lastRotation: string
  nextRotation: string
  hsmStatus: "Connected" | "Disconnected"
  hsmModel: string
  keyEscrowStatus: "Enabled" | "Disabled"
  emergencyRecoveryStatus: "Configured" | "Not Configured"
} = {
  status: "Active",
  lastRotation: new Date().toISOString(),
  nextRotation: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
  hsmStatus: "Connected",
  hsmModel: "Mock HSM v1.0",
  keyEscrowStatus: "Enabled",
  emergencyRecoveryStatus: "Configured",
}

// Store of wrapped DEKs (Data Encryption Keys)
// In a real app, this would be associated with evidence records in a database.
interface StoredWrappedDataKey {
  encryptedKey: string // Base64 encoded encrypted DEK
  iv: string // Base64 encoded IV used to encrypt the DEK
  keyId: string // Identifier for the KEK used to wrap this DEK
}
const wrappedDataKeys: StoredWrappedDataKey[] = []

// Initialize a master key on server start (mock)
async function initializeMasterKey() {
  if (!currentMasterKey) {
    currentMasterKey = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    )
    console.log("Mock KMS: Initial master key generated.")
  }
}
initializeMasterKey()

// JWT Secret for admin authentication (should be in .env)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "a-very-secret-and-secure-key-for-dev")

// Helper to verify admin token (mock)
async function verifyAdminToken(request: Request): Promise<boolean> {
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }
  const token = authHeader.split(" ")[1]
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    // In a real app, check payload.role === "admin" or similar
    return payload.address === "dag1qxy35Cc6634C0532925a3b844Bc9e7dC" // Mock admin address
  } catch (err) {
    return false
  }
}

// --- API Routes ---

// POST /api/admin/rotate-keys
export async function POST(request: Request) {
  // In a real app, ensure this is an authenticated admin request
  // if (!(await verifyAdminToken(request))) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  console.log("Mock KMS: Initiating master key rotation process...")
  masterKeyStatus.status = "Rotating"

  // 1. Generate a new KEK
  const newMasterKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  )
  const newMasterKeyId = `kek-${Date.now()}`

  // 2. Re-wrap all existing DEKs with the new KEK (simulate)
  // This is a crucial step in a real KMS. For each DEK, it would be decrypted
  // with the old KEK and re-encrypted with the new KEK.
  // For this mock, we'll just update the KEK and assume DEKs would be re-wrapped
  // on demand or in a background process.
  // In a real scenario, you'd iterate `wrappedDataKeys`, unwrap with `currentMasterKey`,
  // then re-wrap with `newMasterKey`, and update `wrappedDataKeys`.
  await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate re-wrapping time

  currentMasterKey = newMasterKey
  currentMasterKeyId = newMasterKeyId
  masterKeyStatus = {
    status: "Active",
    lastRotation: new Date().toISOString(),
    nextRotation: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    hsmStatus: "Connected",
    hsmModel: "Mock HSM v1.0",
    keyEscrowStatus: "Enabled",
    emergencyRecoveryStatus: "Configured",
  }

  console.log(`Mock KMS: Master key rotated to ${newMasterKeyId}.`)
  return NextResponse.json({ message: "Master key rotation successful", newKeyId: newMasterKeyId })
}

// GET /api/kms/status (for KMSClient.getMasterKeyStatus)
export async function GET() {
  await initializeMasterKey() // Ensure a key exists for status
  return NextResponse.json(masterKeyStatus)
}

// POST /api/kms/wrap-key (for KMSClient.generateAndWrapDataKey)
export async function POST_WRAP(request: Request) {
  await initializeMasterKey()
  if (!currentMasterKey) {
    return NextResponse.json({ error: "KMS not initialized" }, { status: 500 })
  }

  const { rawDataKey: base64RawDataKey } = await request.json()
  const rawDataKey = Uint8Array.from(atob(base64RawDataKey), (c) => c.charCodeAt(0))

  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encryptedKeyBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    currentMasterKey,
    rawDataKey,
  )

  const wrappedDataKey: StoredWrappedDataKey = {
    encryptedKey: btoa(String.fromCharCode(...new Uint8Array(encryptedKeyBuffer))),
    iv: btoa(String.fromCharCode(...iv)),
    keyId: currentMasterKeyId,
  }
  wrappedDataKeys.push(wrappedDataKey) // Store the wrapped key
  return NextResponse.json(wrappedDataKey)
}

// POST /api/kms/unwrap-key (for KMSClient.unwrapDataKey)
export async function POST_UNWRAP(request: Request) {
  await initializeMasterKey()
  if (!currentMasterKey) {
    return NextResponse.json({ error: "KMS not initialized" }, { status: 500 })
  }

  const { encryptedKey: base64EncryptedKey, iv: base64Iv, keyId } = await request.json()

  if (keyId !== currentMasterKeyId) {
    // In a real KMS, it would attempt to unwrap with the specified keyId,
    // potentially requiring access to historical KEKs. For mock, we only support current.
    return NextResponse.json({ error: "Key ID mismatch or old key" }, { status: 400 })
  }

  const encryptedKey = Uint8Array.from(atob(base64EncryptedKey), (c) => c.charCodeAt(0))
  const iv = Uint8Array.from(atob(base64Iv), (c) => c.charCodeAt(0))

  try {
    const decryptedKeyBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      currentMasterKey,
      encryptedKey,
    )
    return NextResponse.json({ rawDataKey: btoa(String.fromCharCode(...new Uint8Array(decryptedKeyBuffer))) })
  } catch (error) {
    console.error("Mock KMS: Decryption failed", error)
    return NextResponse.json({ error: "Decryption failed, possibly incorrect key or IV" }, { status: 400 })
  }
}