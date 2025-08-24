"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActionConfig,
  ColumnConfig,
  DataTable,
} from "../../_components/data-table";
import { ArrowUpRight, PenLine, Trash } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AdminKaderPage() {
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

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await prisma.user.findMany({
        where: {
          role: "PARENT",
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          address: true,
          children: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              measurements: {
                select: {
                  id: true,
                  stuntingStatus: true,
                  createdAt: true,
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 1, // Get only the latest measurement
              },
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      if (!users) {
        toast.error("Get user data failed");
        return [];
      }

      // Transform the data to include measurement status handling
      const transformedUsers: UserWithChildren[] = users.map((user) => ({
        id: user.id,
        full_name: user.first_name + " " + user.last_name,
        address: user.address,
        children: user.children.map((child) => ({
          id: child.id,
          full_name: child.first_name + " " + child.last_name,
          measurement_status:
            child.measurements.length > 0
              ? child.measurements[0].stuntingStatus
              : "NOT_MEASURED", // Default status when no measurements exist
          last_measured:
            child.measurements.length > 0
              ? child.measurements[0].createdAt
              : null,
        })),
      }));

      return transformedUsers;
    },
  });

  // Define action configurations
  const actionConfigs: ActionConfig<UserWithChildren>[] = [
    {
      icon: <ArrowUpRight className="h-4 w-4" />,
      label: "Detail Anak",
      onClick: (row: UserWithChildren) => console.log("View details for", row),
      showOnDesktop: true,
      showOnMobile: false,
    },
    {
      icon: <PenLine className="h-4 w-4" />,
      label: "Kalkulator",
      onClick: (row: UserWithChildren) => console.log("Edit", row),
      showOnDesktop: true,
      showOnMobile: true,
    },
    {
      icon: <Trash className="h-4 w-4" />,
      label: "Delete",
      onClick: (row: UserWithChildren) => console.log("Delete", row),
      variant: "destructive",
      requiresPermission: true,
      showOnDesktop: true,
      showOnMobile: true,
    },
  ];

  // Define column configurations
  const columnConfigs: ColumnConfig<UserWithChildren>[] = [
    {
      key: "parent_full_name",
      header: "Nama Orang Tua",
      type: "text",
      sortable: true,
      render: (value: any, row: UserWithChildren) => (
        <div className="font-medium">{row.full_name}</div>
      ),
    },

    {
      key: "children",
      header: "Nama Anak",
      type: "text",
      sortable: false,
      render: (value: any, row: UserWithChildren) => (
        <div className="space-y-1">
          {row.children && row.children.length > 0 ? (
            row.children.map((child, index: number) => (
              <div key={child.id || index} className="text-sm">
                {child.full_name}
              </div>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">
              Tidak ada anak
            </span>
          )}
        </div>
      ),
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
      key: "measurement_status",
      header: "Status Pengukuran",
      type: "text",
      sortable: true,
      hiddenOnMobile: true,
      render: (value: any, row: UserWithChildren) => (
        <div className="space-y-1">
          {row.children && row.children.length > 0 ? (
            row.children.map((child, index: number) => (
              <div key={child.id || index} className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    child.measurement_status === "NOT_MEASURED"
                      ? "bg-red-100 text-red-800"
                      : child.measurement_status === "NORMAL"
                      ? "bg-green-100 text-green-800"
                      : child.measurement_status === "STUNTING"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {child.measurement_status === "NOT_MEASURED"
                    ? "Belum Diukur"
                    : child.measurement_status === "NORMAL"
                    ? "Normal"
                    : child.measurement_status === "STUNTING"
                    ? "Stunting"
                    : child.measurement_status || "Tidak Diketahui"}
                </span>
              </div>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          )}
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
            data={users || []}
            columns={columnConfigs}
            searchable={{
              key: "full_name",
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
              label: "Tambah Kader",
              href: "/admin/kader/tambah",
              enabled: true, // set false to disable
            }}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
