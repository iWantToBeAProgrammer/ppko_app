import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Child {
  id: string;
  first_name: string;
  last_name: string;
  gender: "MALE" | "FEMALE";
  dateOfBirth: string;
}

interface MeasurementHistory {
  id: string;
  measurement_date: string;
  age: string;
  gender: string;
  height: number;
  zScore: number;
  stuntingStatus: string;
}

interface ChartLineDotsProps {
  childData?: Child;
  measurementData?: MeasurementHistory[];
}

export function ChartLineDots({ childData, measurementData = [] }: ChartLineDotsProps) {
  // Process measurement data for the chart
  const processChartData = () => {
    if (!measurementData.length) return [];

    // Group measurements by month-year and calculate averages if multiple measurements in same month
    const monthlyData: { [key: string]: { heights: number[], zScores: number[], month: string, year: number, monthNum: number } } = {};

    measurementData.forEach(measurement => {
      const date = new Date(measurement.measurement_date);
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const monthNum = date.getMonth();
      const key = `${month} ${year}`;

      if (!monthlyData[key]) {
        monthlyData[key] = {
          heights: [],
          zScores: [],
          month: key,
          year: year,
          monthNum: monthNum
        };
      }

      monthlyData[key].heights.push(measurement.height);
      monthlyData[key].zScores.push(measurement.zScore);
    });

    // Convert to chart format and sort by date
    return Object.values(monthlyData)
      .map(data => ({
        month: data.month,
        height: Math.round((data.heights.reduce((a, b) => a + b, 0) / data.heights.length) * 100) / 100,
        zScore: Math.round((data.zScores.reduce((a, b) => a + b, 0) / data.zScores.length) * 100) / 100,
        measurements: data.heights.length,
        sortKey: data.year * 12 + data.monthNum
      }))
      .sort((a, b) => a.sortKey - b.sortKey);
  };

  const chartData = processChartData();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Bulan: ${label}`}</p>
          <p className="text-blue-600">
            <span className="font-medium">Tinggi:</span> {`${data.height} cm`}
          </p>
          <p className="text-purple-600">
            <span className="font-medium">Z-Score:</span> {`${data.zScore}`}
          </p>
          {data.measurements > 1 && (
            <p className="text-gray-500 text-sm">
              (Rata-rata dari {data.measurements} pengukuran)
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Determine line color based on z-scores
  const getLineColor = () => {
    if (!chartData.length) return "#3b82f6";
    
    const avgZScore = chartData.reduce((sum, item) => sum + item.zScore, 0) / chartData.length;
    
    if (avgZScore < -3) return "#dc2626"; // Red for severe stunting
    if (avgZScore < -2) return "#ea580c"; // Orange for moderate stunting  
    return "#16a34a"; // Green for normal
  };

  const lineColor = getLineColor();

  if (!childData) {
    return (
      <div className="w-full p-8 text-center text-gray-500">
        <p>Pilih anak untuk melihat grafik pertumbuhan</p>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="w-full p-8 text-center text-gray-500">
        <p>Belum ada data pengukuran untuk {childData.first_name} {childData.last_name}</p>
        <p className="text-sm mt-2">Lakukan pengukuran pertama untuk melihat grafik pertumbuhan</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">
          Grafik Pertumbuhan: {childData.first_name} {childData.last_name}
        </h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>Jenis Kelamin: {childData.gender === 'MALE' ? 'Laki-laki' : 'Perempuan'}</span>
          <span>Total Pengukuran: {measurementData.length}</span>
          <span>Periode: {chartData[0]?.month} - {chartData[chartData.length - 1]?.month}</span>
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#666"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              label={{ 
                value: 'Tinggi Badan (cm)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Line
              type="monotone"
              dataKey="height"
              stroke={lineColor}
              strokeWidth={3}
              dot={{ 
                fill: lineColor, 
                strokeWidth: 2, 
                stroke: '#fff',
                r: 6 
              }}
              activeDot={{ 
                r: 8, 
                fill: lineColor,
                stroke: '#fff',
                strokeWidth: 3
              }}
              name="Tinggi Badan (cm)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend for Z-Score colors */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Keterangan Warna Garis:</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-green-600"></div>
            <span>Normal (Z-Score ≥ -2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-orange-600"></div>
            <span>{"Stunting Sedang (-3 ≤ Z-Score < -2)"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-600"></div>
            <span>{"Stunting Berat (Z-Score < -3)"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}