import { Fragment, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { PokemonListItem } from './PokemonsListItem';
import { PokemonType, PokemonsListType } from '../../models/types';
import { getPokemons } from '../../api/pokemons';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { next, back, fetchPokemons } from './pokemonsListSlice';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const PokemonsList: React.FC = () => {
  const { skip, limit, data, loading } = useTypedSelector(
    (state) => state.pokemonsList
  );
  const dispatch = useTypedDispatch();

  const classes = useStyles();

  useEffect(() => {
    const fetchPokemonsList = async () => {
      dispatch(fetchPokemons({ skip, limit }));
    };
    fetchPokemonsList();
    window.scrollTo({
      top: 0,
    });
  }, [skip, limit]);

  const backHandler = () => {
    if (skip > 0) {
      dispatch(back());
    }
  };

  const nextHandler = () => {
    dispatch(next());
  };

  return (
    <div className={classes.root}>
      {!loading && (
        <List>
          {data?.pokemons.map((item) => {
            return (
              <Fragment key={item.id}>
                <PokemonListItem pokemon={item} key={item.id} />
              </Fragment>
            );
          })}

          {skip > 0 ? <Button onClick={backHandler}>back</Button> : null}
          <Button onClick={nextHandler}>next</Button>
        </List>
      )}

      {loading && <Typography variant='h5'>Loading...</Typography>}
    </div>
  );
};
