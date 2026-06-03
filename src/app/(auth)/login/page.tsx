"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/shared/logo";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@contentflow.ai");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (loginEmail: string, loginPassword: string, label?: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      toast.success(`${label ? label + " " : ""}Login successful! Redirecting...`);

      // Role-based redirection
      const role = data.user?.role;
      const redirectUrl = role === "admin" ? "/admin/dashboard" : "/dashboard";

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    } catch (err) {
      toast.error((err as Error).message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <Logo />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-heading mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Enter your credentials to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-violet hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-border" defaultChecked />
              <Label htmlFor="remember" className="text-sm text-muted-foreground font-normal cursor-pointer">
                Remember me for 30 days
              </Label>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full h-11 gradient-bg text-white font-semibold shadow-lg shadow-violet/25"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>

          <div className="my-6 flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">quick demo access</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-11 border-red-500/30 text-red-500 hover:bg-red-500/5 hover:text-red-500"
              type="button"
              disabled={loading}
              onClick={() => handleLogin("admin@contentflow.ai", "admin123", "Admin")}
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin Demo
            </Button>
            <Button
              variant="outline"
              className="h-11 border-violet/30 text-violet hover:bg-violet/5 hover:text-violet"
              type="button"
              disabled={loading}
              onClick={() => handleLogin("publisher@contentflow.ai", "publisher123", "Publisher")}
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Publisher Demo
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-violet font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right panel - Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center text-white p-12 max-w-md">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Start publishing and earning today
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            Join 2,000+ publishers who are already using AI to create content and generate revenue.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "$2.8M+", label: "Revenue Paid" },
              { value: "150K+", label: "Articles Created" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
