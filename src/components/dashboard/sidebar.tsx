"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  BarChart3,
  Wallet,
  Bell,
  UserCircle,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Sparkles, label: "AI Generator", href: "/ai-generator" },
  { icon: FileText, label: "Articles", href: "/articles" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Wallet, label: "Payouts", href: "/payouts" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: UserCircle, label: "Profile", href: "/profile" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onItemClick?: () => void;
}

export function Sidebar({ collapsed, onToggle, onItemClick }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; avatarUrl: string | null } | null>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.name, avatarUrl: data.avatarUrl });
        }
      } catch (err) {
        console.error("Failed to load user info in Sidebar", err);
      }
    }
    getProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Signed out successfully");
        if (onItemClick) onItemClick();
        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      toast.error("An error occurred during sign out");
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo area */}
      <div className="flex items-center justify-between h-16 px-4">
        {!collapsed && <Logo size="small" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={`h-8 w-8 shrink-0 ${collapsed ? "mx-auto" : ""}`}
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <Separator className="mx-4" />

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`}
              title={collapsed ? item.label : undefined}
              onClick={onItemClick}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <Avatar className="h-9 w-9 border-2 border-violet/20 shrink-0">
            {user?.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            ) : (
              <AvatarFallback className="gradient-bg text-white text-xs font-semibold">
                {user?.name ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "SC"}
              </AvatarFallback>
            )}
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || "Sarah Chen"}</p>
              <p className="text-xs text-muted-foreground truncate">Publisher</p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
