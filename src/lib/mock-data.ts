// ============================================================
// Mock Data for AI Publishing & Monetization Platform
// ============================================================

// ── Revenue & Analytics ─────────────────────────────────────
export const monthlyRevenue = [
  { month: "Jan", revenue: 2400, clicks: 12400, articles: 8 },
  { month: "Feb", revenue: 3100, clicks: 15200, articles: 12 },
  { month: "Mar", revenue: 4200, clicks: 21800, articles: 15 },
  { month: "Apr", revenue: 3800, clicks: 19600, articles: 11 },
  { month: "May", revenue: 5100, clicks: 28400, articles: 18 },
  { month: "Jun", revenue: 6200, clicks: 34200, articles: 22 },
  { month: "Jul", revenue: 5800, clicks: 31600, articles: 19 },
  { month: "Aug", revenue: 7400, clicks: 42100, articles: 25 },
  { month: "Sep", revenue: 8100, clicks: 45800, articles: 28 },
  { month: "Oct", revenue: 7600, clicks: 41200, articles: 24 },
  { month: "Nov", revenue: 9200, clicks: 52400, articles: 32 },
  { month: "Dec", revenue: 10500, clicks: 58200, articles: 35 },
];

export const weeklyTraffic = [
  { day: "Mon", organic: 2400, direct: 1200, referral: 800 },
  { day: "Tue", organic: 2800, direct: 1400, referral: 900 },
  { day: "Wed", organic: 3200, direct: 1600, referral: 1100 },
  { day: "Thu", organic: 2900, direct: 1300, referral: 950 },
  { day: "Fri", organic: 3600, direct: 1800, referral: 1300 },
  { day: "Sat", organic: 2100, direct: 900, referral: 600 },
  { day: "Sun", organic: 1800, direct: 700, referral: 500 },
];

export const trafficByCountry = [
  { country: "United States", visitors: 45200, percentage: 32 },
  { country: "United Kingdom", visitors: 21400, percentage: 15 },
  { country: "Germany", visitors: 18600, percentage: 13 },
  { country: "France", visitors: 14200, percentage: 10 },
  { country: "Canada", visitors: 11800, percentage: 8 },
  { country: "India", visitors: 9400, percentage: 7 },
  { country: "Australia", visitors: 7200, percentage: 5 },
  { country: "Others", visitors: 14200, percentage: 10 },
];

export const deviceBreakdown = [
  { device: "Desktop", value: 58, color: "hsl(262, 83%, 58%)" },
  { device: "Mobile", value: 32, color: "hsl(220, 83%, 58%)" },
  { device: "Tablet", value: 10, color: "hsl(180, 83%, 45%)" },
];

// ── Publisher Stats ─────────────────────────────────────────
export const publisherStats = {
  totalRevenue: 73400,
  revenueChange: 12.5,
  totalArticles: 249,
  articlesChange: 8.2,
  totalClicks: 403200,
  clicksChange: 15.3,
  avgCPC: 0.18,
  cpcChange: -2.1,
};

// ── Articles ────────────────────────────────────────────────
export type ArticleStatus = "approved" | "pending" | "rejected";

export interface Article {
  id: string;
  title: string;
  category: string;
  status: ArticleStatus;
  clicks: number;
  revenue: number;
  date: string;
  author: string;
  excerpt: string;
  seoScore: number;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "10 Best AI Tools for Content Creation in 2026",
    category: "Technology",
    status: "approved",
    clicks: 8420,
    revenue: 1516,
    date: "2026-05-28",
    author: "Sarah Chen",
    excerpt: "Discover the most powerful AI tools that are revolutionizing content creation...",
    seoScore: 92,
  },
  {
    id: "2",
    title: "How to Start a Profitable Blog with AI Writing",
    category: "Business",
    status: "approved",
    clicks: 6210,
    revenue: 1118,
    date: "2026-05-25",
    author: "Marcus Johnson",
    excerpt: "Learn the step-by-step process of building a profitable blog using AI...",
    seoScore: 88,
  },
  {
    id: "3",
    title: "The Future of Remote Work: 2026 Trends",
    category: "Lifestyle",
    status: "pending",
    clicks: 0,
    revenue: 0,
    date: "2026-06-01",
    author: "Emily Rodriguez",
    excerpt: "Remote work continues to evolve. Here are the key trends shaping...",
    seoScore: 85,
  },
  {
    id: "4",
    title: "Complete Guide to SEO Optimization with AI",
    category: "Marketing",
    status: "approved",
    clicks: 12840,
    revenue: 2311,
    date: "2026-05-20",
    author: "David Kim",
    excerpt: "Master SEO optimization using artificial intelligence techniques...",
    seoScore: 95,
  },
  {
    id: "5",
    title: "Cryptocurrency Market Analysis: What to Expect",
    category: "Finance",
    status: "rejected",
    clicks: 0,
    revenue: 0,
    date: "2026-05-30",
    author: "Alex Thompson",
    excerpt: "A comprehensive analysis of cryptocurrency market trends and predictions...",
    seoScore: 62,
  },
  {
    id: "6",
    title: "Top 15 Healthy Recipes for Busy Professionals",
    category: "Health",
    status: "approved",
    clicks: 4320,
    revenue: 778,
    date: "2026-05-22",
    author: "Lisa Park",
    excerpt: "Quick and nutritious recipes designed for professionals on the go...",
    seoScore: 81,
  },
  {
    id: "7",
    title: "Machine Learning for Beginners: A Complete Guide",
    category: "Technology",
    status: "approved",
    clicks: 9680,
    revenue: 1742,
    date: "2026-05-18",
    author: "James Wilson",
    excerpt: "Start your machine learning journey with this comprehensive beginner guide...",
    seoScore: 90,
  },
  {
    id: "8",
    title: "Digital Marketing Strategies for Small Businesses",
    category: "Marketing",
    status: "pending",
    clicks: 0,
    revenue: 0,
    date: "2026-06-02",
    author: "Nina Patel",
    excerpt: "Effective digital marketing strategies tailored for small business owners...",
    seoScore: 87,
  },
  {
    id: "9",
    title: "Sustainable Fashion: The Complete 2026 Guide",
    category: "Lifestyle",
    status: "approved",
    clicks: 3150,
    revenue: 567,
    date: "2026-05-15",
    author: "Olivia Martinez",
    excerpt: "Explore the latest trends in sustainable and eco-friendly fashion...",
    seoScore: 79,
  },
  {
    id: "10",
    title: "How AI is Transforming Healthcare in 2026",
    category: "Technology",
    status: "approved",
    clicks: 7890,
    revenue: 1420,
    date: "2026-05-12",
    author: "Robert Chen",
    excerpt: "The healthcare industry is being revolutionized by artificial intelligence...",
    seoScore: 93,
  },
];

// ── Notifications ───────────────────────────────────────────
export interface Notification {
  id: string;
  type: "article" | "payment" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const notifications: Notification[] = [
  {
    id: "1",
    type: "article",
    title: "Article Approved",
    message: 'Your article "10 Best AI Tools for Content Creation" has been approved.',
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Processed",
    message: "Your payout of $2,450.00 has been sent to your bank account.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "New Feature Available",
    message: "Try our new AI-powered FAQ generator for your articles.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "article",
    title: "Article Rejected",
    message: 'Your article "Crypto Market Analysis" was rejected. Reason: Content quality.',
    time: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "payment",
    title: "Revenue Milestone",
    message: "Congratulations! You've earned over $10,000 this month.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "Scheduled Maintenance",
    message: "Platform maintenance scheduled for June 5th, 2:00 AM - 4:00 AM UTC.",
    time: "4 days ago",
    read: true,
  },
];

// ── Payouts ─────────────────────────────────────────────────
export interface Payout {
  id: string;
  amount: number;
  status: "completed" | "pending" | "processing";
  method: string;
  date: string;
  reference: string;
}

export const payouts: Payout[] = [
  { id: "1", amount: 2450.0, status: "completed", method: "Bank Transfer", date: "2026-05-30", reference: "PAY-2026-0530" },
  { id: "2", amount: 1890.0, status: "completed", method: "Bank Transfer", date: "2026-04-30", reference: "PAY-2026-0430" },
  { id: "3", amount: 3120.0, status: "completed", method: "PayPal", date: "2026-03-30", reference: "PAY-2026-0330" },
  { id: "4", amount: 2780.0, status: "processing", method: "Bank Transfer", date: "2026-06-01", reference: "PAY-2026-0601" },
  { id: "5", amount: 1560.0, status: "completed", method: "Bank Transfer", date: "2026-02-28", reference: "PAY-2026-0228" },
  { id: "6", amount: 2100.0, status: "completed", method: "PayPal", date: "2026-01-30", reference: "PAY-2026-0130" },
];

// ── Testimonials ────────────────────────────────────────────
export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Tech Blogger",
    avatar: "SC",
    quote: "ContentFlow AI has completely transformed my publishing workflow. I went from 3 articles per week to 15, and my revenue tripled in just two months.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Digital Publisher",
    avatar: "MJ",
    quote: "The AI content generator is incredible. The SEO optimization alone saved me hours of work. My articles now rank on the first page consistently.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Writer",
    avatar: "ER",
    quote: "I was skeptical about AI-generated content, but the quality is remarkable. The platform handles everything from writing to monetization seamlessly.",
    rating: 4,
  },
];

// ── Pricing ─────────────────────────────────────────────────
export const pricingPlans = [
  {
    name: "Starter",
    price: { monthly: 29, yearly: 24 },
    description: "Perfect for individual bloggers getting started.",
    features: [
      { text: "10 AI articles per month", included: true },
      { text: "Basic SEO optimization", included: true },
      { text: "1 website integration", included: true },
      { text: "Email support", included: true },
      { text: "Revenue analytics", included: false },
      { text: "Priority publishing", included: false },
      { text: "Custom branding", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: { monthly: 79, yearly: 66 },
    description: "For serious publishers who want to scale.",
    features: [
      { text: "50 AI articles per month", included: true },
      { text: "Advanced SEO optimization", included: true },
      { text: "5 website integrations", included: true },
      { text: "Priority support", included: true },
      { text: "Revenue analytics", included: true },
      { text: "Priority publishing", included: true },
      { text: "Custom branding", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 199, yearly: 166 },
    description: "For agencies and large-scale operations.",
    features: [
      { text: "Unlimited AI articles", included: true },
      { text: "Enterprise SEO suite", included: true },
      { text: "Unlimited websites", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority publishing", included: true },
      { text: "Custom branding & API", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

// ── Features ────────────────────────────────────────────────
export const features = [
  {
    icon: "Sparkles",
    title: "AI-Powered Writing",
    description: "Generate high-quality, SEO-optimized articles in seconds with our advanced AI engine powered by the latest language models.",
  },
  {
    icon: "Search",
    title: "Smart SEO Suite",
    description: "Automatic keyword optimization, meta tags, and content scoring to ensure every article ranks at the top of search results.",
  },
  {
    icon: "BarChart3",
    title: "Revenue Analytics",
    description: "Real-time dashboards tracking your earnings, clicks, and performance metrics with actionable insights.",
  },
  {
    icon: "Globe",
    title: "Multi-Language Support",
    description: "Create and publish content in 30+ languages to reach a global audience and maximize your monetization potential.",
  },
  {
    icon: "Zap",
    title: "Auto Publishing",
    description: "Seamlessly publish to WordPress and other platforms with one click. Schedule content for optimal engagement times.",
  },
  {
    icon: "Shield",
    title: "Fraud Protection",
    description: "Advanced click fraud detection and content verification systems to protect your revenue and maintain publisher integrity.",
  },
];

// ── Admin: Users ────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: "publisher" | "admin" | "viewer";
  status: "active" | "suspended" | "pending";
  joinDate: string;
  articles: number;
  revenue: number;
}

export const users: User[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", role: "publisher", status: "active", joinDate: "2025-08-15", articles: 48, revenue: 12400 },
  { id: "2", name: "Marcus Johnson", email: "marcus@example.com", role: "publisher", status: "active", joinDate: "2025-09-22", articles: 35, revenue: 8900 },
  { id: "3", name: "Emily Rodriguez", email: "emily@example.com", role: "publisher", status: "pending", joinDate: "2026-05-28", articles: 0, revenue: 0 },
  { id: "4", name: "David Kim", email: "david@example.com", role: "publisher", status: "active", joinDate: "2025-07-10", articles: 62, revenue: 18600 },
  { id: "5", name: "Alex Thompson", email: "alex@example.com", role: "publisher", status: "suspended", joinDate: "2025-11-03", articles: 12, revenue: 2100 },
  { id: "6", name: "Lisa Park", email: "lisa@example.com", role: "publisher", status: "active", joinDate: "2025-10-18", articles: 29, revenue: 7200 },
  { id: "7", name: "James Wilson", email: "james@example.com", role: "admin", status: "active", joinDate: "2025-06-01", articles: 0, revenue: 0 },
  { id: "8", name: "Nina Patel", email: "nina@example.com", role: "publisher", status: "active", joinDate: "2026-01-14", articles: 18, revenue: 4500 },
];

// ── Admin: Publisher Applications ───────────────────────────
export interface PublisherApplication {
  id: string;
  name: string;
  email: string;
  website: string;
  niche: string;
  monthlyTraffic: string;
  appliedDate: string;
  status: "pending" | "approved" | "rejected";
}

export const publisherApplications: PublisherApplication[] = [
  { id: "1", name: "Emily Rodriguez", email: "emily@example.com", website: "techwrite.blog", niche: "Technology", monthlyTraffic: "25,000", appliedDate: "2026-05-28", status: "pending" },
  { id: "2", name: "Tom Harris", email: "tom@example.com", website: "healthhub.com", niche: "Health & Wellness", monthlyTraffic: "42,000", appliedDate: "2026-05-27", status: "pending" },
  { id: "3", name: "Maria Garcia", email: "maria@example.com", website: "financefirst.io", niche: "Finance", monthlyTraffic: "18,000", appliedDate: "2026-05-26", status: "pending" },
  { id: "4", name: "Chris Lee", email: "chris@example.com", website: "travelmore.blog", niche: "Travel", monthlyTraffic: "31,000", appliedDate: "2026-05-25", status: "approved" },
];

// ── Admin: WordPress Sites ──────────────────────────────────
export interface WordPressSite {
  id: string;
  name: string;
  url: string;
  status: "active" | "inactive" | "error";
  articles: number;
  traffic: number;
  lastSync: string;
}

export const wordPressSites: WordPressSite[] = [
  { id: "1", name: "TechCrunch Daily", url: "techcrunchdaily.com", status: "active", articles: 342, traffic: 128400, lastSync: "2 min ago" },
  { id: "2", name: "Health & Wellness Hub", url: "healthwellnesshub.com", status: "active", articles: 218, traffic: 84200, lastSync: "5 min ago" },
  { id: "3", name: "Finance Insider", url: "financeinsider.io", status: "active", articles: 156, traffic: 62800, lastSync: "12 min ago" },
  { id: "4", name: "Lifestyle Blog Pro", url: "lifestyleblogpro.com", status: "inactive", articles: 89, traffic: 0, lastSync: "3 days ago" },
  { id: "5", name: "Marketing Digest", url: "marketingdigest.net", status: "error", articles: 124, traffic: 41200, lastSync: "Failed" },
];

// ── Admin: Revenue Summary ──────────────────────────────────
export const adminStats = {
  totalRevenue: 284600,
  revenueChange: 18.4,
  activePublishers: 142,
  publishersChange: 12.1,
  totalArticles: 3842,
  articlesChange: 22.5,
  pendingReviews: 28,
  reviewsChange: -5.2,
};

export const adminRevenueByMonth = [
  { month: "Jan", revenue: 18200, publishers: 98 },
  { month: "Feb", revenue: 21400, publishers: 105 },
  { month: "Mar", revenue: 24800, publishers: 112 },
  { month: "Apr", revenue: 22100, publishers: 118 },
  { month: "May", revenue: 28600, publishers: 126 },
  { month: "Jun", revenue: 32400, publishers: 134 },
  { month: "Jul", revenue: 29800, publishers: 128 },
  { month: "Aug", revenue: 35200, publishers: 136 },
  { month: "Sep", revenue: 38400, publishers: 140 },
  { month: "Oct", revenue: 34600, publishers: 138 },
  { month: "Nov", revenue: 41200, publishers: 142 },
  { month: "Dec", revenue: 45800, publishers: 148 },
];

export const contentCategories = [
  { name: "Technology", value: 35, color: "hsl(262, 83%, 58%)" },
  { name: "Business", value: 22, color: "hsl(220, 83%, 58%)" },
  { name: "Health", value: 18, color: "hsl(160, 83%, 45%)" },
  { name: "Lifestyle", value: 15, color: "hsl(340, 83%, 58%)" },
  { name: "Finance", value: 10, color: "hsl(40, 83%, 55%)" },
];

// ── Generated Article Sample ────────────────────────────────
export const generatedArticle = {
  title: "10 Revolutionary AI Tools That Will Transform Your Business in 2026",
  metaTitle: "10 Best AI Tools for Business 2026 | Complete Guide",
  metaDescription: "Discover the top 10 AI tools transforming businesses in 2026. From automation to analytics, learn how AI can boost your productivity and revenue.",
  content: `
## Introduction

Artificial intelligence is no longer a futuristic concept — it's the driving force behind today's most successful businesses. In 2026, the landscape of AI tools has evolved dramatically, offering unprecedented capabilities that were unimaginable just a few years ago.

Whether you're a solopreneur or leading a Fortune 500 company, these AI tools can streamline your operations, boost productivity, and unlock new revenue streams.

## 1. ContentFlow AI — Intelligent Content Generation

ContentFlow AI leads the pack with its advanced natural language processing capabilities. Unlike traditional content generators, it understands context, tone, and audience intent to produce articles that read as if written by industry experts.

**Key Features:**
- Multi-language content generation in 30+ languages
- Built-in SEO optimization with real-time scoring
- Automatic FAQ generation based on search intent
- Plagiarism detection and content originality verification

## 2. DataMind Analytics — Predictive Business Intelligence

DataMind Analytics transforms raw data into actionable insights using machine learning algorithms that adapt to your business patterns over time.

## 3. AutoScale Marketing — AI-Driven Campaign Management

Leverage artificial intelligence to create, optimize, and scale your marketing campaigns across multiple channels simultaneously.

## 4. SecureAI Shield — Intelligent Cybersecurity

Protect your digital assets with AI-powered threat detection that identifies and neutralizes security threats before they impact your business.

## 5. WorkflowGenie — Process Automation

Automate repetitive tasks and complex workflows with an AI assistant that learns from your business processes.

## Conclusion

The AI revolution is here, and businesses that adopt these tools early will gain a significant competitive advantage. Start exploring these solutions today and position your business for success in 2026 and beyond.
  `,
  seoScore: 92,
  readability: 88,
  keywords: ["AI tools", "business automation", "artificial intelligence", "productivity", "2026 trends"],
  faqs: [
    { question: "What are the best AI tools for businesses in 2026?", answer: "The top AI tools include ContentFlow AI for content generation, DataMind for analytics, AutoScale for marketing, SecureAI for cybersecurity, and WorkflowGenie for automation." },
    { question: "How much do AI tools cost for businesses?", answer: "AI tool pricing varies widely, from free tiers for basic features to enterprise plans starting at $199/month. Most offer free trials to test capabilities." },
    { question: "Can AI tools replace human workers?", answer: "AI tools are designed to augment human capabilities, not replace them. They handle repetitive tasks so professionals can focus on strategic, creative work." },
  ],
};
