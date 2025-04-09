"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { DollarSign, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Package } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDashboardData } from "@/actions/admin"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "./admin-layout"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week")

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", timeRange],
    queryFn: () => getDashboardData(timeRange),
  })

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Error loading dashboard data</h2>
            <p className="mt-2 text-gray-600">Please try again later</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500">Overview of your store performance and insights</p>
          </div>
          <div className="w-full md:w-auto">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hour">Last Hour</SelectItem>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Revenue Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-[100px]" />
              ) : (
                <>
                  <div className="text-2xl font-bold">${data?.revenue.total.toLocaleString()}</div>
                  <div className="flex items-center pt-1 text-xs text-muted-foreground">
                    {(data?.revenue?.trend ?? 0) > 0 ? (
                      <>
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-green-500">{data?.revenue?.trend ?? 0}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-red-500">{Math.abs(data?.revenue?.trend ?? 0)}%</span>
                      </>
                    )}
                    <span className="ml-1">from previous period</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Orders Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-[100px]" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{data?.orders.total.toLocaleString()}</div>
                  <div className="flex items-center pt-1 text-xs text-muted-foreground">
                    {(data?.orders?.trend ?? 0) > 0 ? (
                      <>
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-green-500">{data?.orders.trend}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-red-500">{Math.abs(data?.orders.trend || 0)}%</span>
                      </>
                    )}
                    <span className="ml-1">from previous period</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Customers Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-[100px]" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{data?.customers.total.toLocaleString()}</div>
                  <div className="flex items-center pt-1 text-xs text-muted-foreground">
                    {(data?.customers?.trend ?? 0) > 0 ? (
                      <>
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-green-500">{data?.customers.trend}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-red-500">{Math.abs(data?.customers.trend || 0)}%</span>
                      </>
                    )}
                    <span className="ml-1">from previous period</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Conversion Rate Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-[100px]" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{data?.conversionRate.rate.toFixed(2)}%</div>
                  <div className="flex items-center pt-1 text-xs text-muted-foreground">
                    {(data?.conversionRate?.trend ?? 0) > 0 ? (
                      <>
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-green-500">{data?.conversionRate.trend}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-red-500">{Math.abs(data?.conversionRate.trend || 0)}%</span>
                      </>
                    )}
                    <span className="ml-1">from previous period</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Skeleton className="h-full w-full" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data?.revenueOverTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`$${value}`, "Revenue"]}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Skeleton className="h-full w-full" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data?.salesByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {data?.salesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Breakdown</CardTitle>
                <CardDescription>Detailed view of sales performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.salesBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                      <Legend />
                      <Bar dataKey="online" name="Online Sales" fill="#8884d8" />
                      <Bar dataKey="inStore" name="In-Store Sales" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
                <CardDescription>Overview of orders by status</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data?.orderStatusDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="status"
                        label={({ status, percent }) => `${status}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {data?.orderStatusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}`, "Orders"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>New customer acquisition over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data?.customerGrowth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="newCustomers" name="New Customers" stroke="#8884d8" />
                      <Line type="monotone" dataKey="activeCustomers" name="Active Customers" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {data?.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">${order.total}</div>
                        <div
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling products</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {data?.topProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-md bg-gray-200"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">${product.price}</div>
                        <div className="text-sm text-muted-foreground">{product.sold} sold</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
