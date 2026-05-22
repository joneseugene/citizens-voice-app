"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoginForm } from "../feature/LoginForm";

type LoginRole = "chief_minister" | "admin";

export function LoginClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    if (!email || !password) {
      toast.error("Please enter email and password");
      setSubmitting(false);
      return;
    }

    localStorage.setItem(
      "civic_user",
      JSON.stringify({
        email,
        role,
        loggedIn: true,
      }),
    );

    toast.success("Signed in successfully");

    if (role === "chief_minister") {
      router.push("/dashboard/chief-minister");
    } else {
      router.push("/dashboard/admin");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-(--primary/10) via-(--background) to-(--accent/10) px-4">
        <LoginForm
            email={email}
            password={password}
            submitting={submitting}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={submit}
        />
    </div>
  );
}