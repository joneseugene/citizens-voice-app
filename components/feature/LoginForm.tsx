"use client";

import { Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type LoginRole = "chief_minister" | "admin";

export function LoginForm({
  email,
  password,
  submitting,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: {
  email: string;
  password: string;
  submitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
    const router = useRouter();
  return (
    <div className="w-full max-w-md rounded-2xl border bg-(--card) p-8 shadow-sm">
      <div className="flex justify-center items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary) text-(--primary-foreground)">
          <Image
            src="/image/salone_map.png"
            alt="Sierra Leone Map"
            width={40}
            height={40}
            className="h-auto w-10 mt-2"
          />
        </div>

        <div>
          <div className="font-semibold">Civic Voice</div>
          <div className="text-xs text-(--muted-foreground)">
            Officials sign-in
          </div>
        </div>
      </div>

      <h1 className="mt-6 text-2xl text-center font-semibold">Sign in</h1>

      <p className="mt-1 py-5 text-center text-sm text-(--muted-foreground)">
        For Government Officials
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full rounded-md border bg-(--background) px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="w-full rounded-md border bg-(--background) px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-(--primary) px-4 py-2.5 text-sm font-medium text-(--primary-foreground) hover:bg-(--primary/90) disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Continue"}
        </button>
        {/* Footer */}
        <div className="flex items-center">
          {/* Left Home Icon */}
          <Home  onClick={() => router.push("/")}  className="h-4 w-4 cursor-pointer text-(--muted-foreground)" /> 

          {/* Center DSTI Content */}
          <div className="flex flex-1 items-center justify-center gap-2">
            <Image
              src="/image/dsti_logo.png"
              alt="DSTI Logo"
              width={28}
              height={28}
              className="h-7 w-auto"
            />

            <p className="text-xs text-(--muted-foreground)">
              Developed by DSTI
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
