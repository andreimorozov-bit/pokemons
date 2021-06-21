import { Fragment } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PageWrapper } from '../../PageWrapper';
import { PokemonsList } from './PokemonsList';

export function Pokemons() {
  return (
    <Fragment>
      <Typography variant='h4'>Pokemons</Typography>
      <PokemonsList />
    </Fragment>
  );
}
