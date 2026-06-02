"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Wand2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  Eye,
} from "lucide-react";
import { generatedArticle } from "@/lib/mock-data";
import { toast } from "sonner";

export default function AIGeneratorPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [keywords, setKeywords] = useState<string[]>(["AI tools", "business", "automation"]);
  const [keywordInput, setKeywordInput] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success("Article generated successfully!");
    }, 3000);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  return (
    <>
      <Topbar title="AI Content Generator" subtitle="Create SEO-optimized articles with AI" />

      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left panel: Input form */}
          <div className="xl:col-span-1 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-violet" />
                  Article Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., 10 Best AI Tools for Business"
                    className="h-11"
                    defaultValue="10 Revolutionary AI Tools That Will Transform Your Business in 2026"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select category" />
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
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add keyword..."
                      className="h-9"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    />
                    <Button variant="outline" size="sm" onClick={addKeyword} className="h-9 px-3">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {keywords.map((kw) => (
                      <Badge
                        key={kw}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                        onClick={() => removeKeyword(kw)}
                      >
                        {kw} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="english">
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full h-11 gradient-bg text-white font-semibold shadow-lg shadow-violet/25"
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4" />
                      Generate Article
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* SEO Score */}
            {generated && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-heading">SEO Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                        <circle
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke="hsl(262, 83%, 58%)"
                          strokeWidth="8"
                          strokeDasharray={`${generatedArticle.seoScore * 2.51} 251`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold font-heading">{generatedArticle.seoScore}</span>
                        <span className="text-xs text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Readability", value: generatedArticle.readability, color: "bg-green-500" },
                      { label: "Keyword Density", value: 78, color: "bg-yellow-500" },
                      { label: "Content Length", value: 95, color: "bg-green-500" },
                      { label: "Meta Tags", value: 90, color: "bg-green-500" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-1.5" />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Good title length (55 characters)
                    </p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Meta description optimized
                    </p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      Consider adding more internal links
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right panel: Generated content */}
          <div className="xl:col-span-2 space-y-6">
            {!generated && !generating ? (
              <Card className="border-border/50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center min-h-[500px] text-center">
                  <div className="w-20 h-20 rounded-2xl gradient-bg-subtle flex items-center justify-center mb-6">
                    <Sparkles className="h-10 w-10 text-violet" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading mb-2">Ready to create</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Configure your article settings on the left and click &quot;Generate Article&quot; to create
                    an AI-powered, SEO-optimized article.
                  </p>
                </CardContent>
              </Card>
            ) : generating ? (
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center justify-center min-h-[500px] text-center">
                  <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mb-6 animate-pulse-glow">
                    <Wand2 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading mb-2">Generating your article...</h3>
                  <p className="text-muted-foreground max-w-sm mb-6">
                    Our AI is crafting a high-quality, SEO-optimized article for you.
                  </p>
                  <div className="w-full max-w-xs">
                    <Progress value={66} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">Optimizing SEO...</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Article preview */}
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-heading">Article Preview</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toast.success("Copied to clipboard!")}>
                          <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toast.success("Article downloaded!")}>
                          <Download className="h-3.5 w-3.5 mr-1.5" /> Export
                        </Button>
                        <Button size="sm" className="gradient-bg text-white">
                          <Eye className="h-3.5 w-3.5 mr-1.5" /> Publish
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <article className="prose prose-sm dark:prose-invert max-w-none">
                      <h1 className="text-2xl font-bold font-heading mb-4">{generatedArticle.title}</h1>
                      <div className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed">
                        {generatedArticle.content}
                      </div>
                    </article>
                  </CardContent>
                </Card>

                {/* Meta fields */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base font-heading">Meta Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <Input defaultValue={generatedArticle.metaTitle} className="h-11" />
                      <p className="text-xs text-muted-foreground">
                        {generatedArticle.metaTitle.length}/60 characters
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Textarea
                        defaultValue={generatedArticle.metaDescription}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        {generatedArticle.metaDescription.length}/160 characters
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ section */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base font-heading">Generated FAQs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {generatedArticle.faqs.map((faq, index) => (
                      <div key={index} className="border border-border/50 rounded-lg">
                        <button
                          className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors rounded-lg"
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        >
                          <span className="text-sm font-medium">{faq.question}</span>
                          {expandedFaq === index ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                          )}
                        </button>
                        {expandedFaq === index && (
                          <div className="px-4 pb-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
