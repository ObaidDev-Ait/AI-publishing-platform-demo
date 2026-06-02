"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, FileText, DollarSign, Settings, CheckCheck } from "lucide-react";
import { notificationsService } from "@frontend/services/notifications.service";
import type { Notification } from "@frontend/types";
import { toast } from "sonner";
import { MOCK_NOTIFICATIONS } from "@frontend/services/mock-data";

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
          {!notification.read && <span className="w-2 h-2 rounded-full bg-violet shrink-0" />}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationsService
      .list()
      .then((data) => {
        const rawItems = Array.isArray(data) ? data : (data as any)?.data ?? [];
        setItems(rawItems.length > 0 ? rawItems : MOCK_NOTIFICATIONS);
      })
      .catch(() => toast.error("Failed to load notifications"))
      .finally(() => setLoading(false));
  }, []);

  const unread = items.filter((n) => !n.read);
  const read = items.filter((n) => n.read);

  return (
    <>
      <Topbar title="Notifications" subtitle="Stay updated on your account activity" />
      <div className="p-4 sm:p-6">
        <Card className="border-border/50">
          <CardContent className="p-4 sm:p-6">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading notifications...</p>
            ) : (
              <Tabs defaultValue="all">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All ({items.length})</TabsTrigger>
                    <TabsTrigger value="unread">Unread ({unread.length})</TabsTrigger>
                  </TabsList>
                  <Button variant="outline" size="sm" onClick={() => toast.success("All marked as read")}>
                    <CheckCheck className="h-4 w-4 mr-1" /> Mark all read
                  </Button>
                </div>
                <TabsContent value="all" className="space-y-1">
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">No notifications yet</p>
                    </div>
                  ) : (
                    (Array.isArray(items) ? items : []).map((n) => <NotificationItem key={n.id} notification={n} />)
                  )}
                </TabsContent>
                <TabsContent value="unread" className="space-y-1">
                  {(Array.isArray(unread) ? unread : []).map((n) => (
                    <NotificationItem key={n.id} notification={n} />
                  ))}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
