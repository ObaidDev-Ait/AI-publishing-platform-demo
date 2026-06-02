import type { LandingContent } from "@frontend/types";
import { apiFetch } from "./api-client";

export const landingService = {
  getContent() {
    return apiFetch<LandingContent>("/api/landing");
  },
};
