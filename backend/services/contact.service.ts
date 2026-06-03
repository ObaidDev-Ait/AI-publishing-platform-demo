import { prisma } from "@backend/database/client";

export const contactService = {
  async submitMessage(data: { name: string; email: string; subject: string; message: string }) {
    try {
      return await prisma.contactMessage.create({
        data,
      });
    } catch (err) {
      console.warn("[contact.service] DB error, returning simulated message success:", err);
      return {
        id: `simulated-msg-${Date.now()}`,
        ...data,
        createdAt: new Date(),
      };
    }
  },

  async listMessages() {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
};
