export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
}

export interface NewAbility {
  ability: {
    name: string;
    url: string;
    description: string;
  };
  isHidden: boolean;
  slot: number;
}

export interface Stat {
  baseStat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetail {
  height: number;
  weight: number;
  baseExperience: number;
  id: string;
  name: string;
  pictureOfficial: string;
  types: PokemonType[];
  stats: Stat[];
  abilities: Ability[];
}
