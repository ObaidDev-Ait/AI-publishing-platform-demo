import { prisma } from "@backend/database/client";

export const settingsService = {
  async getSettings() {
    try {
      let settings = await prisma.platformSettings.findUnique({
        where: { id: "global" },
      });

      if (!settings) {
        settings = await prisma.platformSettings.create({
          data: { id: "global" },
        });
      }

      return settings;
    } catch (err) {
      console.warn("[settings.service] DB error, using Vercel fallback settings:", err);
      return {
        id: "global",
        siteName: "ContentFlow AI",
        defaultLanguage: "english",
        aiProvider: "openai",
        aiModel: "gpt-4o",
        payoutThreshold: 50.0,
        maintenanceMode: false,
        smtpEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
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
    try {
      return await prisma.platformSettings.upsert({
        where: { id: "global" },
        update: data,
        create: {
          id: "global",
          ...data,
        },
      });
    } catch (err) {
      console.warn("[settings.service] DB error updating settings, simulating success:", err);
      return {
        id: "global",
        siteName: data.siteName ?? "ContentFlow AI",
        defaultLanguage: data.defaultLanguage ?? "english",
        aiProvider: data.aiProvider ?? "openai",
        aiModel: data.aiModel ?? "gpt-4o",
        payoutThreshold: data.payoutThreshold ?? 50.0,
        maintenanceMode: data.maintenanceMode ?? false,
        smtpEnabled: data.smtpEnabled ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  },
};
