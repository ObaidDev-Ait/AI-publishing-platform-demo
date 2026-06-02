"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Globe, BarChart3, Calendar } from "lucide-react";
import { publisherApplications } from "@/lib/mock-data";
import { toast } from "sonner";

export default function PublishersPage() {
  return (
    <>
      <Topbar title="Publisher Approval" subtitle="Review and approve publisher applications" />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Pending Applications</p>
              <p className="text-3xl font-bold font-heading mt-1 text-yellow-500">
                {publisherApplications.filter((a) => a.status === "pending").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Approved This Month</p>
              <p className="text-3xl font-bold font-heading mt-1 text-green-500">12</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Rejection Rate</p>
              <p className="text-3xl font-bold font-heading mt-1">8%</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {publisherApplications.map((app) => (
            <Card key={app.id} className="border-border/50 card-hover">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-muted text-sm font-semibold">
                        {app.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{app.name}</p>
                      <p className="text-sm text-muted-foreground">{app.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Globe className="h-4 w-4" /> {app.website}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="h-4 w-4" /> {app.monthlyTraffic} monthly
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" /> {app.appliedDate}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs">{app.niche}</Badge>
                    {app.status === "pending" ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => toast.success(`${app.name} approved!`)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/30 hover:bg-destructive/10"
                          onClick={() => toast.success(`${app.name} rejected`)}
                        >
                          <XCircle className="h-4 w-4 mr-1.5" /> Reject
                        </Button>
                      </>
                    ) : (
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs">
                        {app.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
