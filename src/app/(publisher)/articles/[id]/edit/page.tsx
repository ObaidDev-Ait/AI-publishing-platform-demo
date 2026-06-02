"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { articlesService } from "@frontend/services/articles.service";
import type { Article } from "@frontend/types";
import { toast } from "sonner";
import { use } from "react";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articlesService
      .getById(id)
      .then(setArticle)
      .catch(() => toast.error("Failed to load article"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !article) {
    return (
      <>
        <Topbar title="Edit Article" subtitle="Loading..." />
        <div className="p-6 text-sm text-muted-foreground">Loading article...</div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Edit Article" subtitle={article.title} />

      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to articles
          </Link>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-initial" onClick={() => toast.info("Preview opened in new tab")}>
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
            <Button className="gradient-bg text-white flex-1 sm:flex-initial" onClick={() => toast.success("Article saved!")}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" defaultValue={article.title} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" rows={12} defaultValue={article.content ?? article.excerpt} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge>{article.status}</Badge>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue={article.category.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>SEO Score</Label>
                  <p className="text-2xl font-bold font-heading">{article.seoScore}/100</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
