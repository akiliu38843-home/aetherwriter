"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { TextStreamChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function ChatInterface() {
  const [inputValue, setInputValue] = useState("")
  
  const { 
    messages, 
    sendMessage, 
    status, 
    error 
  } = useChat({
    transport: new TextStreamChatTransport({
      api: '/api/chat',
    }),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || status === "streaming") return

    const messageText = inputValue.trim()
    setInputValue("")
    
    await sendMessage({ text: messageText })
  }

  const isStreaming = status === "streaming" || status === "submitted"

  const getTextContent = (message: typeof messages[0]): string => {
    // 首先尝试从 parts 中提取文本（data stream 格式）
    if (message.parts && message.parts.length > 0) {
      const textParts = message.parts.filter(part => part.type === "text")
      if (textParts.length > 0) {
        return textParts
          .map(part => (part as { type: "text"; text: string }).text)
          .join("")
      }
    }
    
    // 如果没有 parts，尝试从 content 字段提取（text stream 格式）
    if (typeof (message as any).content === 'string') {
      return (message as any).content
    }
    
    return ""
  }

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h3 className="text-sm font-semibold">AI 写作助手</h3>
        <span className="text-xs text-muted-foreground">
          {isStreaming ? "生成中..." : "准备就绪"}
        </span>
      </div>

      {error && (
        <div className="mx-4 mt-2 p-2 rounded-lg bg-destructive/10 text-destructive text-xs">
          <strong>错误:</strong> {error.message}
        </div>
      )}

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-6">
              <p className="text-sm mb-1">👋 欢迎使用 AI 助手</p>
              <p className="text-xs">
                输入您的问题或需求，我会帮助您进行网络小说创作
              </p>
            </div>
          )}

          {messages.map((message, index) => {
            const content = getTextContent(message)
            if (!content) return null
            
            return (
              <div
                key={message.id || index}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="text-xs whitespace-pre-wrap break-words leading-relaxed">
                    {content}
                  </div>
                  {message.role === "assistant" && (
                    <div className="text-xs text-muted-foreground mt-1">
                      DeepSeek
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {isStreaming && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="flex gap-1">
                    <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]"></span>
                    <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]"></span>
                    <span className="size-1.5 animate-bounce rounded-full bg-current"></span>
                  </div>
                  <span className="text-xs">正在思考...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t p-3">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入您的写作需求..."
            disabled={isStreaming}
            className="flex-1 h-9 text-sm"
          />
          <Button type="submit" disabled={isStreaming || !inputValue.trim()} size="sm">
            <Send className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
