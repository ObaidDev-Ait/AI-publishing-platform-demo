"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { landingService } from "@frontend/services/landing.service";
import { MOCK_PRICING_PLANS } from "@frontend/services/mock-data";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [pricingPlans, setPricingPlans] = useState<
    {
      name: string;
      price: { monthly: number; yearly: number };
      description: string;
      features: { text: string; included: boolean }[];
      cta: string;
      popular: boolean;
    }[]
  >([]);

  useEffect(() => {
    landingService.getContent().then((data) => {
      const rawPlans = Array.isArray(data?.pricingPlans) ? data.pricingPlans : [];
      setPricingPlans((rawPlans.length > 0 ? rawPlans : MOCK_PRICING_PLANS) as typeof pricingPlans);
    }).catch(() => {
      setPricingPlans(MOCK_PRICING_PLANS as typeof pricingPlans);
    });
  }, []);

  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/20 bg-violet/5 text-xs font-medium text-violet mb-4">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-4">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Choose the plan that fits your publishing needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${annual ? "bg-violet" : "bg-muted"}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${annual ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly
            <Badge variant="secondary" className="ml-2 bg-green-500/10 text-green-600 dark:text-green-400 text-xs">
              Save 20%
            </Badge>
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {(Array.isArray(pricingPlans) ? pricingPlans : []).map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border bg-card p-6 sm:p-8 card-hover ${
                plan.popular
                  ? "border-violet shadow-xl shadow-violet/10 scale-[1.02] md:scale-105"
                  : "border-border/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gradient-bg text-white border-0 shadow-lg">Most Popular</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-extrabold font-heading">
                  ${annual ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>

              <Link href="/register">
                <Button
                  className={`w-full font-semibold h-11 ${
                    plan.popular
                      ? "gradient-bg text-white shadow-lg shadow-violet/25 hover:shadow-violet/40"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>

              <div className="mt-6 pt-6 border-t border-border/50">
                <ul className="space-y-3">
                  {(Array.isArray(plan.features) ? plan.features : []).map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3 text-sm">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground/60"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
