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
  User,
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
      url: "/user/pertumbuhan",
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
      title: "Warga",
      url: "/admin/warga",
      icon: User,
    },
    {
      title: "Kalkulator",
      url: "/admin/kalkulator",
      icon: Calculator,
    },
    {
      title: "Makanan",
      url: "/admin/resep-makanan",
      icon: Utensils,
    },
  ],
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;
