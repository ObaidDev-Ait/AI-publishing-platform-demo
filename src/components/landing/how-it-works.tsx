"use client";

import { UserPlus, PenTool, Globe, DollarSign } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="h-6 w-6" />,
    title: "Sign Up",
    description: "Create your free account in seconds. No credit card required to get started.",
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Create Content",
    description: "Use our AI engine to generate high-quality, SEO-optimized articles in your niche.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Publish",
    description: "Publish directly to your WordPress sites or our network with one click.",
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Earn Revenue",
    description: "Monetize every click. Track your earnings in real-time and withdraw anytime.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/20 bg-violet/5 text-xs font-medium text-violet mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-4">
            From idea to income in{" "}
            <span className="gradient-text">4 simple steps</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our streamlined workflow makes it effortless to go from content creation to monetization.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line - desktop only */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-violet/30 via-chart-2/30 to-chart-3/30" />

          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg text-white shadow-lg shadow-violet/25">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-card border-2 border-violet text-xs font-bold text-violet">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-semibold font-heading mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
