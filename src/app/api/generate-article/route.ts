import { NextResponse } from 'next/server';
import { aiGeneratorService } from '@backend/services/ai-generator.service';
import { requireAuth } from '@backend/middleware/auth.middleware';

const MOCK_CONTENT = {
  english: {
    title: "10 Revolutionary AI Tools That Will Transform Your Business in 2026",
    excerpt: "Discover the top revolutionary AI tools that are changing the landscape of modern business operations.",
    content: `Artificial Intelligence is no longer just a buzzword; it's a fundamental shift in how businesses operate.\n\n## 1. Automated Customer Support\nAI chatbots are handling up to 80% of routine queries...\n\n## 2. Predictive Analytics\nBusinesses can now predict market trends with unprecedented accuracy...`,
    faqs: [
      { question: "What is AI?", answer: "Artificial Intelligence refers to the simulation of human intelligence in machines." },
      { question: "How can AI help my business?", answer: "AI can automate repetitive tasks, provide insights, and improve customer service." }
    ],
    internalLinks: [
      { text: "Read our guide on Machine Learning", url: "/blog/machine-learning-guide" },
      { text: "Top 5 Automation Tools", url: "/blog/top-5-automation-tools" }
    ]
  },
  french: {
    title: "10 Outils d'IA Révolutionnaires qui Transformeront votre Entreprise en 2026",
    excerpt: "Découvrez les meilleurs outils d'IA révolutionnaires qui modifient le paysage des opérations commerciales modernes.",
    content: `L'intelligence artificielle n'est plus seulement un mot à la mode ; c'est un changement fondamental dans le fonctionnement des entreprises.\n\n## 1. Support Client Automatisé\nLes chatbots IA gèrent jusqu'à 80 % des requêtes de routine...\n\n## 2. Analyse Prédictive\nLes entreprises peuvent désormais prédire les tendances du marché avec une précision sans précédent...`,
    faqs: [
      { question: "Qu'est-ce que l'IA ?", answer: "L'intelligence artificielle désigne la simulation de l'intelligence humaine dans les machines." },
      { question: "Comment l'IA peut-elle aider mon entreprise ?", answer: "L'IA peut automatiser les tâches répétitives, fournir des analyses et améliorer le service client." }
    ],
    internalLinks: [
      { text: "Lisez notre guide sur l'Apprentissage Automatique", url: "/blog/machine-learning-guide" },
      { text: "Top 5 des outils d'automatisation", url: "/blog/top-5-automation-tools" }
    ]
  },
  arabic: {
    title: "١٠ أدوات ذكاء اصطناعي ثورية ستغير عملك في عام ٢٠٢٦",
    excerpt: "اكتشف أفضل أدوات الذكاء الاصطناعي الثورية التي تغير مشهد العمليات التجارية الحديثة.",
    content: `لم يعد الذكاء الاصطناعي مجرد كلمة طنانة؛ بل هو تحول جذري في كيفية عمل الشركات.\n\n## 1. دعم العملاء الآلي\nتتعامل روبوتات الدردشة المدعومة بالذكاء الاصطناعي مع ما يصل إلى 80% من الاستفسارات الروتينية...\n\n## 2. التحليلات التنبؤية\nيمكن للشركات الآن التنبؤ باتجاهات السوق بدقة غير مسبوقة...`,
    faqs: [
      { question: "ما هو الذكاء الاصطناعي؟", answer: "يشير الذكاء الاصطناعي إلى محاكاة الذكاء البشري في الآلات." },
      { question: "كيف يمكن للذكاء الاصطناعي مساعدة عملي؟", answer: "يمكن للذكاء الاصطناعي أتمتة المهام المتكررة، وتوفير التحليلات، وتحسين خدمة العملاء." }
    ],
    internalLinks: [
      { text: "اقرأ دليلنا حول التعلم الآلي", url: "/blog/machine-learning-guide" },
      { text: "أفضل ٥ أدوات للأتمتة", url: "/blog/top-5-automation-tools" }
    ]
  }
};

export async function POST(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const langKey = body.language?.toLowerCase() as keyof typeof MOCK_CONTENT;
    const contentData = MOCK_CONTENT[langKey] || MOCK_CONTENT.english;
    
    const article = await aiGeneratorService.saveGeneratedArticle({
      title: body.topic || contentData.title,
      content: contentData.content,
      excerpt: contentData.excerpt,
      category: body.category || "Technology",
      authorId: auth.userId,
      keywords: Array.isArray(body.keywords) ? JSON.stringify(body.keywords) : body.keywords,
      seoScore: 92,
      faqGenerated: body.generateFaq,
      internalLinks: body.suggestLinks,
    });

    return NextResponse.json({ 
      success: true, 
      article: { 
        ...article, 
        title: contentData.title, // Override db title for display
        metaTitle: contentData.title, 
        metaDescription: contentData.excerpt, 
        readability: 85, 
        faqs: body.generateFaq ? contentData.faqs : [],
        suggestedLinks: body.suggestLinks ? contentData.internalLinks : []
      } 
    });
  } catch (error) {
    console.error("AI GENERATOR ROUTE ERROR:", error);
    return NextResponse.json({ error: "Failed to generate article" }, { status: 500 });
  }
}
