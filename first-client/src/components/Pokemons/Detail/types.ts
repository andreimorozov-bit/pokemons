export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
};

export type Stat = {
  baseStat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonDetail = {
  height: number;
  weight: number;
  baseExperience: number;
  id: string;
  name: string;
  pictureOfficial: string;
  types: PokemonType[];
  stats: Stat[];
  abilities: Ability[];
};
