import type { Notification } from "@frontend/types";
import { apiFetch } from "./api-client";

export const notificationsService = {
  list() {
    return apiFetch<Notification[]>("/api/notifications");
  },
};
