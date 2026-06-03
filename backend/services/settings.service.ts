import { prisma } from "@backend/database/client";

export const settingsService = {
  async getSettings() {
    let settings = await prisma.platformSettings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      settings = await prisma.platformSettings.create({
        data: { id: "global" },
      });
    }

    return settings;
  },

  async updateSettings(data: {
    siteName?: string;
    defaultLanguage?: string;
    aiProvider?: string;
    aiModel?: string;
    payoutThreshold?: number;
    maintenanceMode?: boolean;
    smtpEnabled?: boolean;
  }) {
    return await prisma.platformSettings.upsert({
      where: { id: "global" },
      update: data,
      create: {
        id: "global",
        ...data,
      },
    });
  },
};
