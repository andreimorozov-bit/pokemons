import { useHistory, useParams } from 'react-router-dom';
import { PokemonDetail } from '../../components/Pokemons/PokemonDetail';

export function PokemonDetailPage() {
  const params: { id: string } = useParams();
  const id = params.id;

  return <PokemonDetail id={id} />;
}
