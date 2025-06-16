import { getChampionAbilities } from "@/lib/api";
import Image from "next/image";

export default async function ChampionPage(props: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const { id } = await props.params;
  const champion = await getChampionAbilities(id);

  // Placeholder items (replace with real data/fetch as needed)
  const items = [
    {
      id: 1,
      name: "Infinity Edge",
      imageUrl:
        "https://ddragon.leagueoflegends.com/cdn/15.12.1/img/item/3031.png",
      description:
        "+70 Attack Damage, +20% Crit Chance. Unique Passive: Crits deal 40% more damage.",
    },
    {
      id: 2,
      name: "Kraken Slayer",
      imageUrl:
        "https://ddragon.leagueoflegends.com/cdn/15.12.1/img/item/6672.png",
      description:
        "+40 Attack Damage, +30% Attack Speed, +20% Crit Chance. Unique Passive: Every third attack deals bonus true damage.",
    },
    // ...add more items as needed
  ];

  return (
    <div className="container mx-auto py-6 px-2">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column: Champion info and items */}
        <div className="flex flex-col items-center md:w-1/3 gap-4">
          <div className="relative w-36 h-36 rounded-lg overflow-hidden border">
            <Image
              src={champion.defaultSkinImageUrls.square}
              alt={champion.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-1">{champion.name}</h1>
            <p className="text-base text-muted-foreground mb-2">
              {champion.title}
            </p>
            <div className="flex flex-wrap gap-1 justify-center mb-2">
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
          {/* Items Section */}
          <div className="w-full bg-card rounded-lg p-3 mt-2">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Popular Items
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center group w-14 relative"
                >
                  <div className="w-12 h-12 relative rounded border overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <span
                    className="text-xs mt-1 text-center truncate w-full"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  {/* Tooltip on hover */}
                  <div className="hidden group-hover:block absolute z-10 bg-card border rounded p-2 text-xs w-48 left-1/2 -translate-x-1/2 mt-2 shadow-lg">
                    <strong>{item.name}</strong>
                    <div>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Abilities */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-3">Abilities</h2>
          <div className="flex flex-row flex-wrap gap-4 justify-start">
            {/* Passive */}
            <div className="flex flex-col items-center bg-card rounded-lg p-3 w-32">
              <div className="w-12 h-12 relative rounded overflow-hidden mb-1">
                <Image
                  src={champion.passive.imageUrl}
                  alt={champion.passive.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xs mb-1">Passive</span>
              <span className="text-xs font-semibold mb-1 text-center">
                {champion.passive.name}
              </span>
              <span
                className="text-xs text-muted-foreground text-center line-clamp-3"
                title={champion.passive.description}
              >
                {champion.passive.description}
              </span>
            </div>
            {/* Spells Q/W/E/R */}
            {champion.spells.map((spell, idx) => (
              <div
                key={spell.id}
                className="flex flex-col items-center bg-card rounded-lg p-3 w-32"
              >
                <div className="w-12 h-12 relative rounded overflow-hidden mb-1">
                  <Image
                    src={spell.imageUrl}
                    alt={spell.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-xs mb-1">
                  {String.fromCharCode(81 + idx)}
                </span>
                <span className="text-xs font-semibold mb-1 text-center">
                  {spell.name}
                </span>
                <span
                  className="text-xs text-muted-foreground text-center line-clamp-3"
                  title={spell.tooltip}
                >
                  {spell.tooltip}
                </span>
                {spell.cooldown && (
                  <span className="text-[10px] text-muted-foreground mt-1">
                    CD: {spell.cooldown.join("/")}s
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
