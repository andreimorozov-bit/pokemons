import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'memory-cache';
import { POKEMON_API_URL } from 'src/constants/settings';
import { PokemonsList } from './types/pokemons-list';
import {
  parsePokemonDetail,
  parsePokemonsList,
  filterPokemonsList,
} from './utils';
import { NewAbility } from './types/pokemon-detail';

@Injectable()
export class PokemonsService {
  cache = new Cache();
  constructor(private http: HttpService) {}

  async useCache(url: string) {
    try {
      const cachedResult = this.cache.get(url);

      if (cachedResult !== null) {
        return cachedResult;
      } else {
        const response = await this.http.get(url).toPromise();

        this.cache.put(url, response.data, 100000 * 60 * 60);

        return response.data;
      }
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async getPokemons(offset?: number, limit?: number, search?: string) {
    const url = `${POKEMON_API_URL}?offset=0&limit=2000`;

    const response = await this.useCache(url);
    let parsedPokemonsList = parsePokemonsList(response);
    if (!search || search.length === 0) {
      parsedPokemonsList.pokemons = parsedPokemonsList.pokemons.slice(
        Number(offset),
        Number(offset) + Number(limit),
      );

      return parsedPokemonsList;
    }

    if (search.length > 0) {
      const filteredPokemons = filterPokemonsList({
        pokemons: parsedPokemonsList.pokemons,
        search,
      });

      const pokemonsCount = filteredPokemons.length;
      const slicedPokemons = filteredPokemons.slice(
        Number(offset),
        Number(offset) + Number(limit),
      );

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

      const pokemonsList: PokemonsList = {
        count: pokemonsCount,
        next,
        previous,
        pokemons: slicedPokemons,
      };

      return pokemonsList;
    }
  }

  getPokemonsBySearch(text: string) {
    return `pokemons by search: ${text}`;
  }

  async getPokemonById(id: string) {
    const url = `${POKEMON_API_URL}${id}`;

    const response = await this.useCache(url);

    let parsedPokemonDetail = parsePokemonDetail(response);

    const abilities = parsedPokemonDetail.abilities;

    let newAbilities: NewAbility[] = [];

    for (let item = 0; item < abilities.length; item++) {
      const ability = await this.useCache(abilities[item]['ability'].url);

      const description = ability['effect_entries'].find(
        (item) => item['language']['name'] === 'en',
      );

      newAbilities.push({
        ability: {
          name: abilities[item]['ability']['name'],
          url: abilities[item]['ability']['url'],
          description: description['short_effect'],
        },
        isHidden: abilities[item]['isHidden'],
        slot: abilities[item]['slot'],
      });
    }

    const newPokemonDetail = {
      ...parsedPokemonDetail,
      abilities: newAbilities,
    };

    return newPokemonDetail;
  }

  async getAbilityById() {}

  async getAbilityDescriptionByUrl(url: string) {
    const result = await this.useCache(url);

    const response = await this.http.get(url).toPromise();
  }
}
