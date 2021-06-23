import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'memory-cache';
import { map } from 'rxjs/operators';
import {
  POKEMON_API_URL,
  POKEMON_PICTURE_URL,
  POKEMON_PICTURE_SMALL_URL,
} from 'src/constants/settings';
import { PokemonsList } from './types/pokemons-list';
import { parsePokemonDetail, parsePokemonsList } from './utils';

@Injectable()
export class PokemonsService {
  cache = new Cache();
  constructor(private http: HttpService) {}

  async getPokemons(offset?: number, limit?: number, search?: string) {
    if (!search || search.length === 0) {
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

    if (search.length > 0) {
      const url = `${POKEMON_API_URL}?offset=0&limit=2000`;
      let result: PokemonsList;
      try {
        const cachedResult = this.cache.get(url);

        if (cachedResult !== null) {
          result = parsePokemonsList(cachedResult);
        } else {
          const response = await this.http.get(url).toPromise();

          this.cache.put(url, response.data, 100000 * 60 * 60);

          console.log(response.data);

          result = parsePokemonsList(response.data);
        }
      } catch (err) {
        throw new NotFoundException(err.message);
      }

      const start: number = offset;
      const end: number = Number(limit) + Number(offset) + 1;

      const filteredPokemons = result.pokemons
        .filter((item) => {
          return item.name.indexOf(search) >= 0;
        })
        .sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else return 1;
        });

      const pokemonsCount = filteredPokemons.length;
      const slicedPokemons = filteredPokemons.slice(
        Number(offset),
        Number(offset) + Number(limit),
      );

      console.log(pokemonsCount);
      console.log(start);
      console.log(end);

      const previous =
        offset === 0
          ? null
          : `http://localhost:5000/pokemons/?limit=${limit}&offset=${
              Number(offset) - Number(limit) > 0
                ? Number(offset) - Number(limit)
                : 0
            }&search=${search}`;

      const next =
        offset > Number(pokemonsCount) - Number(limit)
          ? null
          : `http://localhost:5000/pokemons/?limit=${limit}&offset=${
              Number(limit) + Number(offset)
            }&search=${search}`;

      const finalResult: PokemonsList = {
        count: pokemonsCount,
        next,
        previous,
        pokemons: slicedPokemons,
      };

      return finalResult;
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
