"use client";

import { ArrowUpRight, PenLine, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import {
  ActionConfig,
  ColumnConfig,
  DataTable,
  StatusConfig,
} from "../../_components/data-table";
import { useState } from "react";
import { EditUserDialog } from "../../_components/edit-user-dialog";
import { DeleteConfirmationDialog } from "../../_components/delete-user-dialog";

type UserWithChildren = {
  id: string;
  first_name: string;
  last_name: string;
  address: string | null;
  subVillage: string | null;
  children: {
    id: string;
    first_name: string;
    last_name: string;
    measurements: {
      stuntingStatus: string;
      last_measured: Date | null;
    }[];
  }[];
};

export default function KaderWargaPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const cadreSubVillage = useAuthStore((state) => state.profile.subVillage);

  const { data: users, isLoading } = useQuery({
    queryKey: ["kader-warga-users", cadreSubVillage],
    queryFn: async () => {
      try {
        const url = new URL("/api/dashboard", window.location.origin);

        // Filter by cadre's subVillage
        if (cadreSubVillage) {
          url.searchParams.set("subVillage", cadreSubVillage);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error("Failed to fetch warga data");
        }

        const data = await response.json();
        return data.users;
      } catch (error) {
        console.error("Warga fetch error:", error);
        toast.error("Failed to load warga data");
        return [];
      }
    },
  });

  console.log(users);

  // Flatten the data for the table (one row per child)
  const tableData =
    users?.flatMap((parent: UserWithChildren) =>
      parent.children.map((child) => ({
        id: parent.id,
        parents_name: parent.first_name + " " + parent.last_name,
        childs_name: child.first_name + " " + parent.last_name,
        address: parent.address || "Alamat tidak tersedia",
        stuntingStatus:
          child.measurements[0]?.stuntingStatus === "NOT_MEASURED"
            ? "belum diukur"
            : child.measurements[0]?.stuntingStatus === "NORMAL"
            ? "normal"
            : child.measurements[0]?.stuntingStatus === "STUNTING"
            ? "stunting"
            : child.measurements[0]?.stuntingStatus === "STUNTING_BERAT"
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
      onClick: (row: any) => setSelectedUser(row),
      showOnDesktop: true,
      showOnMobile: false,
    },
    {
      icon: <PenLine className="h-4 w-4" />,
      label: "Kalkulator",
      onClick: (row: any) => {
        setSelectedUser(row);
        setEditDialogOpen(true);
      },
      showOnDesktop: true,
      showOnMobile: true,
    },
    {
      icon: <Trash className="h-4 w-4" />,
      label: "Delete",
      onClick: (row: any) => {
        setSelectedUser(row);
        setDeleteDialogOpen(true);
      },
      variant: "destructive",
      requiresPermission: true,
      showOnDesktop: true,
      showOnMobile: true,
    },
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
      key: "stuntingStatus",
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
      <h1 className="text-2xl font-semibold mb-8">Data Warga</h1>

      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Daftar Anak di Dusun</CardTitle>
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
              canDelete: true,
              canView: true,
            }}
            showRowNumbers={true}
            rowNumbersConfig={{
              header: "#",
              startFrom: 1,
            }}
            tambahButton={{
              label: "Tambah Warga",
              href: "/cadre/warga/tambah",
              enabled: true,
            }}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

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
