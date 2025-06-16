import type { Champion } from "@/lib/IChampion";

export async function getChampions(): Promise<Champion[]> {
  const res = await fetch("http://localhost:8080/lol/champion/list", {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch champions data");
  return res.json();
}

export async function getChampionAbilities(id: string): Promise<Champion> {
  const res = await fetch(`http://localhost:8080/lol/champion/${id}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch champions abilities");
  return res.json();
}
