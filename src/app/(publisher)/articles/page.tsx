"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Pencil, Eye, Trash2 } from "lucide-react";
import { articlesService } from "@frontend/services/articles.service";
import type { Article } from "@frontend/types";
import { toast } from "sonner";

export default function ArticlesPage() {
  const [dbArticles, setDbArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchArticles = async () => {
    try {
      const query = new URLSearchParams({
        search,
        status: statusFilter,
        category: categoryFilter,
      });
      const res = await fetch(`/api/articles?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setDbArticles(data);
    } catch (err) {
      toast.error("Could not fetch articles from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [search, statusFilter, categoryFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await articlesService.delete(id);
      toast.success("Article deleted successfully");
      fetchArticles();
    } catch (err) {
      toast.error("Failed to delete article");
    }
  };


  return (
    <>
      <Topbar title="Articles" subtitle="Manage your published and draft articles" />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-9 h-10 w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val || "all")}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/ai-generator" className="w-full">
                <Button className="gradient-bg text-white h-10 w-full">
                  <Plus className="h-4 w-4 mr-2" /> New Article
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[300px]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="h-6 w-6 border-2 border-violet border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs text-muted-foreground">Loading articles...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : dbArticles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-sm text-muted-foreground">
                        No articles found matching filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    dbArticles.map((article) => (
                      <TableRow key={article.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{article.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[300px]">{article.excerpt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{article.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${
                              article.status === "approved"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : article.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm">{article.clicks.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-sm">${article.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{article.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/articles/${article.id}/edit`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(article.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {dbArticles.length} articles
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="gradient-bg text-white border-0">1</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </>
  );
}
