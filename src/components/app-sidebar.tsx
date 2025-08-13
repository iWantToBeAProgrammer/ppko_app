"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calculator,
  Command,
  GalleryVerticalEnd,
  Home,
  Settings2,
  SquareTerminal,
  TrendingUp,
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
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "PPKO Rumah Sahabat",
    email: "PPKORumahSahabat@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "PPKO Rumah Sahabat",
      logo: GalleryVerticalEnd,
      plan: "Temanggung",
    },
  ],
  navMain: {
    user: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isActive: true,
      },
      {
        title: "Grafik Pertumbuhan",
        url: "/growth-chart",
        icon: TrendingUp,
      },
      {
        title: "Rekomendasi Makanan",
        url: "/food-recommendations",
        icon: Utensils,
      },
    ],

    cadre: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isActive: true,
      },
      {
        title: "Tambah Warga",
        url: "/add-resident",
        icon: Users,
      },
      {
        title: "Kalkulator",
        url: "/calculator",
        icon: Calculator,
      },
    ],

    admin: [
      {
        title: "Dashboard",
        url: "#",
        icon: Home,
        isActive: true,
      },
      {
        title: "Kader",
        url: "/cadres",
        icon: UserCog,
      },
      {
        title: "Kalkulator",
        url: "/calculator",
        icon: Calculator,
      },
      {
        title: "Makanan",
        url: "/food-recipes",
        icon: Utensils,
      },
      {
        title: "Gallery",
        url: "/galleries",
        icon: BookOpen,
      },
      {
        title: "Artikel",
        url: "/articles",
        icon: Settings2,
      },
    ],
  },
};
const userRole = "cadre"; // or 'user' or 'cadre'
const navigation = data.navMain[userRole];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-white">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigation} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
