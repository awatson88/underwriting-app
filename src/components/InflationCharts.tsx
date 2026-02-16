"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, Hammer, HardHat } from 'lucide-react';
import { materialCostData, laborCostData, getCombinedInflationData } from '@/lib/inflationData';

interface InflationChartsProps {
  policyYear: number;
}

export default function InflationCharts({ policyYear }: InflationChartsProps) {
  const combinedData = getCombinedInflationData();
  
  // Filter data from policy year onwards
  const filteredCombined = combinedData.filter((d) => d.year >= policyYear);
  
  // Get latest values for summary cards
  const latestData = combinedData[combinedData.length - 1];
  const baselineData = combinedData.find((d) => d.year === policyYear) || combinedData[0];
  
  const materialChange = ((latestData.materials - baselineData.materials) / baselineData.materials) * 100;
  const laborChange = ((latestData.labor - baselineData.labor) / baselineData.labor) * 100;
  const combinedChange = ((latestData.combined - baselineData.combined) / baselineData.combined) * 100;

  // Prepare material breakdown data
  const materialBreakdown = materialCostData.map((cat) => {
    const latest = cat.data.find((d) => d.year === 2025);
    const baseline = cat.data.find((d) => d.year === policyYear);
    return {
      name: cat.name.replace(' & ', '\n& '),
      shortName: cat.name.split(' ')[0],
      icon: cat.icon,
      change: baseline && latest ? ((latest.value - baseline.value) / baseline.value) * 100 : 0,
    };
  });

  // Prepare labor breakdown data
  const laborBreakdown = laborCostData.map((cat) => {
    const latest = cat.data.find((d) => d.year === 2025);
    const baseline = cat.data.find((d) => d.year === policyYear);
    return {
      name: cat.name,
      shortName: cat.name.split(' ')[0],
      icon: cat.icon,
      change: baseline && latest ? ((latest.value - baseline.value) / baseline.value) * 100 : 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-orange-700">
              <Hammer className="h-4 w-4" />
              Materials Inflation
            </CardDescription>
            <CardTitle className="text-3xl text-orange-900">
              +{materialChange.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-700">Since {policyYear}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-blue-700">
              <HardHat className="h-4 w-4" />
              Labor Cost Increase
            </CardDescription>
            <CardTitle className="text-3xl text-blue-900">
              +{laborChange.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">Since {policyYear}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-purple-700">
              <TrendingUp className="h-4 w-4" />
              Total Construction Costs
            </CardDescription>
            <CardTitle className="text-3xl text-purple-900">
              +{combinedChange.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700">Since {policyYear}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Chicago Metro Construction Cost Trends</CardTitle>
          <CardDescription>
            Bureau of Labor Statistics-style cost index data (Base Year {policyYear} = 100)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="combined">
            <TabsList className="mb-4">
              <TabsTrigger value="combined">Combined View</TabsTrigger>
              <TabsTrigger value="materials">Materials Detail</TabsTrigger>
              <TabsTrigger value="labor">Labor Detail</TabsTrigger>
            </TabsList>

            <TabsContent value="combined">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredCombined}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[95, 160]} tickFormatter={(v) => `${v}`} />
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(1)}`, '']}
                      labelFormatter={(label) => `Year: ${label}`}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="materials"
                      name="Materials Index"
                      stroke="#f97316"
                      fill="#fed7aa"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="labor"
                      name="Labor Index"
                      stroke="#3b82f6"
                      fill="#bfdbfe"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="combined"
                      name="Combined Index"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="materials">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={materialBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 70]} tickFormatter={(v) => `+${v}%`} />
                    <YAxis dataKey="shortName" type="category" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value: number) => [`+${value.toFixed(1)}%`, 'Change']}
                    />
                    <Bar
                      dataKey="change"
                      fill="#f97316"
                      radius={[0, 4, 4, 0]}
                      label={{ position: 'right', formatter: (v: number) => `+${v.toFixed(0)}%`, fontSize: 11 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {materialBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm bg-orange-50 p-2 rounded">
                    <span>{item.icon}</span>
                    <span className="truncate">{item.shortName}</span>
                    <span className="ml-auto font-semibold text-orange-700">+{item.change.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="labor">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={laborBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 70]} tickFormatter={(v) => `+${v}%`} />
                    <YAxis dataKey="shortName" type="category" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value: number) => [`+${value.toFixed(1)}%`, 'Change']}
                    />
                    <Bar
                      dataKey="change"
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                      label={{ position: 'right', formatter: (v: number) => `+${v.toFixed(0)}%`, fontSize: 11 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {laborBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm bg-blue-50 p-2 rounded">
                    <span>{item.icon}</span>
                    <span className="truncate">{item.shortName}</span>
                    <span className="ml-auto font-semibold text-blue-700">+{item.change.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Year over Year Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Year-over-Year Cost Changes</CardTitle>
          <CardDescription>Annual percentage changes in construction costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredCombined.slice(1)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, '']} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={(d) => ((d.materials - filteredCombined.find((f) => f.year === d.year - 1)?.materials!) / filteredCombined.find((f) => f.year === d.year - 1)?.materials!) * 100}
                  name="Materials YoY"
                  stroke="#f97316"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey={(d) => ((d.labor - filteredCombined.find((f) => f.year === d.year - 1)?.labor!) / filteredCombined.find((f) => f.year === d.year - 1)?.labor!) * 100}
                  name="Labor YoY"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
