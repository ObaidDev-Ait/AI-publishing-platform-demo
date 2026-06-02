import type { AdminUser } from "@frontend/types";
import { apiFetch } from "./api-client";

export const adminService = {
  getUsers() {
    return apiFetch<AdminUser[]>("/api/admin/users");
  },

  getPublishers() {
    return apiFetch<unknown[]>("/api/admin/publishers");
  },

  getWordPressSites() {
    return apiFetch<unknown[]>("/api/admin/websites");
  },

  getRevenue() {
    return apiFetch<AdminUser[]>("/api/admin/revenue");
  },
};
