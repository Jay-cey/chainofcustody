"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Lock, Key, ShieldAlert, Loader2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { decryptData, importKeyFromBase64 } from "@/lib/crypto"

interface EncryptionStatusProps {
  itemNumber: string
  // In a real app, these would be fetched from your secure off-chain storage
  mockCiphertext?: ArrayBuffer
  mockIv?: Uint8Array
}

export function EncryptionStatus({ itemNumber, mockCiphertext, mockIv }: EncryptionStatusProps) {
  const [decryptionKey, setDecryptionKey] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [decryptionError, setDecryptionError] = useState<string | null>(null)
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null)

  const handleDecrypt = async () => {
    if (!decryptionKey || !mockCiphertext || !mockIv) {
      setDecryptionError("Missing key or encrypted data.")
      return
    }

    setIsDecrypting(true)
    setDecryptionError(null)
    setDecryptedContent(null)

    try {
      const key = await importKeyFromBase64(decryptionKey)
      const decryptedBuffer = await decryptData(mockCiphertext, key, mockIv)
      // For demonstration, we'll try to decode it as text.
      // In a real app, you'd handle the ArrayBuffer based on the file type.
      const content = new TextDecoder().decode(decryptedBuffer)
      setDecryptedContent(content)
    } catch (error) {
      console.error("Decryption failed:", error)
      setDecryptionError("Decryption failed. The key may be incorrect or the data may be corrupt.")
    } finally {
      setIsDecrypting(false)
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          <span>Encryption Status</span>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Secured</Badge>
        </CardTitle>
        <CardDescription>Cryptographic protection details for this evidence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm font-medium">At-Rest Encryption:</span>
            <span className="text-sm text-foreground font-mono ml-auto">AES-256-GCM</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm font-medium">In-Transit Encryption:</span>
            <span className="text-sm text-foreground font-mono ml-auto">TLS 1.3</span>
          </div>
        </div>

        {/* Decryption Section */}
        <div className="border-t border-border pt-4 space-y-3">
          <h4 className="font-medium text-foreground">Verify Decryption</h4>
          <p className="text-sm text-muted-foreground">
            To view the original content, provide the Base64 encryption key generated during upload. This operation is
            performed entirely in your browser.
          </p>
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Paste your Base64 encryption key here"
              value={decryptionKey}
              onChange={(e) => setDecryptionKey(e.target.value)}
              className="bg-input border-border font-mono"
              disabled={isDecrypting}
            />
            <Button onClick={handleDecrypt} disabled={isDecrypting || !decryptionKey}>
              {isDecrypting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Decrypt"}
            </Button>
          </div>
          {decryptionError && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Decryption Failed</AlertTitle>
              <AlertDescription>{decryptionError}</AlertDescription>
            </Alert>
          )}
          {decryptedContent && (
            <Alert variant="default">
              <FileText className="h-4 w-4" />
              <AlertTitle>Decryption Successful</AlertTitle>
              <AlertDescription className="mt-2 font-mono bg-background p-2 rounded-md text-xs break-all">
                {decryptedContent}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
