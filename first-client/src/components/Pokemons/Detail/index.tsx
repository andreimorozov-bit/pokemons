import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
