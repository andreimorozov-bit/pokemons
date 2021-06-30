import Grid from '@material-ui/core/Grid';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { PokemonCard } from './PokemonCard';
import { PokemonStats } from './PokemonStats';
import { useTypedSelector, useTypedDispatch } from '../../../hooks/reduxHooks';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { fetchPokemonById } from './pokemonDetailSlice';
import Typography from '@material-ui/core/Typography';
import { PokemonDetailSkeleton } from './PokemonDetailSkeleton';
import { PokemonAbilities } from './PokemonAbilities';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    typography: {
      textTransform: 'capitalize',
      marginBottom: '1rem',
    },
  })
);

interface PokemonDetailItemProps {
  id: string;
}

export const PokemonDetailItem: React.FC<PokemonDetailItemProps> = ({ id }) => {
  const { loading, data } = useTypedSelector((state) => state.pokemonDetail);
  const dispatch = useTypedDispatch();
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    const fetchPokemonDetail = async () => {
      dispatch(fetchPokemonById(id));
    };
    fetchPokemonDetail();
  }, [id, dispatch]);

  const handleBackClick = () => {
    history.push('/pokemons');
  };

  return (
    <Fragment>
      {!loading && data && (
        <Fragment>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography className={classes.typography} variant='h4'>
                {data.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={12} md={7}>
            <PokemonCard data={data} />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <PokemonStats data={data} />
            <PokemonAbilities data={data} />
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
        </Fragment>
      )}
      {loading && <PokemonDetailSkeleton id={id} />}
    </Fragment>
  );
};
