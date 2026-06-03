import { prisma } from "@backend/database/client";

export const notificationsService = {
  async getUserNotifications(userId: string) {
    try {
      return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
    } catch (err) {
      console.warn("[notifications.service] DB error, using Vercel mock notifications:", err);
      return [
        {
          id: "demo-notif-1",
          userId,
          title: "Welcome to ContentFlow AI",
          message: "Start by generating a new article using our advanced AI editor.",
          type: "info",
          read: false,
          createdAt: new Date(),
        }
      ];
    }
  },

  async markAsRead(id: string, userId: string) {
    try {
      return await prisma.notification.update({
        where: { id, userId },
        data: { read: true },
      });
    } catch (err) {
      console.warn("[notifications.service] DB error, simulating markAsRead:", err);
      return {
        id,
        userId,
        title: "Mock Notification",
        message: "Mock Message",
        type: "info",
        read: true,
        createdAt: new Date(),
      };
    }
  },

  async createNotification(data: { userId: string; title: string; message: string; type?: string }) {
    try {
      return await prisma.notification.create({
        data: {
          userId: data.userId,
          title: data.title,
          message: data.message,
          type: data.type || "info",
        },
      });
    } catch (err) {
      console.warn("[notifications.service] DB error, simulating createNotification:", err);
      return {
        id: `mock-notif-${Date.now()}`,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || "info",
        read: false,
        createdAt: new Date(),
      };
    }
  },

  async getUnreadCount(userId: string) {
    try {
      return await prisma.notification.count({
        where: { userId, read: false },
      });
    } catch (err) {
      console.warn("[notifications.service] DB error, simulating getUnreadCount:", err);
      return 1;
    }
  }
};
