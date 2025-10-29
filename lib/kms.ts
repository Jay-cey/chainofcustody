// lib/kms.ts
// This client interacts with a (mock) Key Management System (KMS) or Hardware Security Module (HSM).
// In a real application, this would involve secure RPC calls to a dedicated KMS service.

import { generateEncryptionKey, exportKeyAsBase64, importKeyFromBase64 } from "./crypto"

export interface KMSMasterKeyStatus {
  status: "Active" | "Inactive" | "Rotating"
  lastRotation: string // ISO date string
  nextRotation: string // ISO date string
  hsmStatus: "Connected" | "Disconnected"
  hsmModel: string
  keyEscrowStatus: "Enabled" | "Disabled"
  emergencyRecoveryStatus: "Configured" | "Not Configured"
}

export interface WrappedDataKey {
  encryptedKey: string // Base64 encoded encrypted DEK
  iv: string // Base64 encoded IV used to encrypt the DEK
  keyId: string // Identifier for the KEK used to wrap this DEK
}

class KMSClient {
  private apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  /**
   * Generates a new Data Encryption Key (DEK) and encrypts it using the current Master Key (KEK) from the KMS.
   * @returns {Promise<{ dataKey: CryptoKey, wrappedDataKey: WrappedDataKey }>} The raw DEK and its wrapped version.
   */
  async generateAndWrapDataKey(): Promise<{ dataKey: CryptoKey; wrappedDataKey: WrappedDataKey }> {
    console.log("KMS: Generating new data encryption key (DEK)...")
    const dataKey = await generateEncryptionKey() // Generate a new AES-GCM key
    const rawDataKey = await window.crypto.subtle.exportKey("raw", dataKey)

    // Simulate sending the raw DEK to the KMS for wrapping with the KEK
    // In a real scenario, the KMS would perform the encryption of the DEK.
    // Here, we simulate it by calling a mock API endpoint.
    const response = await fetch(`${this.apiUrl}/wrap-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${yourAuthToken}`, // Add authentication if needed
      },
      body: JSON.stringify({ rawDataKey: btoa(String.fromCharCode(...new Uint8Array(rawDataKey))) }),
    })

    if (!response.ok) {
      throw new Error(`KMS key wrapping failed: ${response.statusText}`)
    }

    const wrappedDataKey: WrappedDataKey = await response.json()
    console.log("KMS: Data key wrapped successfully.")
    return { dataKey, wrappedDataKey }
  }

  /**
   * Decrypts a wrapped Data Encryption Key (DEK) using the current Master Key (KEK) from the KMS.
   * @param {WrappedDataKey} wrappedDataKey The wrapped DEK to decrypt.
   * @returns {Promise<CryptoKey>} The decrypted raw DEK.
   */
  async unwrapDataKey(wrappedDataKey: WrappedDataKey): Promise<CryptoKey> {
    console.log("KMS: Requesting unwrap of data encryption key (DEK)...")
    // Simulate sending the wrapped DEK to the KMS for unwrapping
    const response = await fetch(`${this.apiUrl}/unwrap-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${yourAuthToken}`, // Add authentication if needed
      },
      body: JSON.stringify(wrappedDataKey),
    })

    if (!response.ok) {
      throw new Error(`KMS key unwrapping failed: ${response.statusText}`)
    }

    const { rawDataKey } = await response.json()
    console.log("KMS: Data key unwrapped successfully.")
    return importKeyFromBase64(rawDataKey)
  }

  /**
   * Initiates a Master Key (KEK) rotation in the KMS.
   */
  async rotateMasterKey(): Promise<void> {
    console.log("KMS: Initiating master key rotation...")
    const response = await fetch(`${this.apiUrl}/rotate-keys`, { method: "POST" })
    if (!response.ok) {
      throw new Error(`KMS master key rotation failed: ${response.statusText}`)
    }
    console.log("KMS: Master key rotation initiated successfully.")
  }

  async getMasterKeyStatus(): Promise<KMSMasterKeyStatus> {
    const response = await fetch(`${this.apiUrl}/status`)
    if (!response.ok) {
      throw new Error(`Failed to fetch KMS status: ${response.statusText}`)
    }
    return response.json()
  }
}

export const kmsClient = new KMSClient("/api/kms") // Assuming a base API path for KMS operations