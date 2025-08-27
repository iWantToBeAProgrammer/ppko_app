"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { GrowthChartCalculator } from "@/lib/z-score-calculator-static";
import boysData from "../../data/boys.json";
import girlsData from "../../data/girls.json";
import { StuntingStatus } from "@prisma/client";
import { ColumnConfig, DataTable } from "./data-table";
import { ChartLineDots } from "./chart-line-dots";

type Child = {
  id: string;
  first_name: string;
  last_name: string;
  gender: "MALE" | "FEMALE";
  dateOfBirth: string;
  measurements?: {
    height?: string;
  }[];
};

type MeasurementResult = {
  status: string;
  zScore: string | number;
  keterangan: string;
};

type MeasurementHistory = {
  id: string;
  measurement_date: string;
  age: string;
  gender: string;
  height: number;
  zScore: number;
  stuntingStatus: StuntingStatus;
};

interface StuntingCalculatorProps {
  showChart?: boolean;
  className?: string;
  title?: string;
  description?: string;
  showSubVillageFilter?: boolean;
  showMeasurementHistory?: boolean;
  preSelectedChildId?: string; // Add this new prop
  readOnly?: boolean; // Add this new prop
}

export function StuntingCalculator({
  showChart = true,
  className = "",
  title = "Kalkulator Stunting Anak",
  description = "Masukkan data anak anda untuk memeriksa status pertumbuhan",
  showSubVillageFilter = false,
  showMeasurementHistory = true,
  preSelectedChildId, // Add this
  readOnly = false, // Add this
}: StuntingCalculatorProps) {
  const queryClient = useQueryClient();

  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [height, setHeight] = useState<string>("");
  const [measurementResult, setMeasurementResult] =
    useState<MeasurementResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(false);
  const [selectedSubVillage, setSelectedSubVillage] = useState<string>("all");

  // Fetch children
  const { data, isLoading } = useQuery<{ children: Child[] }>({
    queryKey: ["children", selectedSubVillage],
    queryFn: async () => {
      const url =
        showSubVillageFilter && selectedSubVillage !== "all"
          ? `/api/children?subVillage=${selectedSubVillage}`
          : "/api/children";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch children");
      return res.json();
    },
  });

  // Fetch sub-villages (only if filter is enabled)
  const { data: subVillagesData, isLoading: isLoadingSubVillages } = useQuery<{
    subVillages: string[];
  }>({
    queryKey: ["sub-villages"],
    queryFn: async () => {
      const res = await fetch("/api/sub-villages");
      if (!res.ok) throw new Error("Failed to fetch sub-villages");
      return res.json();
    },
    enabled: showSubVillageFilter,
  });

  // Fetch measurement history for selected child
  const { data: measurementHistory, isLoading: isLoadingHistory } = useQuery<{
    measurements: MeasurementHistory[];
  }>({
    queryKey: ["measurement-history", selectedChild?.id],
    queryFn: async () => {
      if (!selectedChild?.id) return { measurements: [] };
      const res = await fetch(`/api/measurement/${selectedChild.id}`);
      if (!res.ok) throw new Error("Failed to fetch measurement history");
      return res.json();
    },
    enabled: showMeasurementHistory && !!selectedChild?.id,
  });

  useEffect(() => {
    if (preSelectedChildId && data?.children) {
      const child = data.children.find((c) => c.id === preSelectedChildId);
      if (child) {
        setSelectedChild(child);
      }
    }
  }, [preSelectedChildId, data?.children]);

  // Submit measurement
  const mutation = useMutation({
    mutationFn: async (payload: {
      height: number;
      zScore: number;
      status: string;
      childId: string;
    }) => {
      if (!selectedChild) throw new Error("No child selected");
      const res = await fetch("/api/measurement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan.");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Hasil pengukuran berhasil disimpan!");
      queryClient.invalidateQueries({ queryKey: ["measurements"] });
      queryClient.invalidateQueries({
        queryKey: ["measurement-history", selectedChild?.id],
      });
      setHeight("");
      setShowResult(true);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Terjadi kesalahan saat menyimpan data.");
      setError(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!selectedChild) {
        alert("Pilih data anak terlebih dahulu!!");
        return;
      }

      // ✅ Calculate age in days
      const today = new Date();
      const birthDate = new Date(selectedChild.dateOfBirth);
      const diffMilliseconds = today.getTime() - birthDate.getTime();
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const ageInDays = Math.floor(diffMilliseconds / millisecondsPerDay);

      // ✅ Pick data by gender
      const data = selectedChild.gender === "MALE" ? boysData : girlsData;
      const dataByGender = new GrowthChartCalculator(data);

      // ✅ Calculate Z-score
      const result = dataByGender.calculateZScore(
        parseFloat(height),
        ageInDays
      );

      if (!result || result.zScore === null) {
        setMeasurementResult({
          status: "Data tidak tersedia",
          zScore: "-",
          keterangan:
            "Parameter WHO untuk usia/jenis kelamin ini tidak ditemukan.",
        });
      } else {
        let status = "";
        if (result.zScore < -3) status = "Stunting Berat";
        else if (result.zScore < -2) status = "Stunting Sedang";
        else status = "Normal";

        const formattedResult: MeasurementResult = {
          status: status.replace(" ", "_").toUpperCase(),
          zScore: result.zScore.toFixed(2),
          keterangan:
            status === "Normal"
              ? "Pertumbuhan anak normal."
              : "Segera konsultasikan ke dokter/puskesmas.",
        };

        setMeasurementResult(formattedResult);

        // ✅ Save result into database
        mutation.mutate({
          childId: selectedChild?.id,
          height: parseFloat(height),
          zScore: result.zScore,
          status:
            (measurementResult?.status as StuntingStatus) ||
            (formattedResult.status as StuntingStatus),
        });
      }
    } catch (err) {
      console.error("Error calculating Z-score:", err);
      toast.error("Gagal menghitung Z-score");
    }
  };

  const handleSelectChild = (childId: string) => {
    const child = data?.children.find((c) => c.id === childId) || null;
    setSelectedChild(child);
  };

  const handleSubVillageChange = (value: string) => {
    setSelectedSubVillage(value);
    setSelectedChild(null); // Reset selected child when changing sub-village
  };

  // Configure columns for measurement history table
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
    <div className={cn("sm:px-8 py-4 px-4", className)}>
      <Card className="mx-auto p-4 sm:p-16">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-5xl font-semibold">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-8 sm:w-full sm:max-w-3/4 mx-auto border rounded-xl sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Sub Village Filter - Only show for admin */}
            {showSubVillageFilter && (
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Filter Desa/Kelurahan
                </label>
                <Select
                  value={selectedSubVillage}
                  onValueChange={handleSubVillageChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih desa/kelurahan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Desa/Kelurahan</SelectLabel>
                      <SelectItem value="all">Semua Desa/Kelurahan</SelectItem>
                      {isLoadingSubVillages ? (
                        <p className="px-2 text-sm">Loading...</p>
                      ) : (
                        subVillagesData?.subVillages.map((subVillage) => (
                          <SelectItem key={subVillage} value={subVillage}>
                            {subVillage}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Select Anak */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Nama Anak
              </label>
              <Select
                onValueChange={handleSelectChild}
                disabled={readOnly}
                value={selectedChild?.id || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih anak" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Anak</SelectLabel>
                    {isLoading ? (
                      <p className="px-2 text-sm">Loading...</p>
                    ) : (
                      data?.children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.first_name} {child.last_name}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Jenis Kelamin
              </label>
              <Input
                value={
                  selectedChild
                    ? selectedChild.gender === "MALE"
                      ? "Laki-laki"
                      : "Perempuan"
                    : ""
                }
                disabled={true} // Keep this always disabled as it was
                className="bg-gray-100"
              />
            </div>

            {/* Tanggal Lahir */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Tanggal Lahir
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled
                    className={cn(
                      "w-full justify-start text-left font-normal bg-gray-100"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedChild ? (
                      format(
                        new Date(selectedChild.dateOfBirth),
                        "dd MMMM yyyy",
                        { locale: id }
                      )
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
              </Popover>
            </div>

            {/* Tinggi Badan */}
            {!readOnly && (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Tinggi/Panjang Badan Anak
                  <span className="text-sm font-normal text-gray-500 ml-1 sm:ml-2">
                    (Cm, misal 75.5)
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={selectedChild?.measurements?.[0].height || height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="0.00"
                  disabled={readOnly} // Add this
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                />
              </div>
            )}
            {!readOnly && (
              <CardFooter className="flex justify-center mt-8 sm:mt-12">
                <button
                  type="submit"
                  disabled={mutation.isPending} // Add readOnly condition
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-pink-200 border border-black text-gray-800 font-medium rounded-md hover:bg-pink-300 transition-colors duration-200 disabled:opacity-50"
                >
                  {mutation.isPending ? "Menyimpan..." : "Cek Status Stunting"}
                </button>
              </CardFooter>
            )}
          </form>

          {showResult && measurementResult && !error && (
            <div className="p-4 mt-4 border rounded bg-gray-100">
              <p>
                <strong>Status:</strong> {measurementResult.status}
              </p>
              <p>
                <strong>Z-Score:</strong> {measurementResult.zScore}
              </p>
              <p>
                <strong>Keterangan:</strong> {measurementResult.keterangan}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {showChart && selectedChild && (
        <Card className="mt-8">
          <CardHeader>
            <CardDescription>
              Grafik tinggi badan berdasarkan bulan pengukuran
            </CardDescription>
          </CardHeader>
          <ChartLineDots
            childData={selectedChild}
            measurementData={measurementHistory?.measurements || []}
          />
        </Card>
      )}

      {showMeasurementHistory && selectedChild && (
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
      )}
    </div>
  );
}
