import { apiFetch } from "./api-client";

export const analyticsService = {
  getPublisherAnalytics() {
    return apiFetch<{
      monthlyRevenue: unknown[];
      weeklyTraffic: unknown[];
      trafficByCountry: unknown[];
      deviceBreakdown: unknown[];
    }>("/api/analytics");
  },

  getAdminAnalytics() {
    return apiFetch<{
      adminRevenueByMonth: unknown[];
      contentCategories: unknown[];
    }>("/api/admin/analytics");
  },
};
