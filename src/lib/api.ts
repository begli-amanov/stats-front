import type { Champion } from "@/lib/IChampion";

// In-memory cache for the full list of champions (populated on first fetch)
let championsCache: Champion[] | null = null;

// In-memory cache for individual champion details, keyed by champion id
const championDetailsCache: Record<string, Champion> = {};

/**
 * Fetches the list of all champions from the API.
 * Uses in-memory cache to avoid repeated API calls during the session.
 */
export async function getChampions(): Promise<Champion[]> {
  if (championsCache) return championsCache; // Return cached if available
  const res = await fetch("http://localhost:8080/lol/champion/list", {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch champions data");
  const data = await res.json();
  championsCache = data; // Cache the result
  return data;
}

/**
 * Fetches detailed information about spells and passives for a specific champion by id.
 * Uses in-memory cache to avoid repeated API calls for the same champion during the session.
 */
export async function getChampionAbilities(id: string): Promise<Champion> {
  if (championDetailsCache[id]) return championDetailsCache[id]; // Return cached if available
  const res = await fetch(`http://localhost:8080/lol/champion/${id}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch champions abilities");
  const data = await res.json();
  championDetailsCache[id] = data; // Cache the result
  return data;
}
