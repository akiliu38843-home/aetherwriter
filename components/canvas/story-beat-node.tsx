"use client"

import { memo, useCallback } from "react"
import { Handle, Position, NodeProps } from "@xyflow/react"
import { Plus, Trash2, Sparkles, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { StoryBeatNodeData } from "@/lib/types"

function StoryBeatNodeComponent({ data, id }: NodeProps) {
  const nodeData = data as StoryBeatNodeData

  const handleAddChild = useCallback(() => {
    if (nodeData.onAddChild && id) {
      nodeData.onAddChild(id)
    }
  }, [nodeData.onAddChild, id])

  const handleDelete = useCallback(() => {
    if (nodeData.onDelete && id) {
      nodeData.onDelete(id)
    }
  }, [nodeData.onDelete, id])

  const handleAIBranch = useCallback(() => {
    if (nodeData.onAIBranch && id) {
      nodeData.onAIBranch(id)
    }
  }, [nodeData.onAIBranch, id])

  const hasWarning = !!nodeData.logicWarning

  return (
    <div className="relative group w-72 bg-background rounded-lg shadow-lg border-2 border-transparent hover:border-purple-200">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-4 !h-4 !bg-purple-400 !border-2 !border-white hover:!bg-purple-500 transition-colors"
      />

      <Card
        className={`
          w-full transition-all duration-200 cursor-move
          ${hasWarning ? "ring-2 ring-red-500 shadow-red-200" : ""}
        `}
      >
        {hasWarning && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg animate-pulse cursor-help z-10">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs bg-red-50 border border-red-200 p-3">
                <p className="font-semibold text-red-600 mb-1">{nodeData.logicWarning}</p>
                <p className="text-sm text-red-800">{nodeData.warningSuggestion}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <CardHeader className="p-3 pb-1">
          <div className="flex items-center gap-2">
            <Input
              value={nodeData.title || ""}
              onChange={(e) => {
                if (nodeData.onTitleChange) {
                  nodeData.onTitleChange(id!, e.target.value)
                }
              }}
              placeholder="章节标题"
              className="font-semibold border-none p-0 h-auto focus-visible:ring-0 text-sm bg-transparent"
            />
            {nodeData.isGenerating && (
              <Sparkles className="w-4 h-4 animate-pulse text-purple-500" />
            )}
          </div>
        </CardHeader>

        <CardContent className="p-3 pt-1">
          <Textarea
            value={nodeData.content || ""}
            onChange={(e) => {
              if (nodeData.onContentChange) {
                nodeData.onContentChange(id!, e.target.value)
              }
            }}
            placeholder="描述剧情概要..."
            className="resize-none border-none focus-visible:ring-0 p-0 text-sm text-muted-foreground bg-transparent min-h-[60px]"
          />
        </CardContent>

        <div className="flex items-center justify-center gap-2 p-2 border-t bg-muted/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAIBranch}
            disabled={nodeData.isGenerating}
            className="flex-1 text-xs hover:bg-purple-100 hover:text-purple-700"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI 脑暴
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddChild}
            className="flex-1 text-xs hover:bg-green-100 hover:text-green-700"
          >
            <Plus className="w-3 h-3 mr-1" />
            添加
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-xs hover:bg-red-100 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-4 !h-4 !bg-purple-400 !border-2 !border-white hover:!bg-purple-500 transition-colors"
      />
    </div>
  )
}

export const StoryBeatNode = memo(StoryBeatNodeComponent)
