import type { Payout } from "@frontend/types";
import { apiFetch } from "./api-client";

export const payoutsService = {
  list() {
    return apiFetch<Payout[]>("/api/payouts");
  },
};
