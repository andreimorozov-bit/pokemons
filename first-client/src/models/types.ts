export interface PokemonType {
  id: string;
  name: string;
  url: string;
  pictureSmall: string;
}

export interface PokemonsListType {
  count: number;
  next: string | null;
  previous: string | null;
  pokemons: PokemonType[];
}
