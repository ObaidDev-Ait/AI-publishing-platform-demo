import { NextResponse } from 'next/server';

const languages = [
  { id: "english", label: "English", nativeLabel: "English", flag: "🇺🇸", dir: "ltr" },
  { id: "spanish", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸", dir: "ltr" },
  { id: "french", label: "French", nativeLabel: "Français", flag: "🇫🇷", dir: "ltr" },
  { id: "german", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { id: "arabic", label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦", dir: "rtl" },
  { id: "japanese", label: "Japanese", nativeLabel: "日本語", flag: "🇯🇵", dir: "ltr" }
];

export async function GET() { return NextResponse.json({ data: languages }); }
export async function POST() { return NextResponse.json({ success: true, data: languages }); }
export async function PUT() { return NextResponse.json({ success: true, data: languages }); }
export async function DELETE() { return NextResponse.json({ success: true, data: languages }); }
