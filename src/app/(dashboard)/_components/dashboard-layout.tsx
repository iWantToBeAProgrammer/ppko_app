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
import { useState, useMemo } from "react";
import { EditUserDialog } from "./edit-user-dialog";
import { DeleteConfirmationDialog } from "./delete-user-dialog";
import { useAuthStore } from "@/stores/auth-store"; // Assuming this is your auth store

type Dashboard = {
  tableTitle: string;
  cadreSubVillage?: string; // Pass the cadre's subVillage when needed
};

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
      id: string;
      measurementDate: Date | string;
      stuntingStatus: string;
      height: number;
      heightForAgeZScore: number;
    }[];
  }[];
};

type ChartData = {
  month: string;
  normal: number;
  stunting: number;
};

export default function DashboardLayout({
  tableTitle,
  cadreSubVillage,
}: Dashboard) {
  const pathname = usePathname();
  const cadreDashboard = pathname.startsWith("/cadre");
  const currentUser = useAuthStore((state) => state.profile);

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: [
      "dashboard-users",
      cadreDashboard,
      cadreSubVillage,
      currentUser?.subVillage,
    ],
    queryFn: async () => {
      try {
        const url = new URL("/api/dashboard", window.location.origin);

        // For cadre dashboard, filter by their subVillage
        if (cadreDashboard && currentUser?.subVillage) {
          url.searchParams.set("subVillage", currentUser.subVillage);
        } else if (cadreSubVillage) {
          // Fallback to passed subVillage prop
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

  // Get the latest measurement for each child to determine current status
  const getLatestMeasurement = (
    measurements: UserWithChildren["children"][0]["measurements"]
  ) => {
    if (!measurements || measurements.length === 0) return null;
    return measurements.reduce((latest, current) => {
      const currentDate = new Date(current.measurementDate);
      const latestDate = new Date(latest.measurementDate);
      return currentDate > latestDate ? current : latest;
    });
  };

  const stuntingTotal = useMemo(() => {
    if (!users) return 0;
    return users.reduce((count: number, user: UserWithChildren) => {
      return (
        count +
        user.children.filter((child) => {
          const latestMeasurement = getLatestMeasurement(child.measurements);
          return (
            latestMeasurement &&
            (latestMeasurement.stuntingStatus === "STUNTING" ||
              latestMeasurement.stuntingStatus === "STUNTING_BERAT")
          );
        }).length
      );
    }, 0);
  }, [users]);

  const normalTotal = useMemo(() => {
    if (!users) return 0;
    return users.reduce((count: number, user: UserWithChildren) => {
      return (
        count +
        user.children.filter((child) => {
          const latestMeasurement = getLatestMeasurement(child.measurements);
          return (
            latestMeasurement && latestMeasurement.stuntingStatus === "NORMAL"
          );
        }).length
      );
    }, 0);
  }, [users]);

  // Get unique subVillages count (only for admin dashboard)
  const villageTotal = useMemo(() => {
    if (cadreDashboard || !users) return undefined;
    const uniqueSubVillages = new Set(
      users
        .filter((user: UserWithChildren) => user.subVillage)
        .map((user: UserWithChildren) => user.subVillage)
    );
    return uniqueSubVillages.size;
  }, [users, cadreDashboard]);

  // Process data for chart - group by month
  const chartData: ChartData[] = useMemo(() => {
    if (!users || users.length === 0) return [];

    // Collect all measurements from all children
    type ProcessedMeasurement = {
      id: string;
      measurementDate: Date;
      stuntingStatus: string;
      height: number;
      heightForAgeZScore: number;
    };

    const allMeasurements: ProcessedMeasurement[] = users.flatMap(
      (user: UserWithChildren) =>
        user.children.flatMap((child) =>
          child.measurements.map((measurement) => ({
            id: measurement.id,
            measurementDate: new Date(measurement.measurementDate),
            stuntingStatus: measurement.stuntingStatus,
            height: measurement.height,
            heightForAgeZScore: measurement.heightForAgeZScore,
          }))
        )
    );

    if (allMeasurements.length === 0) return [];

    // Group by month-year
    const monthlyData = allMeasurements.reduce(
      (acc: Record<string, ChartData>, measurement) => {
        const monthKey = measurement.measurementDate.toLocaleDateString(
          "id-ID",
          {
            year: "numeric",
            month: "short",
          }
        );

        if (!acc[monthKey]) {
          acc[monthKey] = {
            month: monthKey,
            normal: 0,
            stunting: 0,
          };
        }

        if (measurement.stuntingStatus === "NORMAL") {
          acc[monthKey].normal++;
        } else if (
          measurement.stuntingStatus === "STUNTING" ||
          measurement.stuntingStatus === "STUNTING_BERAT"
        ) {
          acc[monthKey].stunting++;
        }

        return acc;
      },
      {}
    );

    // Convert to array and sort by date
    const sortedData: ChartData[] = Object.values(monthlyData).sort((a, b) => {
      // Parse month-year strings for proper sorting
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];

      const [monthA, yearA] = a.month.split(" ");
      const [monthB, yearB] = b.month.split(" ");

      const monthIndexA = monthNames.indexOf(monthA);
      const monthIndexB = monthNames.indexOf(monthB);

      const dateA = new Date(parseInt(yearA), monthIndexA);
      const dateB = new Date(parseInt(yearB), monthIndexB);

      return dateA.getTime() - dateB.getTime();
    });

    // Get last 12 months of data or all data if less than 12 months
    return sortedData.slice(-12);
  }, [users]);

  // Flatten the data for the table (one row per child with latest measurement)
  const tableData = useMemo(() => {
    if (!users) return [];

    return users.flatMap((parent: UserWithChildren) =>
      parent.children.map((child) => {
        const latestMeasurement = getLatestMeasurement(child.measurements);
        const fullName = `${child.first_name} ${child.last_name}`;
        const parentFullName = `${parent.first_name} ${parent.last_name}`;

        let status = "belum diukur";
        if (latestMeasurement) {
          switch (latestMeasurement.stuntingStatus) {
            case "NORMAL":
              status = "normal";
              break;
            case "STUNTING":
              status = "stunting";
              break;
            case "STUNTING_BERAT":
              status = "stunting berat";
              break;
            default:
              status = "tidak diketahui";
          }
        }

        return {
          id: child.id,
          parentId: parent.id,
          parents_name: parentFullName,
          childs_name: fullName,
          address: parent.address || "Alamat tidak tersedia",
          subVillage: parent.subVillage || "Tidak diketahui",
          status,
          lastMeasured: latestMeasurement?.measurementDate || null,
        };
      })
    );
  }, [users]);

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
    // Show subVillage column only for admin dashboard
    ...(!cadreDashboard
      ? [
          {
            key: "subVillage",
            header: "Dusun",
            sortable: true,
            hiddenOnMobile: true,
          },
        ]
      : []),
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

      {/* Pass the processed chart data to ChartBarMultiple */}
      <ChartBarMultiple data={chartData} isLoading={isLoading} />

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
