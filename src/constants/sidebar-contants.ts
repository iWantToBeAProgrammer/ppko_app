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
      url: "/user",
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
      url: "/cadre",
      icon: Home,
    },
    {
      title: "Tambah Warga",
      url: "/cadre/warga",
      icon: Users,
    },
    {
      title: "Kalkulator",
      url: "/cadre/kalkulator",
      icon: Calculator,
    },
  ],

  ADMIN: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Kader",
      url: "/admin/kader",
      icon: UserCog,
    },
    {
      title: "Kalkulator",
      url: "/admin/kalkulator",
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
