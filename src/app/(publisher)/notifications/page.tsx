"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, FileText, DollarSign, Settings, CheckCheck } from "lucide-react";
import { notifications, type Notification } from "@/lib/mock-data";
import { toast } from "sonner";

const iconMap: Record<string, React.ReactNode> = {
  article: <FileText className="h-5 w-5 text-blue-500" />,
  payment: <DollarSign className="h-5 w-5 text-green-500" />,
  system: <Settings className="h-5 w-5 text-violet" />,
};

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-muted/50 ${
        !notification.read ? "bg-violet/5 border-l-2 border-violet" : ""
      }`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted shrink-0">
        {iconMap[notification.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{notification.title}</p>
          {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-violet shrink-0" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <>
      <Topbar title="Notifications" subtitle={`You have ${unreadCount} unread notifications`} />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-violet" />
            <Badge variant="secondary" className="text-xs">{unreadCount} new</Badge>
          </div>
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4 mr-2" /> Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {["all", "article", "payment", "system"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card className="border-border/50">
                <CardContent className="p-2">
                  <div className="space-y-1">
                    {notifs
                      .filter((n) => tab === "all" || n.type === tab)
                      .map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
