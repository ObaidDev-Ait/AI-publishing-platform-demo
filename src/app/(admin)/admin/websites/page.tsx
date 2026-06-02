"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Plus, RefreshCw, ExternalLink, Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { adminService } from "@frontend/services/admin.service";
import { toast } from "sonner";

const statusIcons: Record<string, React.ReactNode> = {
  active: <Wifi className="h-4 w-4 text-green-500" />,
  inactive: <WifiOff className="h-4 w-4 text-muted-foreground" />,
  error: <AlertTriangle className="h-4 w-4 text-red-500" />,
};

export default function WebsitesPage() {
  const [wordPressSites, setWordPressSites] = useState<
    { id: string; name: string; url: string; status: string; articles: number; traffic: number; lastSync: string }[]
  >([]);

  useEffect(() => {
    adminService
      .getWordPressSites()
      .then((data) => setWordPressSites(Array.isArray(data) ? data : (data as any)?.data ?? []))
      .catch(() => toast.error("Failed to load WordPress sites"));
  }, []);

  return (
    <>
      <Topbar title="WordPress Websites" subtitle="Manage connected WordPress sites" />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Active Sites</p>
              <p className="text-3xl font-bold font-heading mt-1 text-green-500">
                {(Array.isArray(wordPressSites) ? wordPressSites : []).filter((s) => s.status === "active").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Total Articles</p>
              <p className="text-3xl font-bold font-heading mt-1">
                {(Array.isArray(wordPressSites) ? wordPressSites : []).reduce((sum, s) => sum + s.articles, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Total Traffic</p>
              <p className="text-3xl font-bold font-heading mt-1">
                {((Array.isArray(wordPressSites) ? wordPressSites : []).reduce((sum, s) => sum + s.traffic, 0) / 1000).toFixed(0)}K
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add new site button */}
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger
              render={
                <Button className="gradient-bg text-white" />
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Website
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">Add WordPress Website</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Website Name</Label>
                  <Input placeholder="My Blog" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label>WordPress URL</Label>
                  <Input placeholder="https://myblog.com" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input placeholder="wp_api_key_..." type="password" className="h-11" />
                </div>
              </div>
              <DialogFooter>
                <Button className="gradient-bg text-white" onClick={() => toast.success("Website added!")}>
                  Connect Website
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sites table */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Articles</TableHead>
                    <TableHead className="text-right">Traffic</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(Array.isArray(wordPressSites) ? wordPressSites : []).map((site) => (
                    <TableRow key={site.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{site.name}</p>
                            <p className="text-xs text-muted-foreground">{site.url}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {statusIcons[site.status]}
                          <Badge
                            className={`text-xs ${
                              site.status === "active"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : site.status === "error"
                                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {site.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm">{site.articles}</TableCell>
                      <TableCell className="text-right text-sm">{site.traffic.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{site.lastSync}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Syncing...")}>
                            <RefreshCw className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
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
