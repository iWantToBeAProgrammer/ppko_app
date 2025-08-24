"use client";

import { useState } from "react";
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
import { ChartLineDots } from "../../_components/chart-line-dots";
import { toast } from "sonner";
import { GrowthChartCalculator } from "@/lib/z-score-calculator-static";
import boysData from "../../../data/boys.json";
import girlsData from "../../../data/girls.json";
import { StuntingStatus } from "@prisma/client";

type Child = {
  id: string;
  first_name: string;
  last_name: string;
  gender: "MALE" | "FEMALE";
  dateOfBirth: string;
};

type MeasurementResult = {
  status: string;
  zScore: string | number;
  keterangan: string;
};

export default function KaderKalkulatorPage() {
  const queryClient = useQueryClient();

  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [measurementResult, setMeasurementResult] =
    useState<MeasurementResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Fetch children
  const { data, isLoading } = useQuery<{ children: Child[] }>({
    queryKey: ["children"],
    queryFn: async () => {
      const res = await fetch("/api/children");
      if (!res.ok) throw new Error("Failed to fetch children");
      return res.json();
    },
  });

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
      setHeight("");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Terjadi kesalahan saat menyimpan data.");
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

      setShowResult(true);
    } catch (err) {
      console.error("Error calculating Z-score:", err);
      toast.error("Gagal menghitung Z-score");
    }
  };

  const handleSelectChild = (childId: string) => {
    const child = data?.children.find((c) => c.id === childId) || null;
    setSelectedChild(child);
  };

  return (
    <div className="sm:px-8 py-4 px-4">
      <h1 className="font-semibold text-semibold mb-8">Kalkulator</h1>

      <Card className="mx-auto p-4 sm:p-16">
        <CardHeader className="text-center ">
          <CardTitle className="text-3xl sm:text-5xl font-semibold">
            Kalkulator Stunting Anak
          </CardTitle>
          <CardDescription>
            Masukkan data anak anda untuk memeriksa status pertumbuhan
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-8 sm:w-full sm:max-w-3/4 mx-auto border rounded-xl sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Select Anak */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Nama Anak
              </label>
              <Select onValueChange={handleSelectChild}>
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
                disabled
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
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              />
            </div>

            <CardFooter className="flex justify-center mt-8 sm:mt-12">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-pink-200 border border-black text-gray-800 font-medium rounded-md hover:bg-pink-300 transition-colors duration-200 disabled:opacity-50"
              >
                {mutation.isPending ? "Menyimpan..." : "Cek Status Stunting"}
              </button>
            </CardFooter>
          </form>

          {showResult && measurementResult && (
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

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Grafik Pertumbuhan
          </CardTitle>
        </CardHeader>
        <ChartLineDots />
      </Card>
    </div>
  );
}
