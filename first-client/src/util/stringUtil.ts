import { PokemonDetail, Stat } from '../components/Pokemons/Detail/types';

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
