"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartConfig = {
  normal: {
    label: "Normal",
    color: "var(--color-teal-500)",
  },
  stunting: {
    label: "Stunting",
    color: "var(--color-red-400)",
  },
} satisfies ChartConfig;

type ChartData = {
  month: string;
  normal: number;
  stunting: number;
};

type ChartBarMultipleProps = {
  data?: ChartData[];
  isLoading?: boolean;
};

export function ChartBarMultiple({
  data = [],
  isLoading = false,
}: ChartBarMultipleProps) {
  // Use provided data or fallback to default data
  const chartData = data;

  const totalNormal = chartData.reduce((sum, item) => sum + item.normal, 0);
  const totalStunting = chartData.reduce((sum, item) => sum + item.stunting, 0);

  // Calculate dynamic Y-axis domain based on data
  const maxValue = Math.max(
    ...chartData.map((item) => Math.max(item.normal, item.stunting))
  );
  const yAxisMax = Math.max(10, Math.ceil(maxValue * 1.2)); // At least 10, or 20% above max value
  const yAxisStep = Math.ceil(yAxisMax / 5);
  const yAxisTicks = Array.from({ length: 6 }, (_, i) => i * yAxisStep);

  if (isLoading) {
    return (
      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Perkembangan</CardTitle>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-teal-500"></div>
                <span>Normal: -</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-400"></div>
                <span>Stunting: -</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-44 sm:h-96 w-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg font-medium">Memuat data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="shadow-md rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Perkembangan</CardTitle>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-teal-500"></div>
                <span>Normal: -</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-400"></div>
                <span>Stunting: -</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-44 sm:h-96 w-full">
            <div className="text-center">
              <p className="text-lg font-medium">Data belum ada</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Perkembangan</CardTitle>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-teal-500"></div>
              <span>Normal: {totalNormal.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-400"></div>
              <span>Stunting: {totalStunting.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-44 sm:h-96 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              domain={[0, yAxisMax]}
              ticks={yAxisTicks}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="normal" fill="var(--color-normal)" radius={4} />
            <Bar dataKey="stunting" fill="var(--color-stunting)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
