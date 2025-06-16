"use client";

import { useEffect, useState, useCallback } from "react";
import { getChampions } from "@/lib/api";
import type { Champion } from "@/lib/IChampion";
import Link from "next/link";

// ChampionCard component to display each champion
function ChampionCard({ champion }: { champion: Champion }) {
  return (
    <Link href={`/champions/${champion.id}`} className="block">
      <div className="min-w-60 max-w-60 border bg-card rounded-lg shadow-md m-2 flex flex-col cursor-pointer">
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={champion.defaultSkinImageUrls.square}
            alt={`${champion.name} - ${champion.title}`}
            className="w-full h-full object-cover scale-115 transition-transform hover:scale-125 duration-300"
          />
        </div>
        <div className="font-semibold text-lg flex flex-col items-center gap-1 pt-2 pb-4">
          {champion.name}
          <div className="text-xs text-muted-foreground mb-2">
            {champion.title}
          </div>
          <div className="flex gap-1 justify-center">
            {champion.tags.map((tag) => (
              <span
                key={tag}
                className="bg-input text-xs text-accent-foreground px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

const LoadingState = () => (
  <div className="p-8 text-center">Loading champions...</div>
);
const ErrorState = ({ error }: { error: string }) => (
  <div className="p-8 text-center text-destructive">{error}</div>
);

interface ChampionsScrollProps {
  initialChampions?: Champion[];
}

const ChampionsScroll: React.FC<ChampionsScrollProps> = ({
  initialChampions,
}) => {
  const [champions, setChampions] = useState<Champion[]>(
    initialChampions || []
  );
  const [loading, setLoading] = useState(!initialChampions);
  const [error, setError] = useState<string | null>(null);

  const loadChampions = useCallback(async () => {
    try {
      const data = await getChampions();
      setChampions(data);
    } catch (err) {
      setError((err as Error)?.message || "Failed to load champions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialChampions) {
      loadChampions();
    }
  }, [initialChampions, loadChampions]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <>
      <div className="h-[70.5rem] overflow-y-auto rounded-lg p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-4 gap-4">
          {champions.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground mt-2">
        {champions.length} champions total
      </div>
    </>
  );
};

export default ChampionsScroll;
