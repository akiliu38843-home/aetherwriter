"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Check, X, Wand2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { NarrativeDimensions, buildNarrativeSystemPrompt, buildUserPrompt } from "@/lib/prompts"
import { useNarrative } from "@/components/layout/narrative-context"

interface AICopilotData {
  id: string
  content: string
  from: number
  to: number
  isGenerating: boolean
}

export function TiptapEditor() {
  const [aiDrafts, setAIDrafts] = useState<Map<string, AICopilotData>>(new Map())
  const [isGenerating, setIsGenerating] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState("")
  
  // 修复 hydration 问题：初始值为空，与 SSR 保持一致
  const [editorContent, setEditorContent] = useState<string>('')
  const [isHydrated, setIsHydrated] = useState(false)
  
  const abortControllerRef = useRef<AbortController | null>(null)
  const { dimensions } = useNarrative()
  
  // 在客户端挂载后加载 localStorage 数据
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedContent = localStorage.getItem('aetherwriter-content') || ''
      setEditorContent(savedContent)
      setIsHydrated(true)
    }
  }, [])
  
  // 保存内容到 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated && editorContent) {
      localStorage.setItem('aetherwriter-content', editorContent)
    }
  }, [editorContent, isHydrated])
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Placeholder.configure({
        placeholder: "在这里开始你的创作，或者选中文字呼出 AI 助手...",
      }),
    ],
    content: editorContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setEditorContent(html)
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg prose-slate dark:prose-invert max-w-none focus:outline-none min-h-full",
      },
      handleClick: () => {
        setShowBubble(false)
      },
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection
      if (from !== to) {
        const text = editor.state.doc.textBetween(from, to)
        setSelectedText(text)
        
        const { view } = editor
        const coords = view.coordsAtPos(from)
        setBubblePosition({
          x: coords.left,
          y: coords.top - 50
        })
        setShowBubble(true)
      } else {
        setShowBubble(false)
      }
    },
  })

  const acceptAIDraft = useCallback((draftId: string) => {
    if (!editor) return

    const draft = aiDrafts.get(draftId)
    if (!draft) return

    // 由于流式生成会导致位置变化，直接在文档末尾插入重写内容
    const docSize = editor.state.doc.content.size
    editor
      .chain()
      .focus()
      .insertContentAt(docSize, '\n\n' + draft.content)
      .run()

    setAIDrafts((prev) => {
      const newDrafts = new Map(prev)
      newDrafts.delete(draftId)
      return newDrafts
    })
  }, [editor, aiDrafts])

  const rejectAIDraft = useCallback((draftId: string) => {
    setAIDrafts((prev) => {
      const newDrafts = new Map(prev)
      newDrafts.delete(draftId)
      return newDrafts
    })
  }, [])

  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsGenerating(false)
    }
  }, [])

  const handleNarrativeRewrite = useCallback(async (dimensions: NarrativeDimensions) => {
    if (!editor || isGenerating || !selectedText.trim()) return

    setIsGenerating(true)
    setShowBubble(false)
    const draftId = `draft-${Date.now()}`
    const draftMarkerId = `ai-draft-${draftId}`
    const { to } = editor.state.selection
    const selectedLength = selectedText.length
    const maxLength = selectedLength * 4 // 限制最大长度为原文的4倍

    try {
      abortControllerRef.current = new AbortController()
      
      const systemPrompt = buildNarrativeSystemPrompt(dimensions)
      const userPrompt = buildUserPrompt(selectedText, dimensions)
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
        }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error("AI generation failed")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          
          // 检查是否会超过最大长度限制
          if (fullText.length + chunk.length <= maxLength) {
            fullText += chunk
          } else {
            // 截断到最大长度
            const remainingLength = maxLength - fullText.length
            if (remainingLength > 0) {
              fullText += chunk.slice(0, remainingLength)
            }
            // 达到字数限制，停止生成
            abortControllerRef.current?.abort()
            break
          }

          setAIDrafts((prev) => {
            const newDrafts = new Map(prev)
            newDrafts.set(draftMarkerId, {
              id: draftMarkerId,
              content: fullText,
              from: to,
              to: to + fullText.length,
              isGenerating: true,
            })
            return newDrafts
          })
        }
      }

      setAIDrafts((prev) => {
        const newDrafts = new Map(prev)
        const draft = newDrafts.get(draftMarkerId)
        if (draft) {
          draft.isGenerating = false
          draft.content = fullText // 确保保存最终截断后的内容
        }
        return newDrafts
      })

      setIsGenerating(false)
    } catch (error) {
      console.error("AI generation error:", error)
      setIsGenerating(false)
    }
  }, [editor, selectedText, isGenerating])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.bubble-menu') && !target.closest('.ProseMirror')) {
        setShowBubble(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // 修复 hydration 问题：只有在水合完成后且编辑器初始化后才渲染
  if (!editor || !isHydrated) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm">加载中...</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col relative bg-background">
      {/* Editor Container */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 min-h-full">
          <EditorContent 
            editor={editor} 
            className="min-h-full"
          />
        </div>
      </div>

      {/* Custom Bubble Menu */}
      {showBubble && !isGenerating && (
        <div
          className="fixed z-50 flex items-center gap-1 bg-background border rounded-lg shadow-xl p-1"
          style={{
            left: `${bubblePosition.x}px`,
            top: `${bubblePosition.y}px`,
            transform: 'translateX(-50%)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              editor.chain().focus().toggleBold().run()
            }}
            className={cn(
              "size-8",
              editor.isActive("bold") && "bg-muted"
            )}
          >
            <Bold className="size-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              editor.chain().focus().toggleItalic().run()
            }}
            className={cn(
              "size-8",
              editor.isActive("italic") && "bg-muted"
            )}
          >
            <Italic className="size-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleNarrativeRewrite(dimensions)
            }}
            disabled={!selectedText.trim() || isGenerating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          >
            <Wand2 className="size-4 mr-1" />
            重写
          </Button>
        </div>
      )}

      {/* Generation indicator */}
      {isGenerating && (
        <div 
          className="fixed z-50 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-xl px-4 py-2"
          style={{
            left: `${bubblePosition.x}px`,
            top: `${bubblePosition.y}px`,
            transform: 'translateX(-50%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Sparkles className="size-4 animate-pulse" />
          <span className="text-sm font-medium">AI 正在润色...</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              cancelGeneration()
            }}
            className="text-white/80 hover:text-white hover:bg-white/20 ml-2 size-6 p-0"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {/* AI Draft Overlay Controls */}
      {Array.from(aiDrafts.entries()).map(([id, draft]) => (
        <div
          key={id}
          className="fixed bottom-6 right-6 bg-background border rounded-lg shadow-xl p-4 w-96 z-50"
          style={{
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-purple-500" />
              <span className="text-sm font-medium">叙事润色草稿</span>
              {draft.isGenerating && (
                <span className="size-2 rounded-full bg-purple-500 animate-pulse" />
              )}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4 max-h-48 overflow-y-auto p-3 bg-purple-50 rounded-lg border border-purple-100 whitespace-pre-wrap">
            {draft.content || "正在生成..."}
          </div>

          {!draft.isGenerating && (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => acceptAIDraft(id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="size-4 mr-1" />
                采纳
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => rejectAIDraft(id)}
                className="flex-1"
              >
                <X className="size-4 mr-1" />
                丢弃
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
