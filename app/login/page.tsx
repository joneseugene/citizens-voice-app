import { LoginClient } from "@/components/page/login.client";
import { Toaster } from "sonner";

export default function LoginPage() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <LoginClient />
    </>
  );
}