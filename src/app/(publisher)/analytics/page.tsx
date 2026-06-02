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

export default function AnalyticsPage() {
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
        <div className="p-6 text-muted-foreground text-sm">Loading analytics data...</div>
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
              <Badge variant="secondary" className="text-xs">Last 7 days</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
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
                <ResponsiveContainer width="100%" height="100%">
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
