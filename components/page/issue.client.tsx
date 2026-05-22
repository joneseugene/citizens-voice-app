"use client";

import { IssueCategoryInterface } from "@/libs/interface/issue_category.interface";
import { RegionInterface } from "@/libs/interface/region.interface";
import React, { useState } from "react";
import { Toaster } from "sonner";
import { Done } from "../feature/DoneSubmit";
import { IssueForm } from "../feature/IssueForm";

export function IssueClient({
  regions,
  issue_categories,
}: {
  regions: RegionInterface[];
  issue_categories: IssueCategoryInterface[];
}) {
  const [done, setDone] = useState(false);
  return (
    <>
      <Toaster richColors position="top-center" />
      <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-(--muted-foreground)">Share a community challenge</h1>
        <p className="mt-2 text-sm text-(--muted-foreground)">
          Submissions are anonymous by default and used to detect civic trends.
        </p>
      <section className="py-8 sm:py-10">
        {done ? (
          <>
            <Done onReset={() => setDone(false)} />
          </>
        ) : (
          <>
            <IssueForm
              regions={regions}
              issue_categories={issue_categories}
              onDone={() => setDone(true)}
            />
          </>
        )}
      </section>
      </main>
    </>
  );
}
