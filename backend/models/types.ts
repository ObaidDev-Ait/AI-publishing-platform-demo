export type ArticleStatus = "approved" | "pending" | "rejected";

export interface ArticleDto {
  id: string;
  title: string;
  content?: string;
  category: string;
  status: ArticleStatus;
  clicks: number;
  revenue: number;
  date: string;
  author?: string;
  excerpt: string;
  seoScore: number;
  readability?: number;
  faqs?: { question: string; answer: string }[];
  keywords?: string[];
  language?: string;
  tone?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  articles: number;
  revenue: number;
}

export interface NotificationDto {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface PayoutDto {
  id: string;
  amount: number;
  status: string;
  method: string;
  date: string;
  reference: string;
}
