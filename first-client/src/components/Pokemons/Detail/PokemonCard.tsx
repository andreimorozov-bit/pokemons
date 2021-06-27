import Grid from '@material-ui/core/Grid';
import { PokemonDetail } from './types';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      maxWidth: '100%',
    },
    chip: {
      borderRadius: '3px',
      margin: '0.5rem',
      fontSize: '1.2rem',
      padding: '1.2rem 0',
      width: '7rem',
    },
  })
);

interface PokemonCardProps {
  data: PokemonDetail;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ data }) => {
  const classes = useStyles();
  const { name, pictureOfficial, height, weight, types } = data;
  return (
    <Fragment>
      <Grid item xs={12}>
        <img src={pictureOfficial} alt={name} className={classes.image} />
      </Grid>
      <Grid item xs={12}>
        {data.types.map((item) => {
          return (
            <Chip
              label={item.type.name}
              className={classes.chip}
              key={item.type.url}
            />
          );
        })}
      </Grid>
    </Fragment>
  );
};
