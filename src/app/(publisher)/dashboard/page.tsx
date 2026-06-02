"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  FileText,
  MousePointerClick,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import { publisherStats, monthlyRevenue, articles } from "@/lib/mock-data";
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
} from "recharts";
import Link from "next/link";

const statCards = [
  {
    title: "Total Revenue",
    value: `$${publisherStats.totalRevenue.toLocaleString()}`,
    change: publisherStats.revenueChange,
    icon: DollarSign,
  },
  {
    title: "Total Articles",
    value: publisherStats.totalArticles.toString(),
    change: publisherStats.articlesChange,
    icon: FileText,
  },
  {
    title: "Total Clicks",
    value: `${(publisherStats.totalClicks / 1000).toFixed(1)}K`,
    change: publisherStats.clicksChange,
    icon: MousePointerClick,
  },
  {
    title: "Avg. CPC",
    value: `$${publisherStats.avgCPC.toFixed(2)}`,
    change: publisherStats.cpcChange,
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" subtitle="Welcome back, Sarah! Here's your overview." />

      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
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
                      <span
                        className={`text-xs font-medium ${stat.change > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {stat.change > 0 ? "+" : ""}
                        {stat.change}%
                      </span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-bg-subtle text-violet">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-heading">Revenue Overview</CardTitle>
                <Badge variant="secondary" className="text-xs">Last 12 months</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenue}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
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
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(262, 83%, 58%)"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Clicks chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-heading">Clicks & Traffic</CardTitle>
                <Badge variant="secondary" className="text-xs">Last 12 months</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                        fontSize: "12px",
                      }}
                      formatter={(value: any) => [Number(value).toLocaleString(), "Clicks"]}
                    />
                    <Bar dataKey="clicks" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent articles */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-heading">Recent Articles</CardTitle>
              <Link
                href="/articles"
                className="text-sm text-violet hover:underline inline-flex items-center gap-1"
              >
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium truncate">{article.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{article.category}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        article.status === "approved"
                          ? "default"
                          : article.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className={`text-xs ${
                        article.status === "approved"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20"
                          : article.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20"
                          : "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20"
                      }`}
                    >
                      {article.status}
                    </Badge>
                    {article.clicks > 0 && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {article.clicks.toLocaleString()} clicks
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
