"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { DollarSign, TrendingUp, Users, CreditCard } from "lucide-react";
import { adminService } from "@frontend/services/admin.service";
import type { AdminUser } from "@frontend/types";
import { toast } from "sonner";

export default function RevenuePage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    adminService.getRevenue().then(setUsers).catch(() => toast.error("Failed to load revenue data"));
  }, []);

  const totalRevenue = users.reduce((sum, u) => sum + u.revenue, 0);

  return (
    <>
      <Topbar title="Revenue Management" subtitle="Track and manage platform revenue" />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-500" },
            { title: "Platform Commission", value: "$42,690", icon: TrendingUp, color: "text-violet" },
            { title: "Publisher Payouts", value: "$241,910", icon: Users, color: "text-blue-500" },
            { title: "Pending Payouts", value: "$12,450", icon: CreditCard, color: "text-yellow-500" },
          ].map((stat) => (
            <Card key={stat.title} className="border-border/50 card-hover">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold font-heading mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Commission settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Commission Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border/50 bg-muted/30 text-center">
                <p className="text-2xl font-bold font-heading text-violet">15%</p>
                <p className="text-sm text-muted-foreground">Platform Commission</p>
              </div>
              <div className="p-4 rounded-lg border border-border/50 bg-muted/30 text-center">
                <p className="text-2xl font-bold font-heading">85%</p>
                <p className="text-sm text-muted-foreground">Publisher Share</p>
              </div>
              <div className="p-4 rounded-lg border border-border/50 bg-muted/30 text-center">
                <p className="text-2xl font-bold font-heading">$50</p>
                <p className="text-sm text-muted-foreground">Min. Payout</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by publisher */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Revenue by Publisher</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Publisher</TableHead>
                    <TableHead className="text-right">Articles</TableHead>
                    <TableHead className="text-right">Total Revenue</TableHead>
                    <TableHead className="text-right">Commission (15%)</TableHead>
                    <TableHead className="text-right">Publisher Earnings</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users
                    .filter((u) => u.role === "publisher" && u.revenue > 0)
                    .map((user) => {
                      const commission = Math.round(user.revenue * 0.15);
                      const earnings = user.revenue - commission;
                      return (
                        <TableRow key={user.id}>
                          <TableCell>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </TableCell>
                          <TableCell className="text-right text-sm">{user.articles}</TableCell>
                          <TableCell className="text-right text-sm font-medium">${user.revenue.toLocaleString()}</TableCell>
                          <TableCell className="text-right text-sm text-violet">${commission.toLocaleString()}</TableCell>
                          <TableCell className="text-right text-sm">${earnings.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs">Paid</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
