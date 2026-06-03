import { prisma } from "@backend/database/client";

export const notificationsService = {
  async getUserNotifications(userId: string) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  },

  async markAsRead(id: string, userId: string) {
    return await prisma.notification.update({
      where: { id, userId },
      data: { read: true },
    });
  },

  async createNotification(data: { userId: string; title: string; message: string; type?: string }) {
    return await prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || "info",
      },
    });
  },

  async getUnreadCount(userId: string) {
    return await prisma.notification.count({
      where: { userId, read: false },
    });
  }
};
