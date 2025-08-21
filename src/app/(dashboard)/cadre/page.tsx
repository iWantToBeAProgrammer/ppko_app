import { useAuthStore } from "@/stores/auth-store";
import DashboardLayout from "../_components/dashboard-layout";
import { SubVillage } from "@prisma/client";

export default function CadreDashboard() {
  return (
    // For cadre dashboard
    <DashboardLayout
      tableTitle="Daftar Anak di Dusun Saya"
      cadreSubVillage={"MARGOSARI"}
    />
  );
}
