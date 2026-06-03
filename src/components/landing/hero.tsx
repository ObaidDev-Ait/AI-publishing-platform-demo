"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const demoVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"; // External demo placeholder

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet/20 bg-violet/5 text-sm font-medium text-violet mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet" />
          </span>
          Now with GPT-5 & Claude 4 Integration
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.1] mb-6 animate-fade-in-up stagger-1">
          Create, Publish & <br className="hidden sm:block" />
          <span className="gradient-text">Monetize Content</span>
          <br className="hidden sm:block" />
          with AI
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 animate-fade-in-up stagger-2 leading-relaxed">
          The all-in-one platform that turns your ideas into revenue. Generate SEO-optimized articles, 
          publish to your websites, and earn from every click — all powered by artificial intelligence.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
          <Link href="/register">
            <Button
              size="lg"
              className="gradient-bg text-white font-semibold text-base px-8 h-12 shadow-lg shadow-violet/30 hover:shadow-violet/50 transition-all duration-300 hover:scale-105 group"
            >
              Start Publishing Free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="font-semibold text-base px-8 h-12 group cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Social proof */}
        <div className="mt-16 animate-fade-in-up stagger-4">
          <p className="text-sm text-muted-foreground mb-4">Trusted by 2,000+ publishers worldwide</p>
          <div className="flex items-center justify-center gap-8 opacity-40 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-500">
            {["TechCrunch", "Forbes", "Wired", "The Verge", "Mashable"].map((name) => (
              <span key={name} className="text-sm sm:text-base font-bold tracking-wider">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 relative animate-fade-in-up stagger-5 opacity-0" style={{ animationFillMode: "forwards" }}>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet/20 via-chart-2/20 to-chart-3/20 rounded-2xl blur-2xl" />
            <div className="relative rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-background/80 text-xs text-muted-foreground">
                    app.contentflow.ai/dashboard
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8 bg-gradient-to-br from-background to-muted/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Revenue", value: "$12,450", change: "+12.5%" },
                    { label: "Articles", value: "249", change: "+8.2%" },
                    { label: "Clicks", value: "403K", change: "+15.3%" },
                    { label: "Avg. CPC", value: "$0.18", change: "-2.1%" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg border border-border/50 bg-card p-4">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="h-32 sm:h-48 rounded-lg border border-border/50 bg-card flex items-end justify-between px-4 pb-4 gap-1">
                  {[40, 55, 70, 60, 80, 95, 85, 100, 90, 75, 110, 120].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm gradient-bg opacity-60 hover:opacity-100 transition-opacity"
                      style={{ height: `${h * 0.4}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Demo Video Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-3xl p-0 overflow-hidden border-border/50 bg-black">
            <DialogHeader className="sr-only">
              <DialogTitle>Demo Video</DialogTitle>
              <DialogDescription>Watch the demo video of AI Publishing Platform</DialogDescription>
            </DialogHeader>
            {isOpen && (
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/HK6y8DAPN_0?autoplay=1&rel=0"
                  title="Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
