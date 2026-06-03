import { NextResponse } from 'next/server';

const mockArticleEn = {
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

const mockArticleAr = {
  title: "١٠ أدوات ذكاء اصطناعي ثورية ستغير عملك",
  content: "الذكاء الاصطناعي لم يعد مجرد كلمة طنانة؛ بل هو تحول جذري في كيفية عمل الشركات...\n\n## ١. دعم العملاء الآلي\nتتعامل روبوتات الدردشة المدعومة بالذكاء الاصطناعي مع ما يصل إلى ٨٠٪ من الاستفسارات الروتينية...\n\n## ٢. التحليلات التنبؤية\nيمكن للشركات الآن التنبؤ باتجاهات السوق بدقة غير مسبوقة...",
  metaTitle: "١٠ أدوات ذكاء اصطناعي تحول الأعمال في ٢٠٢٦",
  metaDescription: "اكتشف أفضل ١٠ أدوات ثورية للذكاء الاصطناعي تغير مشهد الأعمال الحديثة، من التحليلات التنبؤية إلى دعم العملاء الآلي.",
  seoScore: 95,
  readability: 88,
  faqs: [
    { question: "ما مدى سرعة تنفيذ أدوات الذكاء الاصطناعي هذه؟", answer: "تقدم معظم أدوات الذكاء الاصطناعي الحديثة عمليات دمج جاهزة للاستخدام، مما يسمح للشركات برؤية النتائج في غضون أسابيع بدلاً من أشهر." },
    { question: "هل هذه الأدوات مناسبة للشركات الصغيرة؟", answer: "نعم، تقدم العديد من هذه المنصات نماذج تسعير قابلة للتطوير ومناسبة تمامًا للشركات الصغيرة والمتوسطة." }
  ]
};

export async function POST(req: Request) { 
  try {
    const body = await req.json();
    if (body.language === 'arabic') {
      return NextResponse.json({ success: true, article: mockArticleAr });
    }
  } catch (e) {
    // ignore
  }
  return NextResponse.json({ success: true, article: mockArticleEn }); 
}

export async function GET() { return NextResponse.json({ success: true, article: mockArticleEn }); }
export async function PUT() { return NextResponse.json({ success: true, article: mockArticleEn }); }
export async function DELETE() { return NextResponse.json({ success: true, article: mockArticleEn }); }
