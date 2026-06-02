import type { Article } from "@frontend/types";
import { apiFetch } from "./api-client";

export const articlesService = {
  list(params?: { search?: string; status?: string; category?: string }) {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);
    if (params?.category) query.set("category", params.category);
    return apiFetch<Article[]>(`/api/articles?${query.toString()}`);
  },

  getById(id: string) {
    return apiFetch<Article>(`/api/articles/${id}`);
  },

  delete(id: string) {
    return apiFetch<{ success: boolean }>(`/api/articles?id=${id}`, { method: "DELETE" });
  },

  adminList(params?: { search?: string; status?: string }) {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);
    return apiFetch<Article[]>(`/api/admin/articles?${query.toString()}`);
  },

  adminGetById(id: string) {
    return apiFetch<Article>(`/api/admin/articles/${id}`);
  },

  review(id: string, status: string) {
    return apiFetch<Article>(`/api/admin/articles/${id}/review`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
