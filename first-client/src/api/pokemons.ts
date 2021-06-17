import axios, { AxiosResponse } from 'axios';
import { PokemonsListType } from '../models/types';
import { POKEMONS_URL } from '../constants/settings';

export const getPokemons = async (skip: number, limit: number) => {
  const pokemons = await axios.get<PokemonsListType>(
    `${POKEMONS_URL}?limit=${limit}&offset=${skip}`
  );

  return pokemons.data;
};
