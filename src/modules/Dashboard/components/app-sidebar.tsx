import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { ClipboardListIcon, Clock02Icon, ComputerIcon, Film02Icon, LayoutBottomIcon, LoginSquare02Icon, ModernTvFourKIcon, Money03Icon, Settings01Icon, UserAccountIcon, UserShield01Icon, Video02Icon } from "@hugeicons/core-free-icons"
import { Link } from "react-router"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
     
      items: [
        {
          title: "Overview",
          url: "/",
          icon: ComputerIcon,
        },
        
      ],
    },
    {
      title: "User Management",
      url: "#",
      items: [
        {
          title: "Users Management",
          url: "/users",
          icon: UserAccountIcon,
        },
      ],
    },
    
    {
      title: "Flim Management",
      url: "#",
      items: [
        {
          title: "Category",
          url: "/seriesCategory",
          icon: Film02Icon,
        },
        {
          title: "Series",
          url: "/series",
          icon: ClipboardListIcon,
        },
        {
          title: "Episode List",
          url: "/episodeList",
          icon: Video02Icon,
          // isActive: true,
        },
        // {
        //   title: "Content",
        //   url: "/content",
        //   icon:ModernTvFourKIcon
        // },
       
      ],
    },
    {
      title: "Staff Management",
      url: "#",
      items: [
        {
          title: "Staff",
          url: "/staff",
          icon: UserShield01Icon,
        },
      ],
    },
    {
      title: "Package Management",
      url: "#",
      items: [
        {
          title: "Package List",
          url: "/package-list",
          icon:Money03Icon
        },
        {
          title: "Order List",
          url: "/order-list",
          icon:Clock02Icon
        },
       
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
    {
      title: "System Settings",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "/settings",
          icon: Settings01Icon,
        },
        {
          title: "Log Out",
          url: "/logout",
          icon: LoginSquare02Icon,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={2} className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  
                  <Link to={item.url} className="font-medium">
                    {/* {item.icon && <HugeiconsIcon icon={item.icon} strokeWidth={2} className="size-4" />} */}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link to={item.url}>
                            {item.icon && <HugeiconsIcon icon={item.icon} strokeWidth={2} className="size-4" />}
                            {item.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
