"use client"

import { BookOpen, Layout, Settings, BookText } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useView } from "./view-context"

const menuItems = [
  {
    title: "编辑器",
    icon: BookOpen,
    view: "editor" as const,
  },
  {
    title: "大纲画布",
    icon: Layout,
    view: "canvas" as const,
  },
  {
    title: "使用指南",
    icon: BookText,
    view: "wiki" as const,
  },
  {
    title: "设置",
    icon: Settings,
    view: "settings" as const,
  },
]

export function AppSidebarLeft() {
  const { currentView, setCurrentView } = useView()

  return (
    <Sidebar side="left" className="border-r w-56">
      <SidebarHeader className="border-b py-3 px-4">
        <h1 className="font-bold text-base">AetherWriter</h1>
        <p className="text-xs text-muted-foreground">小说润色工具</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="p-2 gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={currentView === item.view}
                    className="w-full h-10 px-3"
                    onClick={() => setCurrentView(item.view)}
                  >
                    <item.icon className="size-5 shrink-0" />
                    <span className="text-sm truncate">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
