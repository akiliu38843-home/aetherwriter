"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useNarrative } from "./narrative-context"
import { WRITING_MODES, DISTANCE_LABELS, FOCALIZATION_LABELS, DURATION_LABELS } from "@/lib/prompts"
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

function WritingModeSelector() {
  const { selectedMode, applyMode, availableModes } = useNarrative()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-3">
      <div className="text-xs font-medium">润色模式</div>
      
      {selectedMode && (
        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{selectedMode.icon}</span>
            <div className="flex-1">
              <div className="font-medium text-sm">{selectedMode.name}</div>
              <div className="text-xs text-muted-foreground">{selectedMode.description}</div>
            </div>
          </div>
          {selectedMode.example && (
            <p className="text-xs text-muted-foreground italic mt-2">
              {selectedMode.example}
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs border border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>{isExpanded ? '收起模式列表' : '选择润色模式'}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-2 mt-2">
          {availableModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                applyMode(mode)
                setIsExpanded(false)
              }}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-all hover:shadow-md ${
                selectedMode?.id === mode.id
                  ? 'bg-purple-100 border-purple-300 shadow-sm'
                  : 'bg-background border-border hover:bg-purple-50 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{mode.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{mode.name}</div>
                  <div className="text-xs text-muted-foreground">{mode.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function DetailedControls() {
  const { dimensions, setDimensions } = useNarrative()

  return (
    <div className="space-y-4">
      <div className="text-xs font-medium">叙事距离</div>
      <div className="grid grid-cols-2 gap-1">
        {(['extreme-far', 'far', 'near', 'extreme-near'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setDimensions({ ...dimensions, distance: key })}
            className={`text-xs px-2 py-2 rounded border ${
              dimensions.distance === key
                ? 'bg-purple-100 border-purple-300'
                : 'bg-background border-border hover:bg-muted'
            }`}
          >
            {key === 'extreme-far' && '极远'}
            {key === 'far' && '较远'}
            {key === 'near' && '较近'}
            {key === 'extreme-near' && '极近'}
          </button>
        ))}
      </div>

      <Separator />

      <div className="text-xs font-medium">叙事聚焦</div>
      <div className="grid grid-cols-1 gap-1">
        {(['zero', 'internal', 'external'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setDimensions({ ...dimensions, focalization: key })}
            className={`text-xs px-3 py-2 rounded border text-left ${
              dimensions.focalization === key
                ? 'bg-purple-100 border-purple-300'
                : 'bg-background border-border hover:bg-muted'
            }`}
          >
            {FOCALIZATION_LABELS[key]}
          </button>
        ))}
      </div>

      <Separator />

      <div className="text-xs font-medium">叙事时间</div>
      <div className="grid grid-cols-1 gap-1">
        {(['pause', 'scene', 'ellipsis'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setDimensions({ ...dimensions, duration: key })}
            className={`text-xs px-3 py-2 rounded border text-left ${
              dimensions.duration === key
                ? 'bg-purple-100 border-purple-300'
                : 'bg-background border-border hover:bg-muted'
            }`}
          >
            {DURATION_LABELS[key]}
          </button>
        ))}
      </div>
    </div>
  )
}

export function AppSidebarRight() {
  return (
    <Sidebar side="right" className="w-64 border-l">
      <SidebarHeader className="h-14 border-b flex items-center justify-between px-4 shrink-0">
        <h2 className="text-base font-semibold">润色工具</h2>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <ScrollArea className="h-[calc(100vh-3.5rem)] w-full">
          <div className="p-4 space-y-6">
            <WritingModeSelector />
            
            <Separator />
            
            <DetailedControls />
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
