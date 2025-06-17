import { getChampionAbilities } from "@/lib/api";
import Image from "next/image";

export default async function ChampionPage(props: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const { id } = await props.params;
  const champion = await getChampionAbilities(id);

  // Placeholder items and runes (replace with real data/fetch as needed)
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
  ];
  const runes = [
    {
      id: 1,
      name: "Conqueror",
      imageUrl:
        "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png",
      description: "Gain stacks for bonus AD/AP on hit.",
    },
    {
      id: 2,
      name: "Legend: Alacrity",
      imageUrl:
        "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
      description: "+Attack Speed for each takedown.",
    },
  ];

  return (
    <div className="flex-1 mx-auto px-2 py-6 max-w-5xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-6 bg-card rounded-lg p-4 shadow">
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
          <Image
            src={champion.defaultSkinImageUrls.square}
            alt={champion.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{champion.name}</h1>
          <p className="text-muted-foreground mb-2">{champion.title}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {champion.tags.map((tag) => (
              <span
                key={tag}
                className="bg-input text-xs text-accent-foreground px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Attack: {champion.info?.attack ?? "-"}</span>
            <span>Defense: {champion.info?.defense ?? "-"}</span>
            <span>Magic: {champion.info?.magic ?? "-"}</span>
            <span>Difficulty: {champion.info?.difficulty ?? "-"}</span>
          </div>
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Abilities and Runes */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Abilities Section */}
          <div className="bg-card rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-4">Abilities</h3>
            {/* Passive */}
            <div className="flex gap-4 mb-6">
              <div className="relative w-16 h-16 rounded overflow-hidden">
                <Image
                  src={champion.passive.imageUrl}
                  alt={champion.passive.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-1">
                  Passive: {champion.passive.name}
                </h2>
                <p className="text-sm">{champion.passive.description}</p>
              </div>
            </div>
            {/* Spells Q/W/E/R */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {champion.spells.map((spell, i) => (
                <div key={spell.id} className="bg-muted rounded p-3">
                  <div className="flex gap-4 group relative">
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                      <Image
                        src={spell.imageUrl}
                        alt={spell.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">
                        {String.fromCharCode(81 + i)}: {spell.name}
                      </h3>
                    </div>
                    {/* Tooltip */}
                    <div className="hidden group-hover:flex flex-col absolute left-0 top-16 z-10 bg-card border rounded p-3 w-64 shadow-lg">
                      <span className="font-bold mb-1">{spell.name}</span>
                      <span className="mb-2">{spell.tooltip}</span>
                      {spell.cooldown && (
                        <span className="text-muted-foreground">
                          Cooldown: {spell.cooldown.join("/")}s
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Runes Panel */}
          <div className="bg-card rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-4">Popular Runes</h3>
            <div className="flex gap-4 flex-wrap">
              {runes.map((rune) => (
                <div key={rune.id} className="w-16 text-center">
                  <div className="w-10 h-10 relative rounded border overflow-hidden mx-auto mb-1">
                    <Image
                      src={rune.imageUrl}
                      alt={rune.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs block" title={rune.name}>
                    {rune.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right: Items */}
        <div className="w-full md:w-1/3">
          <div className="bg-card rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-4">Popular Items</h3>
            <div className="flex flex-wrap gap-4">
              {items.map((item) => (
                <div key={item.id} className="w-16 text-center group relative">
                  <div className="w-12 h-12 relative rounded border overflow-hidden mx-auto">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span
                    className="text-xs block mt-1 truncate"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  {/* Tooltip */}
                  <div className="hidden group-hover:flex flex-col absolute bottom-20 z-10 bg-card border rounded p-3 w-64 shadow-lg">
                    <strong className="mb-2">{item.name}</strong>
                    <div>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
