import { useParams } from 'react-router-dom';
import { PokemonDetail } from '../../components/Pokemons/Detail';
import { PageWrapper } from '../../components/PageWrapper';

export function PokemonDetailPage() {
  const params: { id: string } = useParams();
  const id = params.id;

  return (
    <PageWrapper>
      <PokemonDetail id={id} />
    </PageWrapper>
  );
}
