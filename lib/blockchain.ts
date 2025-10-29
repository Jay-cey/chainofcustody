/**
 * Calculates the SHA-256 hash of a file.
 * This is a client-side utility.
 */
export async function calculateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

/**
 * Mocks a simple blockchain client for managing an Access Control List (ACL) on a BlockDAG.
 * In a real-world scenario, this would interact with a smart contract on a blockchain.
 */

export interface ACLBlock {
  id: string
  timestamp: number
  type: "GRANT" | "REVOKE"
  payload: {
    fileId: string
    userId: string // The user being granted/revoked access
    permission?: string // e.g., 'read', 'write'. Only for GRANT
    grantedBy: string // The user ID who performed the action
  }
  previousBlockId: string | null
}

// In-memory store for our mock blockchain.
// We'll pre-populate it with some data for demonstration.
const aclChain: ACLBlock[] = [
  {
    id: "genesis",
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    type: "GRANT",
    payload: {
      fileId: "case-file-001",
      userId: "officer-jones",
      permission: "owner",
      grantedBy: "system",
    },
    previousBlockId: null,
  },
  {
    id: "blk-1",
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    type: "GRANT",
    payload: {
      fileId: "case-file-001",
      userId: "prosecutor-smith",
      permission: "read",
      grantedBy: "officer-jones",
    },
    previousBlockId: "genesis",
  },
]
let lastBlockId = "blk-1"

const generateId = () => `blk-${Math.random().toString(36).slice(2, 11)}`

export const blockchainClient = {
  /**
   * Writes a 'GRANT' block to the chain.
   */
  async grantAccess(fileId: string, userId: string, permission: string, grantedBy: string): Promise<ACLBlock> {
    console.log(`BC: Granting '${permission}' on '${fileId}' to '${userId}' by '${grantedBy}'`)
    const newBlock: ACLBlock = {
      id: generateId(),
      timestamp: Date.now(),
      type: "GRANT",
      payload: { fileId, userId, permission, grantedBy },
      previousBlockId: lastBlockId,
    }
    aclChain.push(newBlock)
    lastBlockId = newBlock.id
    return newBlock
  },

  /**
   * Verifies if a user has a specific permission for a file by traversing the chain.
   * It checks for the most recent relevant grant/revoke action.
   */
  async checkAccess(fileId: string, userId: string, permission: string): Promise<boolean> {
    console.log(`BC: Checking '${permission}' on '${fileId}' for '${userId}'`)
    // Find the last relevant record for this user/file combination.
    const relevantBlocks = aclChain
      .filter(block => block.payload.fileId === fileId && block.payload.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp)

    if (relevantBlocks.length === 0) {
      return false // No access granted ever
    }

    const lastAction = relevantBlocks[0]

    // If the last action was a revoke, access is denied.
    if (lastAction.type === "REVOKE") {
      return false
    }

    // If the last action was a grant, check if it matches the required permission.
    // We also allow 'owner' to have any permission.
    return lastAction.payload.permission === permission || lastAction.payload.permission === "owner"
  },

  /**
   * Retrieves all access control logs for a given file.
   */
  async getAccessLogs(fileId: string): Promise<ACLBlock[]> {
    console.log(`BC: Getting all logs for '${fileId}'`)
    return aclChain.filter(block => block.payload.fileId === fileId).sort((a, b) => b.timestamp - a.timestamp)
  },

  /**
   * Returns a summary status of the mock blockchain.
   */
  async getBlockchainStatus(): Promise<{
    blockCount: number
    lastBlockTimestamp: number | null
    network: string
    status: string
    gasPrice: string
    lastSync: number
    contractAddress: string
  }> {
    const blockCount = aclChain.length
    const lastBlock = aclChain.length > 0 ? aclChain[aclChain.length - 1] : null

    // Mock additional blockchain status details
    const mockNetwork = "BlockDAG TestNet"
    const mockStatus = "Operational"
    const mockGasPrice = "20 Gwei"
    const mockContractAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f42e0" // Example address

    return {
      blockCount,
      lastBlockTimestamp: lastBlock?.timestamp ?? null,
      network: mockNetwork,
      status: mockStatus,
      gasPrice: mockGasPrice,
      lastSync: Date.now(), // Current time as last sync
      contractAddress: mockContractAddress,
    }
  },
}