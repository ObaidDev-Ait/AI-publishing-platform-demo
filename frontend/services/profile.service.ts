import type { UserProfile } from "@frontend/types";
import { apiFetch } from "./api-client";

export const profileService = {
  get() {
    return apiFetch<UserProfile>("/api/profile");
  },

  update(data: { name?: string; bio?: string; website?: string; avatarUrl?: string }) {
    return apiFetch<{ success: boolean; user: UserProfile }>("/api/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
