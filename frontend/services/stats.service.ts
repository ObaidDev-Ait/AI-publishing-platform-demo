import type { PublisherStats } from "@frontend/types";
import { apiFetch } from "./api-client";

export const statsService = {
  getPublisherStats() {
    return apiFetch<PublisherStats>("/api/stats");
  },

  getAdminStats() {
    return apiFetch<Record<string, unknown>>("/api/admin/stats");
  },
};
