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
import { DISTANCE_LABELS, FOCALIZATION_LABELS, DURATION_LABELS } from "@/lib/prompts"

function SimpleNarrativePanel() {
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
          <div className="p-4">
            <SimpleNarrativePanel />
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
