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

const chartData = [
  { month: "January", normal: 8, stunting: 8 },
  { month: "February", normal: 5, stunting: 2 },
  { month: "March", normal: 3, stunting: 10 },
  { month: "April", normal: 7, stunting: 9 },
  { month: "May", normal: 2, stunting: 3 },
  { month: "June", normal: 4, stunting: 4 },
];
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

const totalNormal = chartData.reduce((sum, item) => sum + item.normal, 0);
const totalStunting = chartData.reduce((sum, item) => sum + item.stunting, 0);

export function ChartBarMultiple() {
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
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
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
