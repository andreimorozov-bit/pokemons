import { Fragment, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { PokemonListItem } from './PokemonsListItem';
import { PokemonType, PokemonsListType } from './types';
import { getPokemons } from '../../../api/pokemons';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { next, back, fetchPokemons } from './pokemonsListSlice';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
      marginRight: '1rem',
      height: '96px',
      width: '96px',
      borderRadius: '50%',
      backgroundColor: '#eee',
    },
    listItem: {},

    title: {
      backgroundColor: '#eee',
      width: '30%',
      height: '1.8rem',
      margin: '1rem 2rem',
    },
  })
);

export const PokemonsListSkeleton: React.FC = () => {
  const dummyArray = new Array(20).fill(0).map((item, index) => index);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        {dummyArray.map((item) => {
          return (
            <Fragment key={item}>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <div className={classes.avatar}></div>
                </ListItemAvatar>
                <ListItemText>
                  <div className={classes.title}></div>
                </ListItemText>
              </ListItem>
              <Divider variant='fullWidth' />
            </Fragment>
          );
        })}
      </List>
    </div>
  );
};
