import { getChampions } from "@/lib/api";
import ChampionsScroll from "./client";

export default async function ChampionsServer() {
  const champions = await getChampions();
  return <ChampionsScroll initialChampions={champions} />;
}
