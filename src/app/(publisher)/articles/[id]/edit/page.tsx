"use client";

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
import { articles } from "@/lib/mock-data";
import { toast } from "sonner";
import { use } from "react";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const article = articles.find((a) => a.id === id) || articles[0];

  return (
    <>
      <Topbar title="Edit Article" subtitle={article.title} />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to articles
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info("Preview opened in new tab")}>
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
            <Button className="gradient-bg text-white" onClick={() => toast.success("Article saved!")}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" defaultValue={article.title} className="h-11 text-lg font-medium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    rows={20}
                    defaultValue={article.excerpt + "\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n## Key Takeaways\n\n1. First important point about the topic\n2. Second important consideration\n3. Third valuable insight\n\n## Conclusion\n\nIn conclusion, this article has covered the essential aspects of the topic. Stay tuned for more insights and updates."}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge
                    className={`${
                      article.status === "approved"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : article.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {article.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue={article.category.toLowerCase()}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <Input defaultValue="AI, technology, tools" className="h-10" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Meta Title</Label>
                  <Input defaultValue={article.title} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea defaultValue={article.excerpt} rows={3} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">SEO Score</span>
                  <Badge className="gradient-bg text-white border-0">{article.seoScore}/100</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
