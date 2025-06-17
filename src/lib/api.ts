import type { Champion } from "@/lib/IChampion";

let championsCache: Champion[] | null = null;
const championDetailsCache: Record<string, Champion> = {};

export async function getChampions(): Promise<Champion[]> {
  if (championsCache) return championsCache;
  const res = await fetch("http://localhost:8080/lol/champion/list", {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch champions data");
  const data = await res.json();
  championsCache = data;
  return data;
}

export async function getChampionAbilities(id: string): Promise<Champion> {
  if (championDetailsCache[id]) return championDetailsCache[id];
  const res = await fetch(`http://localhost:8080/lol/champion/${id}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch champions abilities");
  const data = await res.json();
  championDetailsCache[id] = data;
  return data;
}
