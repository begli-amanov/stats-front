"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getChampions } from "@/lib/api";
import type { Champion } from "@/lib/IChampion";

// ChampionCard component to display each champion
const ChampionCard = React.memo<{ champion: Champion }>(({ champion }) => (
  <div className="min-w-60 max-w-60 border bg-card rounded-lg shadow-md m-2 flex flex-col cursor-pointer">
    {/* image of champions */}
    {/* if we remove overflow-hidden, the image will not be cropped and the default black thick border will be visible */}
    <div className="overflow-hidden rounded-t-lg">
      <img
        src={champion.defaultSkinImageUrls.square}
        alt={`${champion.name} - ${champion.title}`}
        className="w-full h-full object-cover scale-115 transition-transform hover:scale-125 duration-300 "
      />
    </div>
    {/* Name */}
    <div className="font-semibold text-lg flex flex-col items-center gap-1 pt-2 pb-4">
      {champion.name}

      {/* Title*/}
      <div className="text-xs text-muted-foreground mb-2">{champion.title}</div>

      {/* Tags */}
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
));

ChampionCard.displayName = "ChampionCard";

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
    if (initialChampions) return;

    try {
      const data = await getChampions();
      setChampions(data);
      setLoading(false);
    } catch (err) {
      setError((err as Error)?.message || "Failed to load champions");
      setLoading(false);
    }
  }, [initialChampions]);

  useEffect(() => {
    let mounted = true;

    loadChampions().catch(() => {
      if (mounted) {
        setError("Failed to load champions");
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [loadChampions]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    // Champions container
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
