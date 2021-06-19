import axios, { AxiosResponse } from 'axios';
import { PokemonsListType } from '../models/types';
import { POKEMONS_URL } from '../constants/settings';

export interface GetPokemonsDto {
  skip: number;
  limit: number;
}

export const getPokemons = async ({ skip, limit }: GetPokemonsDto) => {
  const pokemons = await axios.get<PokemonsListType>(
    `${POKEMONS_URL}?limit=${limit}&offset=${skip}`
  );

  return pokemons.data;
};
