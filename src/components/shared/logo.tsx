import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Logo({ size = "default" }: { size?: "default" | "small" | "large" }) {
  const iconSize = size === "small" ? 18 : size === "large" ? 28 : 22;
  const textSize = size === "small" ? "text-lg" : size === "large" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg gradient-bg group-hover:animate-pulse-glow transition-all duration-300">
        <Sparkles className="text-white" size={iconSize} />
      </div>
      <span className={`${textSize} font-bold font-heading tracking-tight`}>
        Content<span className="gradient-text">Flow</span>
      </span>
    </Link>
  );
}
