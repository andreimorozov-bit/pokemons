import {
  PokemonDetail,
  Stat,
  PokemonType,
  Ability,
} from '../components/Pokemons/Detail/types';

// export interface Ability {
//   ability: {
//     name: string;
//     url: string;
//   };
//   isHidden: boolean;
//   slot: number;
// }

// export interface Stat {
//   baseStat: number;
//   effort: number;
//   stat: {
//     name: string;
//     url: string;
//   };
// }

// export interface PokemonType {
//   slot: number;
//   type: {
//     name: string;
//     url: string;
//   };
// }

// export interface PokemonDetail {
//   height: number;
//   weight: number;
//   baseExperience: number;
//   id: string;
//   name: string;
//   pictureOfficial: string;
//   types: PokemonType[];
//   stats: Stat[];
//   abilities: Ability[];
// }

export const pokemonDetailTransform = (
  pokemonDetail: PokemonDetail
): PokemonDetail => {
  let newPokemonDetail = Object.assign({}, pokemonDetail);
  newPokemonDetail.stats = pokemonDetail.stats.map((item: Stat): Stat => {
    let newStat: Stat = { ...item };
    newStat.stat.name = item.stat.name.replace('-', ' ');
    return newStat;
  });

  return newPokemonDetail;
};
