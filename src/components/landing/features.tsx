"use client";

import { Sparkles, Search, BarChart3, Globe, Zap, Shield } from "lucide-react";
import { features } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-6 w-6" />,
  Search: <Search className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
};

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/20 bg-violet/5 text-xs font-medium text-violet mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-4">
            Everything you need to{" "}
            <span className="gradient-text">publish & earn</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From AI-powered content creation to revenue analytics, our platform gives you all the tools
            to build a profitable publishing business.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border/50 bg-card p-6 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-bg-subtle text-violet mb-4 group-hover:scale-110 transition-transform duration-300">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-lg font-semibold font-heading mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Hover gradient border effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet/10 via-transparent to-chart-2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
