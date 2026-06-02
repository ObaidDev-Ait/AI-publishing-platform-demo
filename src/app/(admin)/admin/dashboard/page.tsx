"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, FileText, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { adminStats, adminRevenueByMonth } from "@/lib/mock-data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const stats = [
  { title: "Total Revenue", value: `$${(adminStats.totalRevenue / 1000).toFixed(1)}K`, change: adminStats.revenueChange, icon: DollarSign, color: "text-green-500" },
  { title: "Active Publishers", value: adminStats.activePublishers.toString(), change: adminStats.publishersChange, icon: Users, color: "text-blue-500" },
  { title: "Total Articles", value: adminStats.totalArticles.toLocaleString(), change: adminStats.articlesChange, icon: FileText, color: "text-violet" },
  { title: "Pending Reviews", value: adminStats.pendingReviews.toString(), change: adminStats.reviewsChange, icon: Clock, color: "text-yellow-500" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <Topbar title="Admin Dashboard" subtitle="Platform overview and management" />

      <div className="p-6 space-y-6">
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
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adminRevenueByMonth}>
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
