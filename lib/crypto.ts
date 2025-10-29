// lib/crypto.ts

// Use the browser's built-in Web Crypto API for encryption.
// This ensures that cryptographic operations are performed securely.

/**
 * Generates a new AES-GCM 256-bit encryption key.
 * @returns {Promise<CryptoKey>} A new cryptographic key.
 */
export async function generateEncryptionKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256, // Can be 128, 192, or 256
    },
    true, // Whether the key is extractable (i.e., can be exported)
    ["encrypt", "decrypt"], // Key can be used for both encryption and decryption
  )
}

/**
 * Exports a CryptoKey to a raw ArrayBuffer format, then encodes it as a Base64 string for storage.
 * @param {CryptoKey} key The key to export.
 * @returns {Promise<string>} The Base64 encoded key.
 */
export async function exportKeyAsBase64(key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey("raw", key)
  return btoa(String.fromCharCode(...new Uint8Array(exported)))
}

/**
 * Imports a Base64 encoded key back into a CryptoKey object.
 * @param {string} base64Key The Base64 encoded key.
 * @returns {Promise<CryptoKey>} The imported cryptographic key.
 */
export async function importKeyFromBase64(base64Key: string): Promise<CryptoKey> {
  const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0))
  return window.crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"],
  )
}

/**
 * Encrypts a file's content using AES-GCM.
 * @param {File} file The file to encrypt.
 * @param {CryptoKey} key The encryption key.
 * @returns {Promise<{ciphertext: ArrayBuffer, iv: Uint8Array}>} The encrypted data and the initialization vector (IV).
 */
export async function encryptFile(file: File, key: CryptoKey): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array }> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12)) // 96-bit IV is recommended for GCM
  const fileBuffer = await file.arrayBuffer()

  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    fileBuffer,
  )

  return { ciphertext, iv }
}

/**
 * Decrypts data using AES-GCM.
 * @param {ArrayBuffer} ciphertext The data to decrypt.
 * @param {CryptoKey} key The decryption key.
 * @param {Uint8Array} iv The initialization vector used during encryption.
 * @returns {Promise<ArrayBuffer>} The decrypted plaintext data.
 */
export async function decryptData(ciphertext: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> {
  return window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, ciphertext)
}