"use client"

import { useState } from "react"
import { TiptapEditor } from "@/components/editor/tiptap-editor"
import { ChatInterface } from "@/components/chat/chat-interface"
import { MessageCircle, PanelBottom, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function EditorLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatHeight, setChatHeight] = useState(350)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 overflow-hidden">
        <TiptapEditor />
      </div>
      
      {isChatOpen && (
        <>
          <Separator />
          <div 
            className="flex-shrink-0 bg-background"
            style={{ height: `${chatHeight}px` }}
          >
            <ChatInterface />
          </div>
        </>
      )}
      
      <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="size-4" />
            <span>AI 助手</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="h-8 px-2"
          >
            {isChatOpen ? (
              <>
                <ChevronDown className="size-4 mr-1" />
                <span className="text-xs">收起</span>
              </>
            ) : (
              <>
                <ChevronUp className="size-4 mr-1" />
                <span className="text-xs">展开</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
