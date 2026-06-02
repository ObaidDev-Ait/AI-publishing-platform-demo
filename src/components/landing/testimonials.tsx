"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { landingService } from "@frontend/services/landing.service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_TESTIMONIALS } from "@frontend/services/mock-data";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<
    { name: string; role: string; avatar: string; quote: string; rating: number }[]
  >([]);

  useEffect(() => {
    landingService.getContent().then((data) => {
      const rawTestimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];
      setTestimonials(rawTestimonials.length > 0 ? rawTestimonials : MOCK_TESTIMONIALS);
    }).catch(() => {
      setTestimonials(MOCK_TESTIMONIALS);
    });
  }, []);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/20 bg-violet/5 text-xs font-medium text-violet mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-4">
            Loved by <span className="gradient-text">publishers</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See what our community of publishers has to say about ContentFlow AI.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Array.isArray(testimonials) ? testimonials : []).map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative rounded-xl border border-border/50 bg-card p-6 card-hover"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-violet/20">
                  <AvatarFallback className="gradient-bg text-white text-xs font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
