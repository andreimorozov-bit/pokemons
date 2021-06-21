export interface PokemonsListItem {
  name: string;
  url: string;
  pictureSmall: string;
  id: string;
}

export interface PokemonsList {
  count: number;
  next: string;
  previous: string;
  pokemons: PokemonsListItem[];
}
