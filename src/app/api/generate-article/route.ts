import { NextResponse } from 'next/server';

const mockArticle = {
  title: "10 Revolutionary AI Tools That Will Transform Your Business",
  content: "Artificial Intelligence is no longer just a buzzword; it's a fundamental shift in how businesses operate...\n\n## 1. Automated Customer Support\nAI chatbots are handling up to 80% of routine queries...\n\n## 2. Predictive Analytics\nBusinesses can now predict market trends with unprecedented accuracy...",
  metaTitle: "10 AI Tools Transforming Business in 2026",
  metaDescription: "Discover the top 10 revolutionary AI tools that are changing the landscape of modern business, from predictive analytics to automated customer support.",
  seoScore: 92,
  readability: 85,
  faqs: [
    { question: "How fast can I implement these AI tools?", answer: "Most modern AI tools offer plug-and-play integrations, allowing businesses to see results within weeks rather than months." },
    { question: "Are these tools suitable for small businesses?", answer: "Yes, many of these platforms offer scalable pricing models perfectly suited for SMBs." }
  ]
};

export async function GET() { return NextResponse.json({ success: true, article: mockArticle }); }
export async function POST() { return NextResponse.json({ success: true, article: mockArticle }); }
export async function PUT() { return NextResponse.json({ success: true, article: mockArticle }); }
export async function DELETE() { return NextResponse.json({ success: true, article: mockArticle }); }
