import {
  LayoutDashboard,
  Album,
  SquareMenu,
  Armchair,
  Users,
  Home,
  TrendingUp,
  Utensils,
  Calculator,
  UserCog,
  BookOpen,
  Settings2,
  LucideIcon,
} from "lucide-react";

interface SidebarMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const SIDEBAR_MENU_LIST: {
  ADMIN: SidebarMenuItem[];
  PARENT: SidebarMenuItem[];
  CADRE: SidebarMenuItem[];
} = {
  PARENT: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
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

  CADRE: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
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

  ADMIN: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
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
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;
