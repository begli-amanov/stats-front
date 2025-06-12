export interface Spell {
  id: string;
  name: string;
  tooltip: string;
  leveltip: {
    label: string[];
    effect: string[];
  };
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costType: string;
  maxammo: string;
  range: number[];
  imageUrl: string;
}
