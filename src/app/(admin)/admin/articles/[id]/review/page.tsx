"use client";

import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, CheckCircle, XCircle, Shield, FileText } from "lucide-react";
import Link from "next/link";
import { articles, generatedArticle } from "@/lib/mock-data";
import { toast } from "sonner";
import { use } from "react";

export default function ArticleReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const article = articles.find((a) => a.id === id) || articles[0];

  return (
    <>
      <Topbar title="Article Review" subtitle={article.title} />

      <div className="p-6 space-y-6">
        <Link href="/admin/articles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to articles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article content */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-heading">{article.title}</CardTitle>
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
              </CardHeader>
              <CardContent>
                <article className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {generatedArticle.content}
                  </div>
                </article>
              </CardContent>
            </Card>
          </div>

          {/* Review sidebar */}
          <div className="space-y-6">
            {/* Publisher info */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">Publisher Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-muted text-sm">
                      {article.author.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{article.author}</p>
                    <p className="text-xs text-muted-foreground">Publisher</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{article.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted</span>
                    <span className="font-medium">{article.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality checks */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">Quality Checks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">SEO Score</span>
                    <span className="font-medium">{article.seoScore}/100</span>
                  </div>
                  <Progress value={article.seoScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Readability</span>
                    <span className="font-medium">88/100</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    Plagiarism check: <span className="font-medium text-green-500">Passed</span>
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-500" />
                    Content policy: <span className="font-medium text-green-500">Compliant</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Review actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">Review Decision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Feedback (optional)</Label>
                  <Textarea placeholder="Provide feedback to the publisher..." rows={4} />
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => toast.success("Article approved!")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={() => toast.success("Article rejected")}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
