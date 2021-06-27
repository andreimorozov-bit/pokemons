import { useTypedSelector, useTypedDispatch } from '../../../hooks/reduxHooks';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { pageSizeChange } from './pokemonsListSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',

      '& button': {
        minWidth: '3rem',
        minHeight: '3rem',
      },
    },

    button: {
      color: '#777',
    },

    selected: {
      color: '#222',
    },
  })
);

export const PageSizeSelector: React.FC = () => {
  const classes = useStyles();
  const dispatch = useTypedDispatch();
  const { limit } = useTypedSelector((state) => state.pokemonsList);

  const pageSizeClick = (pageSize: number) => {
    dispatch(pageSizeChange(pageSize));
  };

  return (
    <div className={classes.root}>
      <Grid item xs={4}>
        <Button
          className={limit === 10 ? classes.selected : classes.button}
          onClick={() => pageSizeClick(10)}
        >
          10
        </Button>
        <Button
          className={limit === 20 ? classes.selected : classes.button}
          onClick={() => pageSizeClick(20)}
        >
          20
        </Button>
        <Button
          className={limit === 40 ? classes.selected : classes.button}
          onClick={() => pageSizeClick(40)}
        >
          40
        </Button>
      </Grid>
    </div>
  );
};
