import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PageWrapper } from '../../components/PageWrapper';
import { Pokemons } from '../../components/Pokemons/List';

export function PokemonsPage() {
  return (
    <PageWrapper>
      <Pokemons />
    </PageWrapper>
  );
}
