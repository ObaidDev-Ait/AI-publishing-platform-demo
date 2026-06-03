"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, FileText, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { statsService } from "@frontend/services/stats.service";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const [adminStats, setAdminStats] = useState<Record<string, number>>({});
  const [adminRevenueByMonth, setAdminRevenueByMonth] = useState<{ month: string; revenue: number; publishers: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsService
      .getAdminStats()
      .then((data) => {
        setAdminStats(data as Record<string, number>);
        setAdminRevenueByMonth((data.adminRevenueByMonth as typeof adminRevenueByMonth) ?? []);
      })
      .catch(() => toast.error("Failed to load admin dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { title: "Total Revenue", value: `$${((adminStats.totalRevenue ?? 0) / 1000).toFixed(1)}K`, change: adminStats.revenueChange ?? 0, icon: DollarSign, color: "text-green-500" },
    { title: "Active Publishers", value: (adminStats.activePublishers ?? 0).toString(), change: adminStats.publishersChange ?? 0, icon: Users, color: "text-blue-500" },
    { title: "Total Articles", value: (adminStats.totalArticles ?? 0).toLocaleString(), change: adminStats.articlesChange ?? 0, icon: FileText, color: "text-violet" },
    { title: "Pending Reviews", value: (adminStats.pendingReviews ?? 0).toString(), change: adminStats.reviewsChange ?? 0, icon: Clock, color: "text-yellow-500" },
  ];

  if (loading) {
    return (
      <>
        <Topbar title="Admin Dashboard" subtitle="Loading..." />
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-border/50">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[350px] w-full" />
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Admin Dashboard" subtitle="Platform overview and management" />

      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="card-hover border-border/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold font-heading mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.change > 0 ? (
                        <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                      )}
                      <span className={`text-xs font-medium ${stat.change > 0 ? "text-green-500" : "text-red-500"}`}>
                        {stat.change > 0 ? "+" : ""}{stat.change}%
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue chart */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-heading">Platform Revenue</CardTitle>
              <Badge variant="secondary" className="text-xs">Last 12 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={Array.isArray(adminRevenueByMonth) ? adminRevenueByMonth : []}>
                  <defs>
                    <linearGradient id="adminRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area type="monotone" dataKey="revenue" stroke="hsl(262, 83%, 58%)" strokeWidth={2} fill="url(#adminRevenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New publisher application", user: "Emily Rodriguez", time: "2 hours ago", type: "info" },
                { action: "Article approved", user: "Sarah Chen", time: "3 hours ago", type: "success" },
                { action: "Payout processed", user: "Marcus Johnson - $2,450", time: "5 hours ago", type: "success" },
                { action: "Article rejected", user: "Alex Thompson", time: "6 hours ago", type: "warning" },
                { action: "New publisher approved", user: "Chris Lee", time: "1 day ago", type: "success" },
                { action: "Website sync error", user: "marketingdigest.net", time: "1 day ago", type: "error" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      activity.type === "success" ? "bg-green-500" :
                      activity.type === "warning" ? "bg-yellow-500" :
                      activity.type === "error" ? "bg-red-500" : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.action}: <span className="font-medium">{activity.user}</span></p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
