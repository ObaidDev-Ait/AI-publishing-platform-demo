export interface Language {
  id: string;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { id: "english", label: "English", nativeLabel: "English", flag: "🇺🇸", dir: "ltr" },
  { id: "arabic", label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦", dir: "rtl" },
  { id: "french", label: "French", nativeLabel: "Français", flag: "🇫🇷", dir: "ltr" },
  { id: "spanish", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸", dir: "ltr" },
  { id: "chinese", label: "Chinese", nativeLabel: "中文", flag: "🇨🇳", dir: "ltr" },
  { id: "german", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { id: "italian", label: "Italian", nativeLabel: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { id: "portuguese", label: "Portuguese", nativeLabel: "Português", flag: "🇧🇷", dir: "ltr" },
  { id: "dutch", label: "Dutch", nativeLabel: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  { id: "turkish", label: "Turkish", nativeLabel: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { id: "russian", label: "Russian", nativeLabel: "Русский", flag: "🇷🇺", dir: "ltr" },
];
