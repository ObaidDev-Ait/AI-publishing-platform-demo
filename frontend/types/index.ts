export type ArticleStatus = "approved" | "pending" | "rejected";

export interface Article {
  id: string;
  title: string;
  category: string;
  status: ArticleStatus;
  clicks: number;
  revenue: number;
  date: string;
  author?: string;
  excerpt: string;
  seoScore: number;
  content?: string;
  readability?: number;
  faqs?: { question: string; answer: string }[];
  keywords?: string[];
  language?: string;
  tone?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface PublisherStats {
  earnings: number;
  articles: number;
  clicks: number;
  approvalRate: number;
  revenueChange?: number;
  articlesChange?: number;
  clicksChange?: number;
  monthlyRevenue?: MonthlyMetric[];
}

export interface MonthlyMetric {
  month: string;
  revenue: number;
  clicks: number;
  articles: number;
  publishers?: number;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Payout {
  id: string;
  amount: number;
  status: string;
  method: string;
  date: string;
  reference: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  rank: string;
  role?: string;
  earnings: number;
  articles: number;
  avatarUrl?: string | null;
  bio?: string | null;
  website?: string | null;
  joinDate: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  articles: number;
  revenue: number;
}

export interface Language {
  id: string;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export interface LandingContent {
  features: { icon: string; title: string; description: string }[];
  testimonials: { name: string; role: string; avatar: string; quote: string; rating: number }[];
  pricingPlans: unknown[];
}
