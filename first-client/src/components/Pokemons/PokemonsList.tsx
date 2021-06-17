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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

// const dummyIds: string[] = [];
// while (dummyIds.length < 40) {
//   const dummyId = Math.floor(Math.random() * 10220);
//   if (dummyId < 899 || (dummyId > 10001 && dummyId < 10220)) {
//     dummyIds.push(dummyId.toString());
//   }
// }

export const PokemonsList: React.FC = () => {
  const [pokemonsData, setPokemonsData] =
    useState<PokemonsListType | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(40);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    const fetchPokemonsList = async () => {
      const fetchedPokemonsData = await getPokemons(skip, limit);
      setPokemonsData(fetchedPokemonsData);
      setIsLoading(false);
    };
    fetchPokemonsList();
    window.scrollTo({
      top: 0,
    });
  }, [skip, limit]);

  const backHandler = () => {
    const newSkip = skip - limit;
    setSkip(newSkip >= 0 ? newSkip : 0);
    setIsLoading(true);
  };

  const nextHandler = () => {
    setSkip(skip + limit);
    setIsLoading(true);
  };

  return (
    <div className={classes.root}>
      {!isLoading && (
        <List>
          {pokemonsData?.pokemons.map((item) => {
            return (
              <Fragment key={item.id}>
                <PokemonListItem pokemon={item} key={item.id} />
              </Fragment>
            );
          })}

          <Button onClick={backHandler}>back</Button>
          <Button onClick={nextHandler}>next</Button>
        </List>
      )}
      {isLoading && <Typography variant='h5'>Loading...</Typography>}
    </div>
  );
};
