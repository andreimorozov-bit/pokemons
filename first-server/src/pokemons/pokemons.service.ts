import { HttpService, Injectable, NotFoundException } from '@nestjs/common';

import { map } from 'rxjs/operators';
import {
  POKEMON_API_URL,
  POKEMON_PICTURE_URL,
  POKEMON_PICTURE_SMALL_URL,
} from 'src/constants/settings';

@Injectable()
export class PokemonsService {
  constructor(private http: HttpService) {}
  async getAllPokemons(offset?: number, limit?: number) {
    try {
      const response = await this.http
        .get(`${POKEMON_API_URL}?offset=${offset}&limit=${limit}`)
        .toPromise();

      const pokemons = response.data.results.map((item) => {
        const urlArray = item.url.split('/');
        const pokemonId = urlArray[urlArray.length - 2];
        return {
          ...item,
          pictureSmall: `${POKEMON_PICTURE_SMALL_URL}${pokemonId}.png`,
          id: pokemonId,
        };
      });
      const parsedResponse = {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        pokemons: pokemons,
      };

      return parsedResponse;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  getPokemonsBySearch(text: string) {
    return `pokemons by search: ${text}`;
  }

  async getPokemonById(id: string) {
    try {
      const response = await this.http
        .get(`${POKEMON_API_URL}${id}`)
        .toPromise();
      return response.data;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
