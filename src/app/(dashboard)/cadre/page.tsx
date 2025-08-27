"use client";

import { useAuthStore } from "@/stores/auth-store";
import DashboardLayout from "../_components/dashboard-layout";
import { SubVillage } from "@prisma/client";

export default function CadreDashboard() {
  const subVillage = useAuthStore((state) => state.profile.subVillage);
  return (
    // For cadre dashboard
    <DashboardLayout
      tableTitle="Daftar Anak di Dusun Saya"
      cadreSubVillage={subVillage}
    />
  );
}
