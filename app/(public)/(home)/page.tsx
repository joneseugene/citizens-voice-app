import HomeClient from "@/components/page/home/index.home.client";
import { getMDAs } from "@/libs/api/mda.api";
import { getRegions } from "@/libs/api/region.api";

export default async function Page() {
  const regions = await getRegions();
  const mdas = await getMDAs();


  return (
    <HomeClient regions={regions} mdas={mdas} />
  );
}
