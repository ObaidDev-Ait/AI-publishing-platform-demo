"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { monthlyRevenue, weeklyTraffic, trafficByCountry } from "@/lib/mock-data";
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

export default function AnalyticsPage() {
  return (
    <>
      <Topbar title="Analytics" subtitle="Track your traffic and performance metrics" />

      <div className="p-6 space-y-6">
        {/* Traffic overview */}
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
          {/* Top articles */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-heading">Top Performing Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-sm font-semibold">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Article about {item.month} trends</p>
                      <p className="text-xs text-muted-foreground">{item.clicks.toLocaleString()} clicks</p>
                    </div>
                    <span className="text-sm font-semibold text-green-500">${item.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic distribution */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-heading">Traffic by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficByCountry} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="country" type="category" tick={{ fontSize: 11 }} width={100} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                        fontSize: "12px",
                      }}
                      formatter={(value: any) => [Number(value).toLocaleString(), "Visitors"]}
                    />
                    <Bar dataKey="visitors" fill="hsl(262, 83%, 58%)" radius={[0, 4, 4, 0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device breakdown */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { device: "Desktop", value: 58, icon: "🖥️" },
                { device: "Mobile", value: 32, icon: "📱" },
                { device: "Tablet", value: 10, icon: "📟" },
              ].map((item) => (
                <div key={item.device} className="p-4 rounded-xl border border-border/50 bg-card text-center">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-2xl font-bold font-heading mt-2">{item.value}%</p>
                  <p className="text-sm text-muted-foreground">{item.device}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
