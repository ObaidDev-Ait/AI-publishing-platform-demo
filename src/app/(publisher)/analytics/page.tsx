"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { analyticsService } from "@frontend/services/analytics.service";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { 
  MOCK_MONTHLY_REVENUE, 
  MOCK_WEEKLY_TRAFFIC, 
  MOCK_TRAFFIC_BY_COUNTRY 
} from "@frontend/services/mock-data";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7days");
  const [monthlyRevenue, setMonthlyRevenue] = useState<
    { month: string; revenue: number; clicks: number }[]
  >([]);
  const [weeklyTraffic, setWeeklyTraffic] = useState<
    { day: string; organic: number; direct: number; referral: number }[]
  >([]);
  const [trafficByCountry, setTrafficByCountry] = useState<
    { country: string; visitors: number; percentage: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService
      .getPublisherAnalytics()
      .then((data) => {
        const rawMonthly = Array.isArray(data.monthlyRevenue) ? data.monthlyRevenue as typeof monthlyRevenue : [];
        const rawWeekly = Array.isArray(data.weeklyTraffic) ? data.weeklyTraffic as typeof weeklyTraffic : [];
        const rawCountry = Array.isArray(data.trafficByCountry) ? data.trafficByCountry as typeof trafficByCountry : [];
        
        setMonthlyRevenue(rawMonthly.length > 0 ? rawMonthly : MOCK_MONTHLY_REVENUE);
        setWeeklyTraffic(rawWeekly.length > 0 ? rawWeekly : MOCK_WEEKLY_TRAFFIC);
        setTrafficByCountry(rawCountry.length > 0 ? rawCountry : MOCK_TRAFFIC_BY_COUNTRY);
      })
      .catch(() => toast.error("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Topbar title="Analytics" subtitle="Loading metrics..." />
        <div className="p-4 sm:p-6 space-y-6">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[350px] w-full" />
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Skeleton key={i} className="h-8 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Analytics" subtitle="Track your traffic and performance metrics" />

      <div className="p-4 sm:p-6 space-y-6">
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-heading">Traffic Overview</CardTitle>
              <Select value={dateRange} onValueChange={(val) => setDateRange(val || "7days")}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 3 months</SelectItem>
                  <SelectItem value="12months">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={weeklyTraffic}>
                  <defs>
                    <linearGradient id="organicGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="directGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(220, 83%, 58%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(220, 83%, 58%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="referralGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(160, 83%, 45%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(160, 83%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="organic" stroke="hsl(262, 83%, 58%)" fill="url(#organicGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="direct" stroke="hsl(220, 83%, 58%)" fill="url(#directGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="referral" stroke="hsl(160, 83%, 45%)" fill="url(#referralGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-heading">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-heading">Traffic by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficByCountry.map((item) => (
                  <div key={item.country}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.country}</span>
                      <span className="text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-bg"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
