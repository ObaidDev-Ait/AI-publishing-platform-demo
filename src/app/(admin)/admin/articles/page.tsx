"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { articles } from "@/lib/mock-data";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminArticlesPage() {
  return (
    <>
      <Topbar title="Article Review" subtitle="Review and moderate submitted articles" />

      <div className="p-6 space-y-6">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-9 h-10" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {articles.filter((a) => a.status === "pending").length} pending review
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[300px]">Article</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>SEO Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <p className="text-sm font-medium">{article.title}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[300px]">{article.excerpt}</p>
                      </TableCell>
                      <TableCell className="text-sm">{article.author}</TableCell>
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
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full gradient-bg rounded-full"
                              style={{ width: `${article.seoScore}%` }}
                            />
                          </div>
                          <span className="text-xs">{article.seoScore}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{article.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/articles/${article.id}/review`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          {article.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-500 hover:text-green-600"
                                onClick={() => toast.success("Article approved!")}
                              >
                                <CheckCircle className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600"
                                onClick={() => toast.success("Article rejected")}
                              >
                                <XCircle className="h-3.5 w-3.5" />
                              </Button>
                            </>
                          )}
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
