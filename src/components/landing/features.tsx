"use client";

import { useEffect, useState } from "react";
import { Sparkles, Search, BarChart3, Globe, Zap, Shield } from "lucide-react";
import { landingService } from "@frontend/services/landing.service";
import { MOCK_FEATURES } from "@frontend/services/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-6 w-6" />,
  Search: <Search className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
};

export function Features() {
  const [features, setFeatures] = useState<{ icon: string; title: string; description: string }[]>([]);

  useEffect(() => {
    landingService.getContent().then((data) => {
      const rawFeatures = Array.isArray(data?.features) ? data.features : [];
      setFeatures(rawFeatures.length > 0 ? rawFeatures : MOCK_FEATURES);
    }).catch(() => {
      setFeatures(MOCK_FEATURES);
    });
  }, []);

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Array.isArray(features) ? features : []).map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border/50 bg-card p-6 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-bg-subtle text-violet mb-4 group-hover:scale-110 transition-transform">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-lg font-semibold font-heading mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
