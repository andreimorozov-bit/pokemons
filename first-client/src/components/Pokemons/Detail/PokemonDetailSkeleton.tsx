import Grid from '@material-ui/core/Grid';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Container from '@material-ui/core/Container';

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
    },
    title: {
      backgroundColor: '#eee',
      width: '30%',
      height: '1.7rem',
      margin: '1rem auto',
    },
    image: {
      backgroundColor: '#eee',
      width: '360px',
      height: '360px',
      margin: '1rem auto',
    },
    text: {
      backgroundColor: '#eee',
      width: '70%',
      height: '1.5rem',
      margin: '0.8rem auto',
    },
  })
);

interface PokemonDetailItemProps {
  id: string;
}

export const PokemonDetailSkeleton: React.FC<PokemonDetailItemProps> = ({
  id,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleBackClick = () => {
    history.push('/pokemons');
  };

  return (
    <Fragment>
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className={classes.title}></div>
          </Grid>
        </Grid>
        <Grid item sm={12} md={7}>
          <Container>
            <div className={classes.image}></div>
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <div className={classes.title}></div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className={classes.text} key={item}></div>
          ))}
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
    </Fragment>
  );
};
