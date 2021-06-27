import { Pokemon } from './types/pokemons-list';

export interface PokemonsFilterDto {
  pokemons: Pokemon[];
  search: string;
}
