"use client"

import { Wand2 } from "lucide-react"
import { useNarrative } from "./narrative-context"
import { 
  DISTANCE_LABELS,
  FOCALIZATION_LABELS,
  DURATION_LABELS
} from "@/lib/prompts"
import { Separator } from "@/components/ui/separator"

export function NarrativePanel() {
  const { dimensions, setDimensions } = useNarrative()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wand2 className="size-4 text-purple-500" />
        <h3 className="font-medium text-sm">叙事微操</h3>
      </div>
      
      <p className="text-xs text-muted-foreground">
        选择叙事维度后，在编辑器中选中文字并点击"重写"按钮。
      </p>

      <Separator />

      <div className="space-y-3">
        <div>
          <div className="text-xs font-medium mb-2">叙事距离</div>
          <div className="grid grid-cols-2 gap-1">
            {(['extreme-far', 'far', 'near', 'extreme-near'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setDimensions({ ...dimensions, distance: key })}
                className={`text-xs px-2 py-1.5 rounded border ${
                  dimensions.distance === key
                    ? 'bg-purple-100 border-purple-300'
                    : 'bg-background border-border'
                }`}
              >
                {key === 'extreme-far' && '++'}
                {key === 'far' && '+'}
                {key === 'near' && '-'}
                {key === 'extreme-near' && '--'}
                {DISTANCE_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium mb-2">叙事聚焦</div>
          <div className="grid grid-cols-3 gap-1">
            {(['zero', 'internal', 'external'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setDimensions({ ...dimensions, focalization: key })}
                className={`text-xs px-2 py-1.5 rounded border ${
                  dimensions.focalization === key
                    ? 'bg-purple-100 border-purple-300'
                    : 'bg-background border-border'
                }`}
              >
                {FOCALIZATION_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium mb-2">叙事时间</div>
          <div className="grid grid-cols-3 gap-1">
            {(['pause', 'scene', 'ellipsis'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setDimensions({ ...dimensions, duration: key })}
                className={`text-xs px-2 py-1.5 rounded border ${
                  dimensions.duration === key
                    ? 'bg-purple-100 border-purple-300'
                    : 'bg-background border-border'
                }`}
              >
                {DURATION_LABELS[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-xs bg-purple-50 p-2 rounded border">
        <div className="font-medium">当前：</div>
        <div>{DISTANCE_LABELS[dimensions.distance]}</div>
        <div>{FOCALIZATION_LABELS[dimensions.focalization]}</div>
        <div>{DURATION_LABELS[dimensions.duration]}</div>
      </div>
    </div>
  )
}
