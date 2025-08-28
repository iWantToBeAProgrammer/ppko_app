"use client";

import * as React from "react";
import { Baby, EllipsisVertical, LogOut } from "lucide-react";

import { NavMain } from "@/components/nav-main";

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
                <div className="flex items-center justify-center rounded-md ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="32"
                    height="83"
                    viewBox="0 0 32 83"
                  >
                    <image
                      xlinkHref="data:image/png;base64,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"
                      x="0"
                      y="0"
                      width="32"
                      height="83"
                    />
                  </svg>
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
