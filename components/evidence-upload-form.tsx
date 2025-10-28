"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileIcon, X, CheckCircle } from "lucide-react"
import { calculateFileHash, submitInitialEvidence } from "@/lib/blockchain"

export function EvidenceUploadForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [blockchainData, setBlockchainData] = useState<{
    hashes: Map<string, string>
    transactionHash?: string
    status?: string
  }>({ hashes: new Map() })
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(files)

      // Calculate hashes for all files
      files.forEach(async (file) => {
        try {
          const hash = await calculateFileHash(file)
          setBlockchainData((prev) => ({
            ...prev,
            hashes: new Map(prev.hashes).set(file.name, hash),
          }))
        } catch (error) {
          console.error("Error calculating hash:", error)
        }
      })
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (uploadedFiles.length > 0) {
        const firstFileHash = blockchainData.hashes.get(uploadedFiles[0].name)
        if (firstFileHash) {
          const txResult = await submitInitialEvidence(
            firstFileHash,
            formData.itemNumber,
            formData.caseNumber,
            formData.description,
          )
          setBlockchainData((prev) => ({
            ...prev,
            transactionHash: txResult.hash,
            status: txResult.status,
          }))
        }
      }

      console.log("Uploading evidence:", formData, uploadedFiles, blockchainData)
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

          {/* Blockchain Status */}
          {blockchainData.transactionHash && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="font-medium text-green-900 dark:text-green-100">Blockchain Verified</p>
              </div>
              <p className="text-sm text-green-800 dark:text-green-200">
                Transaction: {blockchainData.transactionHash.slice(0, 10)}...
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
