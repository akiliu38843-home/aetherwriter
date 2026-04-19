"use client"

import { EditorLayout } from "@/components/editor/editor-layout"
import { PlotCanvas } from "@/components/canvas/plot-canvas"
import { WikiPage } from "@/components/wiki/wiki-page"
import { useView } from "./view-context"

export function MainContent() {
  const { currentView } = useView()

  const renderContent = () => {
    switch (currentView) {
      case "editor":
        return <EditorLayout />
      case "canvas":
        return <PlotCanvas />
      case "wiki":
        return <WikiPage />
      case "settings":
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">设置页面正在开发中...</p>
          </div>
        )
      default:
        return <EditorLayout />
    }
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      {renderContent()}
    </div>
  )
}
