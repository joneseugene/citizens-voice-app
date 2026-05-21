"use client";

import { MessageSquareQuote } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg bg-(--primary) text-(--primary-foreground) grid place-items-center shadow-sm">
            <Image
              src="/image/salone_map.png"
              alt="Message Icon"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-foreground text-sm sm:text-base">
              Citizen Voice
            </div>
            <div className="text-xs text-muted-foreground">Sierra Leone</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm">
          <Link
            href="/"
            className={`px-3 py-2 rounded-md transition ${
              isActive("/")
                ? "bg-(--secondary) text-(--foreground) font-medium"
                : "text-muted-foreground hover:text-(--foreground) hover:bg-(--secondary)"
            }`}
          >
            Submit
          </Link>
          <Link
            href="/insights"
            className={`px-3 py-2 rounded-md transition ${
              isActive("/insights")
                ? "bg-(--secondary) text-(--foreground) font-medium"
                : "text-muted-foreground hover:text-(--foreground) hover:bg-(--secondary)"
            }`}
          >
            Insights
          </Link>
        </nav>
      </div>
    </header>
  );
}
