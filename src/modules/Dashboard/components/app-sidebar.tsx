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
import { ClipboardListIcon, Clock02Icon, ComputerIcon, Film02Icon,  LoginSquare02Icon, Money03Icon, Settings01Icon, UserAccountIcon, UserShield01Icon, Video02Icon, VoiceIcon } from "@hugeicons/core-free-icons"
import { Link, useLocation } from "react-router"

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
      title: "Language Management",
      url: "#",
      items: [
        {
          title: "Series Language",
          url: "/languageList",
          icon: VoiceIcon,
        },
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
      title: "Subscription Management",
      url: "#",
      items: [
        {
          title: "Subscription Plan",
          url: "/subscriptions",
          icon: Money03Icon
        },
        {
          title: "Order List",
          url: "/orders-list",
          icon: Clock02Icon
        },

      ],
    },
    // {
    //   title: "Architecture",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Accessibility",
    //       url: "#",
    //     },
    //     {
    //       title: "Fast Refresh",
    //       url: "#",
    //     },
    //     {
    //       title: "Next.js Compiler",
    //       url: "#",
    //     },
    //     {
    //       title: "Supported Browsers",
    //       url: "#",
    //     },
    //     {
    //       title: "Turbopack",
    //       url: "#",
    //     },
    //   ],
    // },
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
  const location = useLocation();

  console.log(" location.pathname ", location.pathname);
  return (
    <Sidebar variant="floating" {...props} >
      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="border">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  
                  <img src={"/logo.png"} alt="Snackshows Admin" className="size-8" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Snackshows Admin</span>
                 
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
                      <SidebarMenuSubItem key={item.title} >
                        <SidebarMenuSubButton asChild isActive={location.pathname === item.url} className={
                          location.pathname === item.url
                            ? "font-bold bg-primary text-primary"
                            : ""
                        }>
                          <Link to={item.url}>
                            {'icon' in item && <HugeiconsIcon icon={item.icon} strokeWidth={2} className="size-4" />}
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
