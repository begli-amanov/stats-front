"use client";

import React, { useEffect, useState } from "react";
import { getChampions } from "@/lib/api";
import type { Champion } from "@/lib/IChampion";

const ChampionCard: React.FC<{ champion: Champion }> = ({ champion }) => (
  // Champion card component
  <div className="min-w-[240px] max-w-[340px] border flex flex-col bg-card rounded-lg shadow-md m-2 transition-transform hover:scale-105 cursor-pointer">
    {/* image of champions */}
    <img
      src={champion.defaultSkinImageUrls.splash}
      alt={champion.name}
      className="w-full h-full object-cover overflow-hidden rounded-t-lg"
      loading="lazy"
    />
    <div className="font-semibold text-lg text-center flex flex-col items-center p-4 ">
      {champion.name}

      <div className="text-xs text-muted-foreground text-center mb-1">
        {champion.title}
      </div>
      <div className="flex flex-wrap gap-1 justify-center mt-1">
        {champion.tags.map((tag) => (
          <span
            key={tag}
            className="bg-secondary text-xs px-2 py-0.5 rounded-full text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
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

  useEffect(() => {
    if (initialChampions) return;
    getChampions()
      .then((data) => {
        setChampions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load champions");
        setLoading(false);
      });
  }, [initialChampions]);

  if (loading)
    return <div className="p-8 text-center">Loading champions...</div>;
  if (error)
    return <div className="p-8 text-center text-destructive">{error}</div>;

  return (
    <div className="py-4 my-6">
      {/* Fixed height container with vertical scroll - hidden scrollbar */}
      <div
        // overflowY="auto" is need here to hide other cards. otherwise it will show all cards
        className="h-[63.6rem] overflow-y-auto rounded-lg p-4 scrollbar-hide"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
        {/* Grid of champion cards - 4 columns, shows ~16 cards (4 rows) at once */}
        <div className="grid grid-cols-4 gap-4">
          {champions.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      </div>

      {/* Optional: Show total count */}
      <div className="text-center text-sm text-muted-foreground mt-2">
        {champions.length} champions total
      </div>
    </div>
  );
};

export default ChampionsScroll;
