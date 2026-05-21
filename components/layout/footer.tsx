import Link from 'next/link';

export const Footer = () => {
  return (
    <>
    <footer className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground flex justify-between">
          <span>Developed by DSTI</span>
          <Link href="/insights" className="hover:text-foreground">View insights →</Link>
        </div>
      </footer>
    </>
  )
}
