import type { Metadata } from "next"
import "./globals.css"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebarLeft } from "@/components/layout/app-sidebar-left"
import { AppSidebarRight } from "@/components/layout/app-sidebar-right"
import { HeaderControls } from "@/components/layout/header-controls"
import { Separator } from "@/components/ui/separator"
import { MainContent } from "@/components/layout/main-content"
import { ViewProvider } from "@/components/layout/view-context"
import { NarrativeProvider } from "@/components/layout/narrative-context"

export const metadata: Metadata = {
  title: "AetherWriter",
  description: "专业 AI 辅助写作应用",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ViewProvider>
          <NarrativeProvider>
            <SidebarProvider defaultOpen={true}>
              <AppSidebarLeft />
              <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <div className="flex flex-1 items-center justify-between">
                    <h1 className="text-lg font-semibold">AetherWriter</h1>
                    <HeaderControls />
                  </div>
                </header>
                <main className="flex-1 bg-background">
                  <MainContent />
                </main>
              </SidebarInset>
              <AppSidebarRight />
            </SidebarProvider>
          </NarrativeProvider>
        </ViewProvider>
      </body>
    </html>
  )
}
