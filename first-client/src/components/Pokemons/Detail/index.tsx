import React from 'react';
import Grid from '@material-ui/core/Grid';
import { PokemonDetailItem } from './PokemonDetailItem';

interface PokemonDetailProps {
  id: string;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ id }) => {
  return (
    <div>
      <Grid container item xs={12}>
        <PokemonDetailItem id={id} />
      </Grid>
    </div>
  );
};
