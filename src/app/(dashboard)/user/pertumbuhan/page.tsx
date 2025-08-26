"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { StuntingStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ChartLineDots } from "../../_components/chart-line-dots";
import { ColumnConfig, DataTable } from "../../_components/data-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type MeasurementHistory = {
  id: string;
  measurement_date: string;
  age: string;
  gender: string;
  height: number;
  zScore: number;
  stuntingStatus: StuntingStatus;
};

type Child = {
  id: string;
  first_name: string;
  last_name: string;
  gender: "MALE" | "FEMALE";
  dateOfBirth: string;
};

export default function UserPertumbuhanPage() {
  const children: Child[] =
    useAuthStore((state) => state.profile.children) ?? [];

  const { data: measurementHistory, isLoading: isLoadingHistory } = useQuery<{
    measurements: MeasurementHistory[];
  }>({
    queryKey: ["measurement-history", children[0]?.id],
    queryFn: async () => {
      if (!children[0]?.id) return { measurements: [] };
      const res = await fetch(`/api/measurement/${children[0]?.id}`);
      if (!res.ok) throw new Error("Failed to fetch measurement history");
      return res.json();
    },

    enabled: !!children[0]?.id,
  });

  const measurementHistoryColumns: ColumnConfig<MeasurementHistory>[] = [
    {
      key: "measurement_date",
      header: "Tanggal Ukur",
      sortable: true,
      render: (value: Date) => {
        const date = new Date(value);
        return format(date, "dd MMM yyyy", { locale: id });
      },
    },
    {
      key: "age",
      header: "Umur",
      sortable: true,
    },
    {
      key: "gender",
      header: "Jenis Kelamin",
      hiddenOnMobile: true,
      render: (value: string) => (value === "MALE" ? "Laki-laki" : "Perempuan"),
    },
    {
      key: "height",
      header: "Tinggi (cm)",
      sortable: true,
      render: (value: string) => `${value} cm`,
    },
    {
      key: "zScore",
      header: "Z-Score",
      sortable: true,
      render: (value: Number) => Number(value).toFixed(2),
    },
    {
      key: "stuntingStatus",
      header: "Status",
      type: "status",
      sortable: true,
      statusConfig: [
        {
          value: "NORMAL",
          color: "green",
          label: "Normal",
        },
        {
          value: "STUNTING_SEDANG",
          color: "yellow",
          label: "Stunting Sedang",
        },
        {
          value: "STUNTING_BERAT",
          color: "red",
          label: "Stunting Berat",
        },
      ],
    },
  ];
  return (
    <div className="px-8">
      <Card className="mt-8">
        <CardHeader>
          <CardDescription>
            Grafik tinggi badan berdasarkan bulan pengukuran
          </CardDescription>
        </CardHeader>
        <ChartLineDots
          childData={children[0]}
          measurementData={measurementHistory?.measurements || []}
        />
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Hasil Pengukuran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={measurementHistory?.measurements || []}
            columns={measurementHistoryColumns}
            searchable={{
              key: "measurement_date",
              placeholder: "Cari berdasarkan tanggal...",
            }}
            showRowNumbers={true}
            rowNumbersConfig={{
              header: "No.",
              startFrom: 1,
            }}
            isLoading={isLoadingHistory}
          />
        </CardContent>
      </Card>
    </div>
  );
}
