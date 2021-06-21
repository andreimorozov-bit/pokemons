import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'memory-cache';
import { map } from 'rxjs/operators';
import {
  POKEMON_API_URL,
  POKEMON_PICTURE_URL,
  POKEMON_PICTURE_SMALL_URL,
} from 'src/constants/settings';
import { parsePokemonDetail, parsePokemonsList } from './utils';

@Injectable()
export class PokemonsService {
  cache = new Cache();
  constructor(private http: HttpService) {}

  async getAllPokemons(offset?: number, limit?: number) {
    const url = `${POKEMON_API_URL}?offset=${offset}&limit=${limit}`;
    try {
      const cachedResult = this.cache.get(url);

      if (cachedResult !== null) {
        return parsePokemonsList(cachedResult);
      } else {
        const response = await this.http.get(url).toPromise();

        this.cache.put(url, response.data, 100000 * 60 * 60);

        console.log(response.data);

        return parsePokemonsList(response.data);
      }
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  getPokemonsBySearch(text: string) {
    return `pokemons by search: ${text}`;
  }

  async getPokemonById(id: string) {
    const url = `${POKEMON_API_URL}${id}`;

    try {
      const cachedResult = this.cache.get(url);

      if (cachedResult !== null) {
        return parsePokemonDetail(cachedResult);
      } else {
        const response = await this.http.get(url).toPromise();

        this.cache.put(url, response.data, 100000 * 60 * 60);

        console.log(response.data);
        return parsePokemonDetail(response.data);
      }
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
