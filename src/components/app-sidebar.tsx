"use client";

import * as React from "react";
import {
  AudioWaveform,
  Baby,
  BookOpen,
  Bot,
  Calculator,
  Coffee,
  Command,
  EllipsisVertical,
  GalleryVerticalEnd,
  Home,
  LogOut,
  Settings2,
  SquareTerminal,
  TrendingUp,
  User,
  UserCog,
  Users,
  Utensils,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { signOut } from "@/actions/auth-action";
import { useAuthStore } from "@/stores/auth-store";
import {
  SIDEBAR_MENU_LIST,
  SidebarMenuKey,
} from "@/constants/sidebar-contants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const profile = useAuthStore((state) => state.profile);
  const { isMobile } = useSidebar();
  const items = SIDEBAR_MENU_LIST[profile.role as SidebarMenuKey] ?? [];
  return (
    <Sidebar collapsible="icon" {...props} className="bg-white">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground  group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-full"
            >
              <div className="font-semibold">
                <div className="flex items-center justify-center rounded-md p-2 bg-primary">
                  <Baby size={18} />
                </div>
                <span className="text-md">PPKO Sikumbang</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="group-data-[collapsible=icon]:pt-4 ">
        <NavMain items={items} />;
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-full"
                >
                  <Avatar className="h-8 w-8 rounded-lg ">
                    <AvatarImage src={""} alt="" />
                    <AvatarFallback className="rounded-lg uppercase">
                      {profile.first_name?.charAt(0)}
                      {profile.last_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className=" leading-tight">
                    <h4 className="truncate font-medium capitalize">
                      {" "}
                      {profile?.first_name + " " + profile?.last_name}
                    </h4>
                    <p className="text-muted-foreground truncate text-xs">
                      {profile.role}
                    </p>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={""} alt="" />
                      <AvatarFallback className="rounded-lg">A</AvatarFallback>
                    </Avatar>
                    <div className=" leading-tight">
                      <h4 className="truncate font-medium capitalize">
                        {profile?.first_name + " " + profile?.last_name}
                      </h4>
                      <p className="text-muted-foreground truncate text-xs">
                        {profile.role}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
