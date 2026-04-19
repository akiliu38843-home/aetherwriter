"use client"

import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function HeaderControls() {
  const { isMobile, toggleSidebar, state, setOpen } = useSidebar()
  
  const toggleRightSidebar = () => {
    if (isMobile) {
      toggleSidebar()
    } else {
      setOpen(state === "expanded" ? false : true)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleRightSidebar}>
      <BookOpen className="size-4" />
    </Button>
  )
}
