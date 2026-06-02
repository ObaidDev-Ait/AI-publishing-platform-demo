import { apiFetch } from "./api-client";

export const authService = {
  login(email: string, password: string) {
    return apiFetch<{ success: boolean; user: { id: string; name: string; email: string; role: string } }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) }
    );
  },

  register(name: string, email: string, password: string) {
    return apiFetch<{ success: boolean; user: { id: string; name: string; email: string } }>(
      "/api/auth/register",
      { method: "POST", body: JSON.stringify({ name, email, password }) }
    );
  },

  logout() {
    return apiFetch<{ success: boolean }>("/api/auth/logout", { method: "POST" });
  },
};
