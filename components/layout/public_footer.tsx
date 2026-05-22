import Image from "next/image";
import Link from "next/link";

export const PublicFooter = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-xs text-muted-foreground">
        
        {/* Left */}
        <div className="flex items-center gap-2">
          <Image
            src="/image/dsti_logo.png"
            alt="DSTI Logo"
            width={28}
            height={28}
            className="h-7 w-auto"
          />

          <span>Developed by DSTI</span>
        </div>

        {/* Right */}
        <Link
          href="/insights"
          className="hover:text-foreground transition-colors"
        >
          View insights →
        </Link>
      </div>
    </footer>
  );
};