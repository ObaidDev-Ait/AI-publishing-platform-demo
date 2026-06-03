import { prisma } from "@backend/database/client";

export const contactService = {
  async submitMessage(data: { name: string; email: string; subject: string; message: string }) {
    return await prisma.contactMessage.create({
      data,
    });
  },

  async listMessages() {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
};
