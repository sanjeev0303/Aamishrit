"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, AreaChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, Line, Area, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Eye, ShoppingCart, Users, DollarSign } from "lucide-react";

import { type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const data = [
  { name: "Mon", visitors: 400, inquiries: 240, sales: 24 },
  { name: "Tue", visitors: 300, inquiries: 139, sales: 18 },
  { name: "Wed", visitors: 500, inquiries: 280, sales: 29 },
  { name: "Thu", visitors: 280, inquiries: 150, sales: 15 },
  { name: "Fri", visitors: 240, inquiries: 120, sales: 12 },
  { name: "Sat", visitors: 600, inquiries: 370, sales: 41 },
  { name: "Sun", visitors: 450, inquiries: 250, sales: 28 },
];

const productPerformance = [
  { name: "Product A", views: 400, inquiries: 240, sales: 24 },
  { name: "Product B", views: 300, inquiries: 139, sales: 18 },
  { name: "Product C", views: 500, inquiries: 280, sales: 29 },
  { name: "Product D", views: 280, inquiries: 150, sales: 15 },
  { name: "Product E", views: 240, inquiries: 120, sales: 12 },
];

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,770</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Product Inquiries
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,549</div>
          <p className="text-xs text-muted-foreground">
            +15.2% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">167</div>
          <p className="text-xs text-muted-foreground">
            +12.5% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,234</div>
          <p className="text-xs text-muted-foreground">
            +18.7% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>
            View your booth performance over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visitors">
            <TabsList className="mb-4">
              <TabsTrigger value="visitors">Visitors</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
            </TabsList>
            <TabsContent value="visitors">
              <div className="h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </TabsContent>
            <TabsContent value="inquiries">
              <div className="h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="inquiries"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </TabsContent>
            <TabsContent value="sales">
              <div className="h-[300px]">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="sales" fill="#ffc658" />
                  </BarChart>
                </ChartContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Your best performing products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <BarChart data={productPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill="#8884d8" name="Views" />
                <Bar dataKey="inquiries" fill="#82ca9d" name="Inquiries" />
                <Bar dataKey="sales" fill="#ffc658" name="Sales" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Visitor Demographics</CardTitle>
          <CardDescription>Breakdown of your booth visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={[
                  { name: "18-24", male: 50, female: 60 },
                  { name: "25-34", male: 80, female: 90 },
                  { name: "35-44", male: 70, female: 60 },
                  { name: "45-54", male: 40, female: 30 },
                  { name: "55+", male: 30, female: 20 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="male" fill="#8884d8" name="Male" />
                <Bar dataKey="female" fill="#82ca9d" name="Female" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
