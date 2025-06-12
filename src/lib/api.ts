import type { Champion } from "@/lib/IChampion";

/**
 * Fetches a list of all champions from the API
 * @returns Promise<Champion[]> Array of champion data
 * @throws Error if the fetch fails or response format is invalid
 */
export async function getChampions(): Promise<Champion[]> {
  try {
    // Fetch champions with 10-minute cache revalidation
    const response = await fetch("http://localhost:8080/lol/champion/list", {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const champions = (await response.json()) as Champion[];

    // Validate that the response is an array
    if (!Array.isArray(champions)) {
      throw new Error(
        "Invalid response format: expected an array of champions"
      );
    }

    return champions;
  } catch (error) {
    // Log the error and throw a user-friendly message
    console.error("Failed to fetch champions:", error);
    throw new Error("Failed to fetch champions data");
  }
}

/**
 * Fetches detailed information about a specific champion
 * @param championId - The ID of the champion to fetch (can be a Promise or string)
 * @returns Promise<Champion> Detailed champion data including spells and passive
 * @throws Error if the fetch fails or champion data is incomplete
 */
export async function getChampionAbilities(
  championId: Promise<string> | string
): Promise<Champion> {
  // Resolve the championId if it's a Promise
  const resolvedId = await Promise.resolve(championId);

  try {
    // Fetch specific champion data with 10-minute cache revalidation
    const response = await fetch(
      `http://localhost:8080/lol/champion/${resolvedId}`,
      { next: { revalidate: 600 } }
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: Failed to fetch champion ${resolvedId}`
      );
    }

    const champion = await response.json();

    // Validate that the champion data has all required properties
    if (!champion?.id || !champion?.spells || !champion?.passive) {
      throw new Error(`Invalid or incomplete data for champion ${resolvedId}`);
    }

    return champion;
  } catch (error) {
    // Log the error and re-throw for component-level handling
    console.error(`Champion fetch failed:`, error);
    throw error;
  }
}
