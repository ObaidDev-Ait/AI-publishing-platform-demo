import type { Language } from "@frontend/types";
import { apiFetch } from "./api-client";

export const configService = {
  getLanguages() {
    return apiFetch<Language[]>("/api/config/languages");
  },
};
