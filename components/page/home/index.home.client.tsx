'use client'

import { Hero } from "@/components/page/home/hero.home";
import { useState } from "react";
import { Done } from "./done.home";
import { CitizenForm } from "./form.home";
import { RegionInterface } from "@/libs/interface/region.interface";
import { MdaInterface } from "@/libs/interface/mda.interface";
import { Toaster } from "sonner";

export default function HomeClient({
  regions,
  mdas
}: {
  regions: RegionInterface[];
  mdas: MdaInterface[];
}) {
  const [done, setDone] = useState(false);
  return (

      <>
      <Toaster richColors position="top-center" />
      <Hero />
      <section className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        {done ? (
          <>
          <Done onReset={() => setDone(false)} />
          </>
        )
        : (
          <>
          <CitizenForm regions={regions} mdas={mdas}  onDone={() => setDone(true)} />
          </>
        )}
      </section>
      </>
  );
}
