export const MOCK_PUBLISHER_STATS = {
  clicks: 48320,
  articles: 128,
  earnings: 12450,
  users: 0,
  revenue: 12450,
  approvalRate: 87,
};

export const MOCK_MONTHLY_REVENUE = [
  { month: "Jan", revenue: 1200, clicks: 3200, direct: 1200, organic: 1500, referral: 500 },
  { month: "Feb", revenue: 1800, clicks: 4100, direct: 1500, organic: 2000, referral: 600 },
  { month: "Mar", revenue: 2600, clicks: 5600, direct: 2100, organic: 2700, referral: 800 },
  { month: "Apr", revenue: 3400, clicks: 7200, direct: 2800, organic: 3400, referral: 1000 },
  { month: "May", revenue: 4200, clicks: 8300, direct: 3200, organic: 4000, referral: 1100 },
  { month: "Jun", revenue: 5100, clicks: 9500, direct: 3600, organic: 4600, referral: 1300 },
  { month: "Jul", revenue: 6300, clicks: 11000, direct: 4200, organic: 5200, referral: 1600 },
  { month: "Aug", revenue: 7200, clicks: 12400, direct: 4800, organic: 5800, referral: 1800 },
  { month: "Sep", revenue: 8500, clicks: 13800, direct: 5200, organic: 6500, referral: 2100 },
  { month: "Oct", revenue: 9700, clicks: 15500, direct: 5800, organic: 7200, referral: 2500 },
  { month: "Nov", revenue: 11000, clicks: 17300, direct: 6500, organic: 8000, referral: 2800 },
  { month: "Dec", revenue: 12450, clicks: 19200, direct: 7200, organic: 8800, referral: 3200 },
];

export const MOCK_RECENT_ARTICLES = [
  { id: "1", title: "10 Best AI Tools for 2026", category: "Technology", status: "approved", date: "Today", clicks: 3240 },
  { id: "2", title: "How to Build a SaaS Business", category: "Business", status: "pending", date: "Yesterday", clicks: 0 },
  { id: "3", title: "AI Content Marketing Strategy", category: "Marketing", status: "approved", date: "2 days ago", clicks: 2842 },
  { id: "4", title: "SEO in the AI Era", category: "Marketing", status: "approved", date: "3 days ago", clicks: 1950 },
  { id: "5", title: "ChatGPT vs Claude Comparison", category: "Technology", status: "approved", date: "4 days ago", clicks: 4520 },
  { id: "6", title: "Top Monetization Techniques", category: "Business", status: "approved", date: "5 days ago", clicks: 1830 },
  { id: "7", title: "Affiliate Marketing with AI", category: "Marketing", status: "approved", date: "1 week ago", clicks: 3100 },
  { id: "8", title: "Building Passive Income Websites", category: "Business", status: "approved", date: "1 week ago", clicks: 2750 },
  { id: "9", title: "Future of Content Automation", category: "Technology", status: "approved", date: "2 weeks ago", clicks: 1420 },
  { id: "10", title: "AI Productivity Hacks", category: "Lifestyle", status: "approved", date: "2 weeks ago", clicks: 2150 },
];

export const MOCK_TRAFFIC_BY_COUNTRY = [
  { country: "USA", visitors: 22500, percentage: 45 },
  { country: "UK", visitors: 12500, percentage: 25 },
  { country: "Canada", visitors: 7500, percentage: 15 },
  { country: "Australia", visitors: 5000, percentage: 10 },
  { country: "Other", visitors: 2500, percentage: 5 },
];

export const MOCK_WEEKLY_TRAFFIC = [
  { day: "Mon", organic: 2400, direct: 1800, referral: 800 },
  { day: "Tue", organic: 2800, direct: 2200, referral: 950 },
  { day: "Wed", organic: 3200, direct: 2500, referral: 1100 },
  { day: "Thu", organic: 3500, direct: 2800, referral: 1300 },
  { day: "Fri", organic: 4100, direct: 3200, referral: 1500 },
  { day: "Sat", organic: 5200, direct: 4500, referral: 2100 },
  { day: "Sun", organic: 4800, direct: 3800, referral: 1800 },
];

export const MOCK_NOTIFICATIONS = [
  { id: "1", title: "Article Approved", message: "Your article '10 Best AI Tools for 2026' has been approved and published.", time: "10 mins ago", read: false, type: "success" },
  { id: "2", title: "Payment Processed", message: "Your payout request of $450 has been processed successfully.", time: "2 hours ago", read: false, type: "success" },
  { id: "3", title: "New AI Article Generated", message: "Article 'Future of Machine Learning' is ready for review.", time: "5 hours ago", read: false, type: "info" },
  { id: "4", title: "Traffic Milestone", message: "Congratulations! Your traffic increased by 23% this week.", time: "1 day ago", read: true, type: "info" },
  { id: "5", title: "SEO Score Improved", message: "Your average SEO score improved to 92/100.", time: "2 days ago", read: true, type: "info" },
  { id: "6", title: "Profile Updated", message: "Your profile information was updated successfully.", time: "3 days ago", read: true, type: "success" },
  { id: "7", title: "Monetization Opportunity", message: "New premium ad placement available for top publishers.", time: "4 days ago", read: true, type: "warning" },
  { id: "8", title: "Welcome to ContentFlow", message: "We're excited to have you! Explore the AI generator.", time: "1 week ago", read: true, type: "info" },
];

export const MOCK_ARTICLES = [
  { id: "a1", title: "10 Best AI Tools for Business in 2026", excerpt: "Discover how AI is revolutionizing business operations...", category: "Technology", status: "published", clicks: 14200, revenue: 320.50, date: "2026-05-12" },
  { id: "a2", title: "The Future of Remote Work", excerpt: "How asynchronous communication is changing the modern workspace.", category: "Business", status: "published", clicks: 8400, revenue: 195.00, date: "2026-05-10" },
  { id: "a3", title: "Machine Learning for Beginners", excerpt: "A complete guide to understanding neural networks and basic AI concepts.", category: "Technology", status: "pending", clicks: 0, revenue: 0, date: "2026-05-28" },
  { id: "a4", title: "SEO Optimization Strategies", excerpt: "Top strategies to improve your search engine rankings using AI.", category: "Marketing", status: "published", clicks: 5300, revenue: 110.25, date: "2026-04-15" },
  { id: "a5", title: "Digital Nomad Lifestyle Tips", excerpt: "How to balance travel and work effectively across different time zones.", category: "Lifestyle", status: "draft", clicks: 0, revenue: 0, date: "2026-06-01" },
];

export const MOCK_TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    company: "Creator",
    avatar: "SJ",
    rating: 5,
    quote: "ContentFlow AI completely transformed how I publish content. The automation features are incredible and save me hours every single week.",
  },
  {
    name: "Michael Chen",
    role: "SaaS Founder",
    company: "SaaS",
    avatar: "MC",
    rating: 5,
    quote: "The best publishing platform I've ever used. The integrations are seamless, and the overall design is simply stunning.",
  },
  {
    name: "Emma Wilson",
    role: "Digital Publisher",
    company: "Publisher",
    avatar: "EW",
    rating: 5,
    quote: "I was skeptical at first, but ContentFlow AI is truly a game changer. My traffic has doubled since I started using it.",
  },
];

export const MOCK_PRICING_PLANS = [
  {
    name: "Starter",
    price: { monthly: 29, yearly: 24 },
    description: "Perfect for independent creators just getting started.",
    features: [
      { text: "Up to 50 AI articles per month", included: true },
      { text: "Basic SEO optimization", included: true },
      { text: "Standard analytics", included: true },
      { text: "1 user seat", included: true },
      { text: "Priority support", included: false },
      { text: "Custom domain", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 99, yearly: 79 },
    description: "Everything you need to scale your publishing business.",
    features: [
      { text: "Unlimited AI articles", included: true },
      { text: "Advanced SEO & Keywords", included: true },
      { text: "Advanced analytics & reporting", included: true },
      { text: "Up to 5 user seats", included: true },
      { text: "Priority support", included: true },
      { text: "Custom domain", included: false },
    ],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 299, yearly: 239 },
    description: "Advanced features for large teams and agencies.",
    features: [
      { text: "Unlimited AI articles", included: true },
      { text: "Advanced SEO & Keywords", included: true },
      { text: "Advanced analytics & reporting", included: true },
      { text: "Unlimited user seats", included: true },
      { text: "24/7 Phone support", included: true },
      { text: "Custom domain & White-label", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const MOCK_FEATURES = [
  {
    icon: "Sparkles",
    title: "AI Content Generator",
    description: "Generate high-quality articles using AI.",
  },
  {
    icon: "Search",
    title: "SEO Optimization",
    description: "Improve rankings with built-in SEO tools.",
  },
  {
    icon: "BarChart3",
    title: "Analytics Dashboard",
    description: "Track clicks, traffic and revenue.",
  },
  {
    icon: "Globe",
    title: "Multi-Language Support",
    description: "Generate content in 30+ languages.",
  },
  {
    icon: "Shield",
    title: "Publisher Management",
    description: "Manage users and publishers.",
  },
  {
    icon: "Zap",
    title: "Monetization Tools",
    description: "Increase revenue with smart monetization.",
  },
];
