"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileIcon, X, CheckCircle } from "lucide-react"
import { calculateFileHash, type ACLBlock } from "@/lib/blockchain"
import { generateEncryptionKey, exportKeyAsBase64, encryptFile } from "@/lib/crypto"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Key, Copy } from "lucide-react"

/**
 * Mocks uploading a file to a secure storage (like S3, IPFS, or a private server).
 * In a real application, this would involve a fetch/axios call to a backend endpoint.
 * @returns A mock URL or identifier for the stored file.
 */
async function mockUploadFileToSecureStorage(encryptedFile: EncryptedFile): Promise<string> {
  console.log(`Uploading ${encryptedFile.file.name} (${encryptedFile.ciphertext.byteLength} bytes) to secure storage...`)
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))
  const storageId = `secure-storage-id-${Math.random().toString(36).slice(2)}`
  console.log(`Upload complete. Storage ID: ${storageId}`)
  return storageId
}
interface EncryptedFile {
  file: File
  ciphertext: ArrayBuffer
  iv: Uint8Array
}
export function EvidenceUploadForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [blockchainData, setBlockchainData] = useState<{
    hashes: Map<string, string>
    encryptionKey?: string
    encryptedFiles: Map<string, EncryptedFile>
    txDetails?: ACLBlock
  }>({ hashes: new Map(), encryptedFiles: new Map() })
  const [formData, setFormData] = useState({
    itemNumber: "",
    description: "",
    caseNumber: "",
    evidenceType: "physical",
    location: "",
  })
  const router = useRouter()
  const { user } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(files)

      // Generate a single key for this batch of files
      const key = await generateEncryptionKey()
      const exportedKey = await exportKeyAsBase64(key)

      const newHashes = new Map<string, string>()
      const newEncryptedFiles = new Map<string, EncryptedFile>()

      for (const file of files) {
        const hash = await calculateFileHash(file)
        newHashes.set(file.name, hash)

        const { ciphertext, iv } = await encryptFile(file, key)
        newEncryptedFiles.set(file.name, { file, ciphertext, iv })
      }

      setBlockchainData((prev) => ({
        ...prev,
        hashes: newHashes,
        encryptedFiles: newEncryptedFiles,
        encryptionKey: exportedKey,
      }))
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, this is where you would "upload" the `blockchainData.encryptedFiles`
    // (the ciphertext) to a secure, off-chain storage like S3, IPFS, or a private server.
    // The location/URL from that storage would then be anchored to the blockchain.

    if (!user?.id) {
      toast.error("Authentication Error", { description: "You must be logged in to submit evidence." })
      setIsLoading(false)
      return
    }
    if (uploadedFiles.length === 0) {
      toast.warning("No File Selected", { description: "Please select a file to upload." })
      setIsLoading(false)
      return
    }

    try {
      const firstFile = uploadedFiles[0]
      const fileHash = blockchainData.hashes.get(firstFile.name)
      const encryptedFile = blockchainData.encryptedFiles.get(firstFile.name)

      if (!fileHash || !encryptedFile) {
        toast.error("File Processing Error", {
          description: "File hash or encrypted data is missing. Please try re-selecting the file.",
        })
        return
      }

      // 1. "Upload" the encrypted file to secure storage and get its location/ID.
      const storageId = await mockUploadFileToSecureStorage(encryptedFile)

      // Call the new ACL grant API to register the uploader as the owner
      const response = await fetch("/api/acl/grant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: fileHash, userId: user.id, permission: "owner" }),
      })

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error || "Failed to anchor evidence to blockchain.")
      }

      const newBlock: ACLBlock = await response.json()
      setBlockchainData(prev => ({ ...prev, txDetails: newBlock }))

      // Note: We are NOT logging the original file content or the ciphertext for security.
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/evidence")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Evidence Upload</CardTitle>
        <CardDescription>
          Add new evidence items to the vault with secure file storage and blockchain verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="itemNumber" className="text-sm font-medium text-foreground">
                Item Number
              </label>
              <Input
                id="itemNumber"
                name="itemNumber"
                placeholder="ITEM-001"
                value={formData.itemNumber}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="caseNumber" className="text-sm font-medium text-foreground">
                Case Number
              </label>
              <Input
                id="caseNumber"
                name="caseNumber"
                placeholder="CASE-2024-001"
                value={formData.caseNumber}
                onChange={handleChange}
                required
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Evidence Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detailed description of the evidence item"
              value={formData.description}
              onChange={handleChange}
              required
              className="bg-input border-border min-h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="evidenceType" className="text-sm font-medium text-foreground">
                Evidence Type
              </label>
              <select
                id="evidenceType"
                name="evidenceType"
                value={formData.evidenceType}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
              >
                <option value="physical">Physical Evidence</option>
                <option value="digital">Digital Evidence</option>
                <option value="document">Document</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-foreground">
                Storage Location
              </label>
              <Input
                id="location"
                name="location"
                placeholder="Vault location or shelf"
                value={formData.location}
                onChange={handleChange}
                className="bg-input border-border"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Upload Files</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input type="file" id="fileInput" onChange={handleFileChange} multiple className="hidden" />
              <label htmlFor="fileInput" className="cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">Supported formats: PDF, JPG, PNG, DOC, ZIP</p>
              </label>
            </div>
          </div>

          {/* Uploaded Files List with Hashes */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Uploaded Files ({uploadedFiles.length})</p>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 flex-1">
                      <FileIcon className="w-4 h-4 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        {blockchainData.hashes.get(file.name) && (
                          <p className="text-xs font-mono text-primary mt-1 truncate">
                            Hash: {blockchainData.hashes.get(file.name)?.slice(0, 16)}...
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Encryption Key Display */}
          {blockchainData.encryptionKey && (
            <Alert variant="destructive">
              <Key className="h-4 w-4" />
              <AlertTitle>Save Your Encryption Key!</AlertTitle>
              <AlertDescription className="mt-2">
                This key is required to decrypt the evidence. Store it in a secure location.
                <strong className="block">If you lose this key, the data will be unrecoverable.</strong>
                <div className="mt-2 p-2 bg-background rounded-md flex items-center gap-2">
                  <code className="text-sm font-mono break-all flex-1">{blockchainData.encryptionKey}</code>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(blockchainData.encryptionKey!)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Blockchain Status */}
          {blockchainData.txDetails && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="font-medium text-green-900 dark:text-green-100">Evidence Anchored to BlockDAG</p>
              </div>
              <p className="text-xs text-green-800 dark:text-green-200 font-mono">
                Block ID: {blockchainData.txDetails.id}
              </p>
              <p className="text-xs text-green-800 dark:text-green-200 font-mono">
                Timestamp: {new Date(blockchainData.txDetails.timestamp).toLocaleString()}
              </p>
            </div>
          )}

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium text-foreground">Submitted By</p>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-primary hover:bg-primary/90">
              {isLoading ? "Uploading..." : "Upload Evidence"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
