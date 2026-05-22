import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const Done = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="rounded-2xl border border-(--border) bg-(--card) p-8 text-center shadow-sm">
      <div className="mx-auto h-12 w-12 rounded-full bg-(--primary/10) text-(--primary) grid place-items-center">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-xl font-semibold">Submission received</h2>
      <p className="mt-2 text-sm text-(--muted-foreground)">
        Thank you for contributing. You can submit another or view what the
        country is saying.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button onClick={onReset}>Submit another</Button>
        <Button asChild variant="outline">
          <Link href="/insights">View insights</Link>
        </Button>
      </div>
    </div>
  );
};
