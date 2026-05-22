'use client'

import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image'

export function PublicHeader() {
  const pathname = usePathname();
  const links = [
    { to: "/", label: "Home" },
    { to: "/issue", label: "Issues" },
    { to: "/insights", label: "Insights" },
    { to: "/about", label: "About" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b bg-(--background/80) backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary) text-(--primary-foreground)">
            <Image
              src="/image/salone_map.png"
              alt="Message Icon"
              width={40}
              height={40}
              className="w-10 h-auto mt-1"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Civic Voice</div>
            <div className="text-[11px] text-(--muted-foreground)">
              Sierra Leone
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive =
                l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);

              return (
                <Link
                  key={l.to}
                  href={l.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm text-(--muted-foreground) transition-colors hover:bg-(--secondary) hover:text-(--foreground)",
                    isActive && "bg-(--secondary) text-(--foreground)",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-(--secondary)"
          >
            Officials
          </Link>
        </div>
      </div>
    </header>
  );
}
