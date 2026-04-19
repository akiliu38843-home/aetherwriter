import { Node, Edge, MarkerType } from '@xyflow/react'

export interface StoryBeatNodeData {
  title: string
  content: string
  onAddChild?: (nodeId: string) => void
  onDelete?: (nodeId: string) => void
  onAIBranch?: (nodeId: string) => void
  onTitleChange?: (nodeId: string, title: string) => void
  onContentChange?: (nodeId: string, content: string) => void
  isGenerating?: boolean
  logicWarning?: string
  warningSuggestion?: string
  branchType?: string
  [key: string]: unknown
}

export interface StoryBeatNode extends Omit<Node, 'type' | 'data'> {
  id: string
  type: 'storyBeat'
  position: { x: number; y: number }
  data: StoryBeatNodeData
}

export interface CanvasEdgeData {
  animated?: boolean
  style?: {
    stroke: string
    strokeWidth: number
  }
  markerEnd?: {
    type: MarkerType
    color: string
  }
}

export interface CanvasEdge extends Edge {
  id: string
  source: string
  target: string
  type?: string
  animated?: boolean
  style?: {
    stroke: string
    strokeWidth: number
  }
  markerEnd?: {
    type: MarkerType
    color: string
  }
}

export interface BranchItem {
  title: string
  summary: string
  type: string
}

export interface LogicIssue {
  nodeId: string
  warning: string
  suggestion: string
}

export interface CanvasState {
  nodes: StoryBeatNode[]
  edges: CanvasEdge[]
  childCounter: number
}
