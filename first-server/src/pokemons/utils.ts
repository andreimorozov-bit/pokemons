import { POKEMON_PICTURE_SMALL_URL } from 'src/constants/settings';
import { PokemonsFilterDto } from './pokemons-filter-dto';
import { PokemonDetail } from './types/pokemon-detail';
import { PokemonsList } from './types/pokemons-list';

export const parsePokemonsList = (pokemonsListData): PokemonsList => {
  const pokemons = pokemonsListData.results.map((item) => {
    const urlArray = item.url.split('/');
    const pokemonId = urlArray[urlArray.length - 2];
    return {
      ...item,
      pictureSmall: `${POKEMON_PICTURE_SMALL_URL}${pokemonId}.png`,
      id: pokemonId,
    };
  });
  const pokemonsList: PokemonsList = {
    count: pokemonsListData.count,
    next: pokemonsListData.next,
    previous: pokemonsListData.previous,
    pokemons: pokemons,
  };

  return pokemonsList;
};

export const filterPokemonsList = (pokemonsFilterDto: PokemonsFilterDto) => {
  const { pokemons, search } = pokemonsFilterDto;
  const filteredPokemons = pokemons
    .filter((item) => {
      return item.name.indexOf(search) >= 0;
    })
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else return 1;
    });
  return filteredPokemons;
};

export const parsePokemonDetail = (pokemonDetailData): PokemonDetail => {
  const pokemonDetail: PokemonDetail = {
    id: pokemonDetailData['id'],
    height: pokemonDetailData['height'],
    name: pokemonDetailData['name'],
    weight: pokemonDetailData['weight'],
    baseExperience: pokemonDetailData['base_experience'],
    types: pokemonDetailData['types'].map((type) => {
      return {
        slot: type['slot'],
        type: {
          name: type['type']['name'],
          url: type['type']['url'],
        },
      };
    }),
    pictureOfficial:
      pokemonDetailData['sprites']['other']['official-artwork'][
        'front_default'
      ],
    stats: pokemonDetailData['stats'].map((stat) => {
      return {
        effort: stat['effort'],
        baseStat: stat['base_stat'],
        stat: {
          name: stat['stat']['name'],
          url: stat['stat']['url'],
        },
      };
    }),
    abilities: pokemonDetailData['abilities'].map((ability) => {
      return {
        ability: {
          name: ability['ability']['name'],
          url: ability['ability']['url'],
        },
        isHidden: ability['is_hidden'],
        slot: ability['slot'],
      };
    }),
  };

  return pokemonDetail;
};
