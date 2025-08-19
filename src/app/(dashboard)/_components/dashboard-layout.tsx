"use client";

import { FishOff, Ham, House, User } from "lucide-react";
import { ChartBarMultiple } from "./chart-bar-multiple";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { usePathname } from "next/navigation";

type Dashboard = {
  userTotal: number;
  stuntingTotal: number;
  normalTotal: number;
  villageTotal?: number;
  tableTitle: string;
};

export default function DashboardLayout({
  userTotal,
  stuntingTotal,
  normalTotal,
  villageTotal,
  tableTitle,
}: Dashboard) {
  const pathname = usePathname();

  const cadreDashboard = pathname.startsWith("/cadre");

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>

      <div className="data-card shadow-md rounded-lg py-4 px-4 sm:px-8 bg-white flex items-center lg:flex-row flex-col justify-center lg:gap-0 gap-8 sm:justify-between mb-4">
        <div className="user-total flex items-center gap-6  w-full">
          <div className="w-16 h-16 bg-primary text-white rounded-full p-2 flex items-center justify-center">
            <User size={32} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-muted-foreground">Total Warga</h4>
            <h1 className="text-xl font-bold">{userTotal}</h1>
          </div>
        </div>
        <div className="stunting-total flex items-center gap-6  w-full">
          <div className="w-16 h-16 bg-red-400 text-white rounded-full p-2 flex items-center justify-center">
            <FishOff size={32} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-muted-foreground">Kekurangan Gizi</h4>
            <h1 className="text-xl font-bold">{stuntingTotal}</h1>
          </div>
        </div>
        <div
          className={`normal-total flex items-center gap-6  w-full ${
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
          <div className="village-total flex items-center gap-6  w-full flex-1/4">
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
          <DataTable isCadre={cadreDashboard} />
        </CardContent>
      </Card>
    </div>
  );
}
