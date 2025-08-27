"use client";

import {
  ArrowUpRight,
  FishOff,
  Ham,
  House,
  PenLine,
  Trash,
  User,
} from "lucide-react";
import { ChartBarMultiple } from "./chart-bar-multiple";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActionConfig,
  ColumnConfig,
  DataTable,
  StatusConfig,
} from "./data-table";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { EditUserDialog } from "./edit-user-dialog";
import { DeleteConfirmationDialog } from "./delete-user-dialog";

type Dashboard = {
  tableTitle: string;
  cadreSubVillage?: string; // Pass the cadre's subVillage when needed
};

type UserWithChildren = {
  id: string;
  full_name: string;
  address: string | null;
  children: {
    id: string;
    full_name: string;
    measurement_status: string;
    last_measured: Date | null;
  }[];
};

export default function DashboardLayout({
  tableTitle,
  cadreSubVillage,
}: Dashboard) {
  const pathname = usePathname();
  const cadreDashboard = pathname.startsWith("/cadre");

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["dashboard-users", cadreDashboard, cadreSubVillage],
    queryFn: async () => {
      try {
        const url = new URL("/api/dashboard", window.location.origin);

        // Add subVillage parameter if it's a cadre dashboard
        if (cadreDashboard && cadreSubVillage) {
          url.searchParams.set("subVillage", cadreSubVillage);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        return data.users;
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        toast.error("Failed to load dashboard data");
        return [];
      }
    },
  });

  // Calculate statistics from the actual data
  const userTotal = users?.length || 0;

  const stuntingTotal =
    users?.reduce((count: number, user: UserWithChildren) => {
      return (
        count +
        user.children.filter(
          (child) =>
            child.measurement_status === "STUNTING" ||
            child.measurement_status === "STUNTING_BERAT"
        ).length
      );
    }, 0) || 0;

  const normalTotal =
    users?.reduce((count: number, user: UserWithChildren) => {
      return (
        count +
        user.children.filter((child) => child.measurement_status === "NORMAL")
          .length
      );
    }, 0) || 0;

  // Get unique subVillages count (only for admin dashboard)
  const villageTotal = !cadreDashboard
    ? new Set(
        users?.map((user: UserWithChildren) =>
          user.children.length > 0 ? "hasChildren" : "noChildren"
        )
      ).size || 0
    : undefined;

  // Flatten the data for the table (one row per child)
  const tableData =
    users?.flatMap((parent: UserWithChildren) =>
      parent.children.map((child) => ({
        id: parent.id,
        parents_name: parent.full_name,
        childs_name: child.full_name,
        address: parent.address || "Alamat tidak tersedia",
        status:
          child.measurement_status === "NOT_MEASURED"
            ? "belum diukur"
            : child.measurement_status === "NORMAL"
            ? "normal"
            : child.measurement_status === "STUNTING"
            ? "stunting"
            : child.measurement_status === "STUNTING_BERAT"
            ? "stunting berat"
            : "tidak diketahui",
      }))
    ) || [];

  // Define status configurations
  const statusConfigs: StatusConfig[] = [
    { value: "stunting berat", color: "red", label: "Stunting Berat" },
    { value: "stunting", color: "yellow", label: "Stunting" },
    { value: "normal", color: "green", label: "Normal" },
    { value: "belum diukur", color: "gray", label: "Belum Diukur" },
    { value: "tidak diketahui", color: "gray", label: "Tidak Diketahui" },
  ];

  // Define action configurations
  const actionConfigs: ActionConfig<any>[] = [
    {
      icon: <ArrowUpRight className="h-4 w-4" />,
      label: "Detail Anak",
      onClick: (row: any) => {
        // Navigate to child detail page
        window.location.href = `/dashboard/anak/${row.id}`;
      },
      showOnDesktop: true,
      showOnMobile: false,
    },
    {
      icon: <PenLine className="h-4 w-4" />,
      label: "Edit",
      onClick: (row: any) => {
        setSelectedUser(row);
        setEditDialogOpen(true);
      },
      showOnDesktop: true,
      showOnMobile: true,
    },
    ...(cadreDashboard
      ? [
          {
            icon: <Trash className="h-4 w-4" />,
            label: "Delete",
            onClick: (row: any) => {
              setSelectedUser(row);
              setDeleteDialogOpen(true);
            },
            variant: "destructive" as const,
            requiresPermission: true,
            showOnDesktop: true,
            showOnMobile: true,
          },
        ]
      : []),
  ];

  // Define column configurations
  const columnConfigs: ColumnConfig<any>[] = [
    {
      key: "parents_name",
      header: "Nama Orang Tua",
      type: "text",
      sortable: true,
    },
    {
      key: "childs_name",
      header: "Nama Anak",
      type: "text",
      sortable: true,
    },
    {
      key: "address",
      header: "Alamat",
      type: "text",
      sortable: true,
      hiddenOnMobile: true,
      width: "max-w-[200px] truncate",
      render: (value: string) => (
        <div className="text-sm text-muted-foreground hidden lg:block max-w-[200px] truncate">
          {value}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      type: "status",
      statusConfig: statusConfigs,
    },
    {
      key: "actions",
      header: "",
      type: "actions",
      actions: actionConfigs,
    },
  ];

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>

      <div className="data-card shadow-md rounded-lg py-4 px-4 sm:px-8 bg-white flex items-center lg:flex-row flex-col justify-center lg:gap-0 gap-8 sm:justify-between mb-4">
        <div className="user-total flex items-center gap-6 w-full">
          <div className="w-16 h-16 bg-primary text-white rounded-full p-2 flex items-center justify-center">
            <User size={32} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-muted-foreground">Total Warga</h4>
            <h1 className="text-xl font-bold">{userTotal}</h1>
          </div>
        </div>
        <div className="stunting-total flex items-center gap-6 w-full">
          <div className="w-16 h-16 bg-red-400 text-white rounded-full p-2 flex items-center justify-center">
            <FishOff size={32} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-muted-foreground">Kekurangan Gizi</h4>
            <h1 className="text-xl font-bold">{stuntingTotal}</h1>
          </div>
        </div>
        <div
          className={`normal-total flex items-center gap-6 w-full ${
            cadreDashboard && "flex-1/3"
          }`}
        >
          <div className="w-16 h-16 bg-teal-500 text-white rounded-full p-2 flex items-center justify-center">
            <Ham size={32} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-muted-foreground">Normal</h4>
            <h1 className="text-xl font-bold">{normalTotal}</h1>
          </div>
        </div>
        {!cadreDashboard && (
          <div className="village-total flex items-center gap-6 w-full flex-1/4">
            <div className="w-16 h-16 bg-secondary text-white rounded-full p-2 flex items-center justify-center">
              <House size={32} />
            </div>
            <div className="flex flex-col">
              <h4 className="text-muted-foreground">Dusun</h4>
              <h1 className="text-xl font-bold">{villageTotal}</h1>
            </div>
          </div>
        )}
      </div>

      <ChartBarMultiple />

      <Card className="shadow-md rounded-lg mt-4">
        <CardHeader>
          <CardTitle>{tableTitle}</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            data={tableData}
            columns={columnConfigs}
            searchable={{
              key: "parents_name",
              placeholder: "Cari Nama Orang Tua",
            }}
            permissions={{
              canEdit: true,
              canDelete: cadreDashboard,
              canView: true,
            }}
            showRowNumbers={true}
            rowNumbersConfig={{
              header: "#",
              startFrom: 1,
            }}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      {selectedUser && (
        <EditUserDialog
          isOpen={editDialogOpen}
          onClose={() => {
            setEditDialogOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {selectedUser && (
        <DeleteConfirmationDialog
          isOpen={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}
    </div>
  );
}
