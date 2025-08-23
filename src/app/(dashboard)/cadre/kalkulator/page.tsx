"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { useState } from "react";
import { ChartLineDots } from "../../_components/chart-line-dots";

export default function KaderKalkulatorPage() {
  const [birthDate, setBirthDate] = useState<Date>();
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="sm:px-8 py-4 px-4">
      <h1 className="font-semibold text-semibold mb-8">Kalkulator</h1>

      <Card className=" mx-auto p-4 sm:p-16 ">
        <CardHeader className="text-center ">
          <CardTitle className="text-3xl sm:text-5xl font-smeibbold">
            Kalkulator Stunting Anak
          </CardTitle>
          <CardDescription>
            Masukkan data anak anda untuk memeriksa status pertumbuhan
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-8 sm:w-full sm:max-w-3/4 mx-auto border rounded-xl sm:p-12">
          <form className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="child_name"
                className="block mb-2 font-medium text-gray-700"
              >
                Nama Anak
              </label>
              <Input
                placeholder="Nama anak..."
                type="text"
                name="child_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Input Jenis Kelamin */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Jenis Kelamin
              </label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Jenis Kelamin</SelectLabel>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Tanggal Lahir
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? (
                      format(birthDate, "dd MMMM yyyy", { locale: id }) // ✅ Indonesian format
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    autoFocus
                    captionLayout="dropdown"
                    startMonth={new Date(1900, 0)}
                    endMonth={new Date()}
                    locale={id} // ✅ Calendar in Indonesian
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Input Tinggi Badan */}
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
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-pink-200 border border-black text-gray-800 font-medium rounded-md hover:bg-pink-300 transition-colors duration-200"
              >
                Cek Status Stunting
              </button>
            </CardFooter>
          </form>
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
