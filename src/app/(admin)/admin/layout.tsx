"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  DollarSign,
  Globe,
  BarChart3,
  ChevronLeft,
  LogOut,
  Shield,
  Menu,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: UserCheck, label: "Publishers", href: "/admin/publishers", badge: "3" },
  { icon: FileText, label: "Articles", href: "/admin/articles", badge: "12" },
  { icon: DollarSign, label: "Revenue", href: "/admin/revenue" },
  { icon: Globe, label: "Websites", href: "/admin/websites" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
];

function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Logo size="small" />
            <Badge className="bg-red-500/10 text-red-500 text-[10px] border-0">Admin</Badge>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <Shield className="h-5 w-5 text-red-500" />
          </div>
        )}
        {!collapsed && (
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 shrink-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator className="mx-4" />

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge className="gradient-bg text-white border-0 text-[10px] h-5 px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <Avatar className="h-9 w-9 border-2 border-red-500/20 shrink-0">
            <AvatarFallback className="bg-red-500 text-white text-xs font-semibold">JW</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">James Wilson</p>
              <p className="text-xs text-muted-foreground truncate">Administrator</p>
            </div>
          )}
          {!collapsed && (
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden h-9 w-9" />
          }
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[260px]">
          <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
          <AdminSidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <main className={`transition-all duration-300 ${collapsed ? "md:ml-[72px]" : "md:ml-[260px]"}`}>
        {children}
      </main>
    </div>
  );
}
