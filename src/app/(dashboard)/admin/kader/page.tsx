"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActionConfig,
  ColumnConfig,
  DataTable,
  StatusConfig,
} from "../../_components/data-table";
import { ArrowUpRight, Loader2, PenLine, Trash } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { EditUserDialog } from "../../_components/edit-user-dialog";
import { DeleteConfirmationDialog } from "../../_components/delete-user-dialog";

export default function AdminKaderPage() {
  type UserWithChildren = {
    id: string;
    first_name: string;
    last_name: string;
    address: string | null;
    subVillage: string;
    email: string;
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard?role=CADRE`);
      if (!res.ok) {
        toast.error("Get user data failed");
        return [];
      }
      const data = await res.json();

      return data.users;
    },
  });

  const tableData =
    users?.flatMap((cadre: UserWithChildren) => ({
      id: cadre.id,
      cadres_name: cadre.first_name + " " + cadre.last_name,
      address: cadre.address || "Alamat tidak tersedia",
      subVillage: cadre.subVillage,
      email: cadre.email,
    })) || [];

  // Define action configurations
  const statusConfigs: StatusConfig[] = [
    { value: "stunting berat", color: "red", label: "Stunting Berat" },
    { value: "stunting", color: "yellow", label: "Stunting" },
    { value: "normal", color: "green", label: "Normal" },
    { value: "belum diukur", color: "gray", label: "Belum Diukur" },
    { value: "tidak diketahui", color: "gray", label: "Tidak Diketahui" },
  ];

  const actionConfigs: ActionConfig<any>[] = [
    {
      icon: <ArrowUpRight className="h-4 w-4" />,
      label: "Detail Anak",
      onClick: (row: any) => console.log("View details for", row),
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
      key: "cadres_name",
      header: "Nama Kader",
      type: "text",
      sortable: true,
    },
    {
      key: "subVillage",
      header: "Penempatan",
      type: "text",
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      type: "text",
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
      key: "actions",
      header: "",
      type: "actions",
      actions: actionConfigs,
    },
  ];

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-semibold mb-8">Kader</h1>

      <Card className="shadow-md rounded-lg mt-4">
        <CardContent>
          <DataTable
            data={tableData}
            columns={columnConfigs}
            searchable={{
              key: "cadres_name",
              placeholder: "Cari Nama Kader",
            }}
            permissions={{
              canEdit: true,
              canView: true,
            }}
            showRowNumbers={true}
            rowNumbersConfig={{
              header: "#",
              startFrom: 1,
            }}
            tambahButton={{
              label: "Tambah Kader",
              href: "/admin/kader/tambah",
              enabled: true, // set false to disable
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
