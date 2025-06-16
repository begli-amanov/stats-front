import { getChampionAbilities } from "@/lib/api";
import Image from "next/image";

export default async function ChampionPage(props: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const { id } = await props.params;
  const champion = await getChampionAbilities(id);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="flex items-center gap-8 mb-12">
        <div className="relative w-48 h-48 rounded-lg overflow-hidden">
          <Image
            src={champion.defaultSkinImageUrls.square}
            alt={champion.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{champion.name}</h1>
          <p className="text-xl text-muted-foreground mb-4">{champion.title}</p>
          <div className="flex gap-2">
            {champion.tags.map((tag) => (
              <span
                key={tag}
                className="bg-input text-accent-foreground px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Abilities Section */}
      <div className="space-y-8">
        {/* Passive Ability */}
        <div className="bg-card rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Passive - {champion.passive.name}
          </h2>
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={champion.passive.imageUrl}
                alt={champion.passive.name}
                width={64}
                height={64}
              />
            </div>
            <p className="flex-1">{champion.passive.description}</p>
          </div>
        </div>

        {/* Active Abilities */}
        <div className="grid gap-6">
          {champion.spells.map((spell, index) => (
            <div key={spell.id} className="bg-card rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                {String.fromCharCode(81 + index)} - {spell.name}
              </h2>
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={spell.imageUrl}
                    alt={spell.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex-1">
                  <p className="mb-4">{spell.tooltip}</p>
                  {spell.cooldown && (
                    <div className="text-sm text-muted-foreground">
                      Cooldown: {spell.cooldown.join("/")} seconds
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
