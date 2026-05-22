import { PublicFooter } from "@/components/layout/public_footer";
import { PublicHeader } from "@/components/layout/public_header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <section className="text-(--primary)">
            {children}
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
