'use client'

import { ArrowRight, BarChart3, MessageCircleHeart, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HomeClient() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-background to-accent/10" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-medium text-primary">
              Civic intelligence platform
            </span>
            <h1 className="mt-5 text-4xl font-bold text-gray-800 tracking-tight sm:text-6xl">
              Your voice shapes{" "}
              <span className="text-(--primary)">Sierra Leone</span>
            </h1>
            <p className="mt-5 text-lg text-(--muted-foreground)">
              Civic Voice is a public platform where citizens anonymously share
              community challenges and recommendations. We aggregate submissions
              into insights and trends — surfacing what matters across regions
              and districts.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/issue"
                className="inline-flex items-center gap-2 rounded-md bg-(--primary) px-5 py-3 text-sm font-medium text-(--primary-foreground) shadow-sm hover:bg-(--primary/90)"
              >
                Submit an Issue <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 rounded-md border bg-(--card) px-5 py-3 text-sm font-medium hover:bg-(--secondary)"
              >
                View Public Insights
              </Link>
            </div>
            <p className="mt-6 text-sm font-medium text-(--muted-foreground)">
              Anonymous. Structured. Insight-driven.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: MessageCircleHeart,
              title: "Share a challenge",
              body: "Tell us what's affecting your community — anonymously and securely.",
            },
            {
              icon: BarChart3,
              title: "See the trends",
              body: "We aggregate submissions into public dashboards and regional insights.",
            },
            {
              icon: ShieldCheck,
              title: "Insight, not tickets",
              body: "This is a civic intelligence tool. We don't promise individual responses.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border bg-(--card) p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary/10) text-(--primary)">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-(--muted-foreground)">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
