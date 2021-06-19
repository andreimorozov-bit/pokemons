import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

interface PokemonDetailProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ id }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleBackClick = () => {
    history.push('/pokemons');
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          Pokemon with id {id} and azaza
        </Grid>
        <Grid item xs={12}>
          <IconButton
            aria-label='back'
            className={classes.margin}
            onClick={handleBackClick}
          >
            <ArrowBackIcon fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
