import { useHistory, useParams } from 'react-router-dom';
import { PokemonDetail } from '../../components/Pokemons/PokemonDetail';
import { PageWrapper } from '../../components/PageWrapper';
import Typography from '@material-ui/core/Typography';

export function PokemonDetailPage() {
  const params: { id: string } = useParams();
  const id = params.id;

  return (
    <PageWrapper>
      <Typography variant='h4'>Pokemon detail for {id}</Typography>
      <PokemonDetail id={id} />
    </PageWrapper>
  );
}
