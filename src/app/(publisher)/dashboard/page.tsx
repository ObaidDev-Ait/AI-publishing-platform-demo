"use client";

import { useState, useEffect } from "react";
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
import { statsService } from "@frontend/services/stats.service";
import type { PublisherStats } from "@frontend/types";
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
import { toast } from "sonner";

export default function DashboardPage() {
  const [stats, setStats] = useState<PublisherStats | null>(null);
  const [recentArticles, setRecentArticles] = useState<
    { id: string; title: string; category: string; status: string; date: string; clicks: number }[]
  >([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; revenue: number; clicks: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const statsData = await statsService.getPublisherStats();
        setStats(statsData);
        setMonthlyRevenue(statsData.monthlyRevenue ?? []);

        const { articlesService } = await import("@frontend/services/articles.service");
        const articlesData = await articlesService.list();
        setRecentArticles(articlesData);
      } catch {
        toast.error("Could not fetch dashboard statistics");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <Topbar title="Dashboard" subtitle="Loading your workspace..." />
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-5 space-y-3">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-40 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats?.earnings.toLocaleString()}`,
      change: 12.5,
      icon: DollarSign,
    },
    {
      title: "Articles Published",
      value: stats?.articles.toString(),
      change: 8.2,
      icon: FileText,
    },
    {
      title: "Total Clicks",
      value: stats?.clicks.toLocaleString(),
      change: 18.1,
      icon: MousePointerClick,
    },
    {
      title: "Approval Rate",
      value: `${stats?.approvalRate}%`,
      change: 0.4,
      icon: TrendingUp,
    },
  ];

  return (
    <>
      <Topbar title="Dashboard" subtitle="Welcome back! Here's your overview." />

      <div className="p-4 sm:p-6 space-y-6">
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
              {recentArticles.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">No articles generated yet.</p>
                  <Link href="/ai-generator" className="text-xs text-violet hover:underline mt-1 inline-block">
                    Create your first article now →
                  </Link>
                </div>
              ) : (
                recentArticles.slice(0, 5).map((article) => (
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
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
