"use client";

import React, { useEffect, useRef, useState } from "react";
import { getChampions } from "@/lib/api";
import type { Champion } from "@/lib/IChampion";

const ChampionCard: React.FC<{ champion: Champion }> = ({ champion }) => (
  <div className="min-w-[220px] max-w-[220px] bg-white dark:bg-zinc-900 rounded-lg shadow-md m-2 flex flex-col items-center p-4 transition-transform hover:scale-105 cursor-pointer">
    <img
      src={champion.defaultSkinImageUrls.square}
      alt={champion.name}
      className="w-20 h-20 rounded-full object-cover mb-2 border border-zinc-200 dark:border-zinc-700"
      loading="lazy"
    />
    <div className="font-semibold text-lg text-center">{champion.name}</div>
    <div className="text-xs text-zinc-500 text-center mb-1">
      {champion.title}
    </div>
    <div className="flex flex-wrap gap-1 justify-center mt-1">
      {champion.tags.map((tag) => (
        <span
          key={tag}
          className="bg-zinc-200 dark:bg-zinc-800 text-xs px-2 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300"
        >
          {tag}
        </span>
      ))}
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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Enable horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  if (loading)
    return <div className="p-8 text-center">Loading champions...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div
      className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
      ref={scrollRef}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="flex flex-row gap-2 py-4 px-2 min-w-fit">
        {champions.map((champion) => (
          <ChampionCard key={champion.id} champion={champion} />
        ))}
      </div>
    </div>
  );
};

export default ChampionsScroll;
