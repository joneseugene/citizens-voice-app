import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="min-h-screen bg-(--background) text-(--foreground) flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="text-(--primary)">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {children}
          </div>
      </section>
         </main>
      <Footer />
    </div>
  );
}