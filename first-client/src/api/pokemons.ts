import axios, { AxiosResponse } from 'axios';
import { PokemonsListType } from '../components/Pokemons/List/types';
import { POKEMONS_URL } from '../constants/settings';
import { pokemonDetailTransform } from '../util/stringUtil';

export interface GetPokemonsDto {
  skip: number;
  limit: number;
}

export const getPokemons = async ({ skip, limit }: GetPokemonsDto) => {
  const response = await axios.get<PokemonsListType>(
    `${POKEMONS_URL}?limit=${limit}&offset=${skip}`
  );

  return response.data;
};

export const getPokemonById = async (id: string) => {
  const response = await axios.get(`${POKEMONS_URL}${id}`);
  return pokemonDetailTransform(response.data);
};
