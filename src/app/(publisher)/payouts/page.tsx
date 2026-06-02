"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, ArrowDownToLine, CreditCard, DollarSign } from "lucide-react";
import { payoutsService } from "@frontend/services/payouts.service";
import { profileService } from "@frontend/services/profile.service";
import type { Payout } from "@frontend/types";
import { toast } from "sonner";

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    Promise.all([payoutsService.list(), profileService.get()])
      .then(([payoutData, profile]) => {
        setPayouts(payoutData);
        setEarnings(profile.earnings);
      })
      .catch(() => toast.error("Failed to load payout data"));
  }, []);

  return (
    <>
      <Topbar title="Payouts" subtitle="Manage your earnings and withdrawals" />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Balance cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border/50 card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Available Balance</span>
                <Wallet className="h-5 w-5 text-violet" />
              </div>
              <p className="text-3xl font-bold font-heading">${earnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <Button
                className="mt-4 w-full gradient-bg text-white"
                onClick={() => toast.success("Withdrawal request submitted!")}
              >
                <ArrowDownToLine className="h-4 w-4 mr-2" /> Withdraw
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Pending Earnings</span>
                <DollarSign className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold font-heading">$1,650.00</p>
              <p className="text-xs text-muted-foreground mt-4">Processing period: 15 days</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Total Earned</span>
                <CreditCard className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold font-heading">${earnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-muted-foreground mt-4">Since August 2025</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment method */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-heading">Payment Method</CardTitle>
              <Button variant="outline" size="sm" onClick={() => toast.info("Payment settings opened")}>
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-muted/30">
              <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="text-sm font-medium">Bank Transfer - **** 4582</p>
                <p className="text-xs text-muted-foreground">Default payment method</p>
              </div>
              <Badge variant="secondary" className="ml-auto text-xs bg-green-500/10 text-green-600 dark:text-green-400">
                Verified
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Minimum payout threshold: $50.00 • Payouts processed on the 1st and 15th of each month
            </p>
          </CardContent>
        </Card>

        {/* Payout history */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Payout History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(Array.isArray(payouts) ? payouts : []).map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-mono text-sm">{payout.reference}</TableCell>
                      <TableCell className="text-sm">{payout.date}</TableCell>
                      <TableCell className="text-sm">{payout.method}</TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${
                            payout.status === "completed"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : payout.status === "processing"
                              ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          {payout.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-sm">
                        ${payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
