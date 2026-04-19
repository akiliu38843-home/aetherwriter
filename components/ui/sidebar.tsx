"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [openMobile, setOpenMobile] = React.useState(false)
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }
      },
      [setOpenProp, open]
    )

    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)")
      setIsMobile(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches)
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "none" | "icon" | "full"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "none",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width-mobile] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        data-state={state}
        data-collapsible={collapsible}
        data-variant={variant}
        data-side={side}
        className={cn(
          "group peer hidden text-sidebar-foreground md:block",
          "transition-[width,height] ease-linear",
          "h-svh w-[--sidebar-width]",
          state === "expanded" && [
            "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
            "group-data-[collapsible=icon]:group-data-[side=left]:w-[--sidebar-width-icon]",
            "group-data-[collapsible=icon]:group-data-[side=right]:w-[--sidebar-width-icon]",
          ],
          state === "collapsed" && [
            "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
            "group-data-[collapsible=icon]:group-data-[side=left]:w-[--sidebar-width-icon]",
            "group-data-[collapsible=icon]:group-data-[side=right]:w-[--sidebar-width-icon]",
          ],
          variant === "floating" && [
            "inset-x-4 top-4 bottom-4 rounded-xl border bg-sidebar shadow-2xl",
            "group-data-[collapsible=icon]:inset-x-4 group-data-[collapsible=icon]:top-4 group-data-[collapsible=icon]:bottom-4",
          ],
          variant === "inset" && [
            "inset-4 rounded-lg border bg-sidebar",
            "group-data-[collapsible=icon]:inset-4",
          ],
          side === "right" && "group-data-[collapsible=icon]:right-0 group-data-[collapsible=icon]:ml-0",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col"
          data-collapsible={collapsible}
        >
          {children}
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="sidebar-header"
      className={cn(
        "flex flex-col gap-2 border-b border-sidebar-border p-2",
        className
      )}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="sidebar-footer"
      className={cn(
        "flex flex-col gap-2 border-t border-sidebar-border p-2",
        className
      )}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2",
        "group-data-[footer=static]:pt-0",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="sidebar-group"
      className={cn("relative flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="sidebar-group-label"
      className={cn(
        "flex h-8 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] ease-linear hover:text-sidebar-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-sidebar="sidebar-group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md outline-none ring-sidebar-ring transition-[margin,opacity] ease-linear hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="sidebar-group-content"
    className={cn("flex w-full min-w-0 flex-col", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="sidebar-menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="sidebar-menu-item"
    className={cn("list-none", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  }
>(({ asChild = false, isActive = false, className, children, tooltip, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()
  const isCollapsed = state === "collapsed" && !isMobile

  const button = (
    <Comp
      ref={ref}
      data-sidebar="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2",
        "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
        isActive && "bg-sidebar-accent font-medium",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )

  if (!tooltip && isCollapsed) {
    tooltip = ""
  }

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state === "expanded" || isMobile}
          {...(typeof tooltip === "string"
            ? { children: tooltip }
            : tooltip)}
        />
      </Tooltip>
    )
  }

  return button
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 hover:text-sidebar-accent-foreground group-data-[side=left]:cursor-w-resize group-data-[side=right]:cursor-e-resize [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-x-[50%] after:h-[30px] after:content-['']",
        "group-data-[collapsible=icon]:-translate-x-1/2 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:transition-opacity",
        className
      )}
      {...props}
    >
      <PanelLeft className="size-4" />
    </button>
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      data-sidebar="inset"
      className={cn(
        "flex min-h-svh w-full flex-col bg-background peer/name",
        "group-data-[layout=inset]:has-[[data-sidebar=sidebar]][data-sidebar=sidebar]:ml-[--sidebar-width]",
        "group-data-[layout=inset]:has-[[data-sidebar=sidebar]][data-sidebar=sidebar][data-collapsible=icon]:ml-[--sidebar-width-icon]",
        "group-data-[layout=inset]:has-[[data-sidebar=sidebar]][data-sidebar=sidebar][data-collapsible=icon][data-side=left]:ml-0",
        "group-data-[layout=inset]:has-[[data-sidebar=sidebar]][data-sidebar=sidebar][data-collapsible=icon][data-side=right]:mr-0",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, isMobile } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft className="size-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
}
