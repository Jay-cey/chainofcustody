"use client"

import { useEffect, useState } from "react"
import { blockchainClient, type ACLBlock } from "@/lib/blockchain"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { PlusCircle, Loader2 } from "lucide-react"

interface AccessLogsListProps {
  fileId: string
}

export function AccessLogsList({ fileId }: AccessLogsListProps) {
  const [logs, setLogs] = useState<ACLBlock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGranting, setIsGranting] = useState(false)
  const [newUserId, setNewUserId] = useState("")
  const [newPermission, setNewPermission] = useState("read")

  const fetchLogs = async () => {
    setIsLoading(true)
    try {
      const accessLogs = await blockchainClient.getAccessLogs(fileId)
      setLogs(accessLogs)
    } catch (error) {
      console.error("Failed to fetch access logs:", error)
      toast.error("Failed to fetch access logs.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [fileId])

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserId) {
      toast.warning("Please enter a User ID.")
      return
    }
    setIsGranting(true)
    try {
      const response = await fetch("/api/acl/grant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, userId: newUserId, permission: newPermission }),
      })

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error || "Failed to grant access.")
      }

      toast.success(`Granted '${newPermission}' access to '${newUserId}'.`)
      setNewUserId("")
      fetchLogs() // Refresh the logs
    } catch (error: any) {
      toast.error("Granting Access Failed", { description: error.message })
    } finally {
      setIsGranting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Control & Logs</CardTitle>
        <CardDescription>Manage and view access permissions for file: {fileId}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGrantAccess} className="flex items-center gap-2 mb-4 p-4 bg-muted/50 rounded-lg">
          <Input placeholder="User ID (e.g., detective-lee)" value={newUserId} onChange={e => setNewUserId(e.target.value)} />
          <Select value={newPermission} onValueChange={setNewPermission}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Permission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="write">Write</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={isGranting}>
            {isGranting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            Grant Access
          </Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Permission</TableHead>
              <TableHead>Granted By</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center"><Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />Loading logs...</TableCell></TableRow>
            ) : logs.map(log => (
              <TableRow key={log.id}>
                <TableCell><Badge variant={log.type === "GRANT" ? "default" : "destructive"}>{log.type}</Badge></TableCell>
                <TableCell className="font-medium">{log.payload.userId}</TableCell>
                <TableCell>{log.payload.permission || "N/A"}</TableCell>
                <TableCell>{log.payload.grantedBy}</TableCell>
                <TableCell className="text-right text-muted-foreground text-xs">{new Date(log.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}