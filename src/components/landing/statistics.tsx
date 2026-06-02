"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 2000, suffix: "+", label: "Active Publishers" },
  { value: 150, suffix: "K+", label: "Articles Generated" },
  { value: 2.8, suffix: "M+", label: "Revenue Paid ($)", decimals: 1 },
  { value: 45, suffix: "+", label: "Countries" },
];

function AnimatedCounter({ target, decimals = 0, suffix }: { target: number; decimals?: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading gradient-text">
      {count.toFixed(decimals)}{suffix}
    </div>
  );
}

export function Statistics() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet/5 via-chart-2/5 to-chart-3/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-4">
            Trusted by publishers{" "}
            <span className="gradient-text">worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground">Numbers that speak for themselves.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              <p className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
