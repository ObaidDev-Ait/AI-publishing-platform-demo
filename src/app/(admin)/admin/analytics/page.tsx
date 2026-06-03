"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { analyticsService } from "@frontend/services/analytics.service";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { toast } from "sonner";

export default function AdminAnalyticsPage() {
  const [adminRevenueByMonth, setAdminRevenueByMonth] = useState<{ month: string; revenue: number; publishers: number }[]>([]);
  const [contentCategories, setContentCategories] = useState<{ name: string; value: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoAdminRevenue = [
      { month: "Jan", revenue: 4500, publishers: 120 },
      { month: "Feb", revenue: 5200, publishers: 145 },
      { month: "Mar", revenue: 6800, publishers: 180 },
      { month: "Apr", revenue: 7400, publishers: 210 },
      { month: "May", revenue: 8900, publishers: 250 },
      { month: "Jun", revenue: 11200, publishers: 310 },
    ];

    const demoCategories = [
      { name: "Technology", value: 35, color: "hsl(262, 83%, 58%)" },
      { name: "Business", value: 25, color: "hsl(220, 83%, 58%)" },
      { name: "Health", value: 20, color: "hsl(160, 83%, 45%)" },
      { name: "Lifestyle", value: 15, color: "hsl(316, 73%, 52%)" },
      { name: "Other", value: 5, color: "hsl(24, 95%, 53%)" },
    ];

    analyticsService
      .getAdminAnalytics()
      .then((data) => {
        const rawRevenue = Array.isArray(data.adminRevenueByMonth) ? data.adminRevenueByMonth as typeof adminRevenueByMonth : [];
        const rawCategories = Array.isArray(data.contentCategories) ? data.contentCategories as typeof contentCategories : [];
        
        setAdminRevenueByMonth(rawRevenue.length > 0 ? rawRevenue : demoAdminRevenue);
        setContentCategories(rawCategories.length > 0 ? rawCategories : demoCategories);
      })
      })
      .catch(() => toast.error("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Topbar title="Platform Analytics" subtitle="Loading metrics..." />
        <div className="p-4 sm:p-6 space-y-6">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-[350px] bg-muted/50 rounded animate-pulse" />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/50 rounded animate-pulse" />
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/50 rounded-full mx-auto w-[300px] animate-pulse" />
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Platform Analytics" subtitle="Comprehensive platform metrics and insights" />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Multi-metric chart */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-heading">Revenue & Publisher Growth</CardTitle>
              <Badge variant="secondary" className="text-xs">Last 12 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={adminRevenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(262, 83%, 58%)" strokeWidth={2} dot={false} name="Revenue ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="publishers" stroke="hsl(220, 83%, 58%)" strokeWidth={2} dot={false} name="Publishers" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Publisher growth bar chart */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-heading">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={adminRevenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                        fontSize: "12px",
                      }}
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Content categories pie chart */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-heading">Content Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie
                      data={contentCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {contentCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                        fontSize: "12px",
                      }}
                      formatter={(value: any) => [`${value}%`, "Share"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
