import { Role } from "@prisma/client";
import DashboardLayout from "../_components/dashboard-layout";

export default function AdminPage() {
  return <DashboardLayout tableTitle="Daftar Anak" role={Role.PARENT} />;
}
