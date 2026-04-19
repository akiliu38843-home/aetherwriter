"use client"

import { useCallback, useState, useEffect } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  MarkerType,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { StoryBeatNode } from "./story-beat-node"
import { Button } from "@/components/ui/button"
import { Sparkles, AlertTriangle, Loader2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { StoryBeatNode as StoryBeatNodeType, CanvasEdge } from "@/lib/types"

const nodeTypes = {
  storyBeat: StoryBeatNode,
}

const defaultNodes: StoryBeatNodeType[] = [
  {
    id: "1",
    type: "storyBeat",
    position: { x: 250, y: 100 },
    data: {
      title: "开始",
      content: "故事起点",
    },
  },
  {
    id: "2",
    type: "storyBeat",
    position: { x: 250, y: 300 },
    data: {
      title: "发展",
      content: "故事发展",
    },
  },
]

const defaultEdges: CanvasEdge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
  },
]

const STORAGE_KEY_NODES = 'aetherwriter-canvas-nodes'
const STORAGE_KEY_EDGES = 'aetherwriter-canvas-edges'
const STORAGE_KEY_COUNTER = 'aetherwriter-canvas-counter'

export function PlotCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges)
  const [childCounter, setChildCounter] = useState(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCheckingLogic, setIsCheckingLogic] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedNodes = localStorage.getItem(STORAGE_KEY_NODES)
    const savedEdges = localStorage.getItem(STORAGE_KEY_EDGES)
    const savedCounter = localStorage.getItem(STORAGE_KEY_COUNTER)

    if (savedNodes) {
      try {
        const parsedNodes = JSON.parse(savedNodes)
        setNodes(parsedNodes)
      } catch (e) {
        console.error('Failed to parse saved nodes:', e)
      }
    }

    if (savedEdges) {
      try {
        const parsedEdges = JSON.parse(savedEdges)
        setEdges(parsedEdges)
      } catch (e) {
        console.error('Failed to parse saved edges:', e)
      }
    }

    if (savedCounter) {
      try {
        const parsedCounter = parseInt(savedCounter, 10)
        if (!isNaN(parsedCounter)) {
          setChildCounter(parsedCounter)
        }
      } catch (e) {
        console.error('Failed to parse saved counter:', e)
      }
    }

    setIsInitialized(true)
  }, [setNodes, setEdges])

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return

    localStorage.setItem(STORAGE_KEY_NODES, JSON.stringify(nodes))
    localStorage.setItem(STORAGE_KEY_EDGES, JSON.stringify(edges))
    localStorage.setItem(STORAGE_KEY_COUNTER, String(childCounter))
  }, [nodes, edges, childCounter, isInitialized])

  const handleConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({
        ...connection,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 2 },
        markerEnd: { type: "arrowclosed" as any, color: "#8b5cf6" },
      }, eds))
    },
    [setEdges]
  )

  const handleAddChild = useCallback(
    (parentId: string) => {
      const parentNode = nodes.find((n) => n.id === parentId)
      if (!parentNode) return

      const newNodeId = String(childCounter)
      const newPosition = {
        x: parentNode.position.x,
        y: parentNode.position.y + 200,
      }

      const newNode: StoryBeatNodeType = {
        id: newNodeId,
        type: "storyBeat",
        position: newPosition,
        data: { title: `节点 ${childCounter}`, content: "点击添加内容..." },
      }

      const newEdge: CanvasEdge = {
        id: `e${parentId}-${newNodeId}`,
        source: parentId,
        target: newNodeId,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
      }

      setNodes((nds) => [...nds, newNode])
      setEdges((eds) => [...eds, newEdge])
      setChildCounter((c) => c + 1)
    },
    [nodes, childCounter]
  )

  const handleAIBranch = useCallback(
    async (parentId: string) => {
      const parentNode = nodes.find((n) => n.id === parentId)
      if (!parentNode || isGenerating) return

      setIsGenerating(true)

      try {
        const loreContext = nodes.map((n) => `${n.data.title}: ${n.data.content}`).join("\n")

        const response = await fetch("/api/canvas/branch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPath: `父节点: ${parentNode.data.title}\n${parentNode.data.content}`,
            lorebookContext: loreContext,
          }),
        })

        if (!response.ok) throw new Error("生成失败")
        const { branches } = await response.json() as { branches: Array<{title: string; summary: string; type: string}> }

        const parentPos = parentNode.position
        const branchCount = branches?.length || 3
        const spacing = 250
        const startX = parentPos.x - ((branchCount - 1) * spacing) / 2

        const newNodes: StoryBeatNodeType[] = branches.map((branch, index) => ({
          id: String(childCounter + index + 1),
          type: "storyBeat" as const,
          position: { x: startX + index * spacing, y: parentPos.y + 250 },
          data: {
            title: branch.title,
            content: branch.summary,
            branchType: branch.type,
          },
        }))

        const newEdges: CanvasEdge[] = branches.map((branch, index) => ({
          id: `e${parentId}-${childCounter + index + 1}`,
          source: parentId,
          target: String(childCounter + index + 1),
          type: "smoothstep",
          animated: true,
          style: { stroke: "#8b5cf6", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
        }))

        setNodes((nds) => [...nds, ...newNodes])
        setEdges((eds) => [...eds, ...newEdges])
        setChildCounter((c) => c + branches.length)
      } catch (error) {
        console.error("AI 分支生成失败:", error)
      } finally {
        setIsGenerating(false)
      }
    },
    [nodes, childCounter, isGenerating]
  )

  const handleDelete = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId))
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId))
    },
    []
  )

  const handleTitleChange = useCallback(
    (nodeId: string, title: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, title } } : n
        )
      )
    },
    []
  )

  const handleContentChange = useCallback(
    (nodeId: string, content: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, content } } : n
        )
      )
    },
    []
  )

  const handleLogicCheck = useCallback(async () => {
    if (isCheckingLogic || nodes.length === 0) return

    setIsCheckingLogic(true)
    try {
      const loreContext = nodes.map((n) => `${n.data.title}: ${n.data.content}`).join("\n")

      const response = await fetch("/api/canvas/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plotTree: nodes.map((n) => ({ id: n.id, data: n.data })),
          lorebookContext: loreContext,
        }),
      })

      if (!response.ok) throw new Error("逻辑审查失败")
      const { issues } = await response.json() as { issues?: Array<{nodeId: string; warning: string; suggestion: string}> }

      const warningMap = new Map<string, { logicWarning: string; warningSuggestion: string }>()
      issues?.forEach((issue) => {
        warningMap.set(issue.nodeId, {
          logicWarning: issue.warning,
          warningSuggestion: issue.suggestion,
        })
      })

      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            logicWarning: warningMap.get(n.id)?.logicWarning || undefined,
            warningSuggestion: warningMap.get(n.id)?.warningSuggestion || undefined,
          },
        }))
      )
    } catch (error) {
      console.error("逻辑审查失败:", error)
    } finally {
      setIsCheckingLogic(false)
    }
  }, [nodes, isCheckingLogic])

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] overflow-hidden bg-background">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          onClick={handleLogicCheck}
          disabled={isCheckingLogic || isGenerating}
          className={cn("shadow-lg", isCheckingLogic && "animate-pulse")}
        >
          {isCheckingLogic ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <AlertTriangle className="w-4 h-4 mr-2" />
          )}
          逻辑体检
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 z-10 bg-muted/90 backdrop-blur-sm rounded-lg p-3 text-xs text-muted-foreground">
        <p className="font-medium mb-1">操作提示：</p>
        <ul className="space-y-1">
          <li>• 拖拽节点创建连线</li>
          <li>• 点击节点边缘的连接点并拖拽到另一节点</li>
          <li>• 点击按钮添加子节点</li>
        </ul>
      </div>

      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onAddChild: handleAddChild,
            onDelete: handleDelete,
            onTitleChange: handleTitleChange,
            onContentChange: handleContentChange,
            onAIBranch: handleAIBranch,
            isGenerating,
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { stroke: "#8b5cf6", strokeWidth: 2 },
          markerEnd: { type: "arrowclosed" as any, color: "#8b5cf6" },
        }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        attributionPosition="bottom-left"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls className="bg-background border rounded-lg shadow-lg" />
        <MiniMap
          className="bg-background border rounded-lg shadow-lg"
          nodeStrokeColor={() => "hsl(var(--foreground))"}
          maskColor="rgb(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  )
}
