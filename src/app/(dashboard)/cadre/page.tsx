import DashboardLayout from "../_components/dashboard-layout";

export default function CadreDashboard() {
  return (
    <DashboardLayout
      tableTitle="Warga Desa"
      stuntingTotal={10}
      normalTotal={20}
      userTotal={30}
    />
  );
}
