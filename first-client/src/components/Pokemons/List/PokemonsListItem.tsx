import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { PokemonType } from './types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

interface PokemonListItemProps {
  pokemon: PokemonType;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    avatar: {
      marginRight: '1rem',
      height: '96px',
      width: '96px',
    },

    listItem: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  })
);

export const PokemonListItem: React.FC<PokemonListItemProps> = ({
  pokemon,
}) => {
  const classes = useStyles();
  const { id, pictureSmall } = pokemon;
  const name = pokemon.name.toUpperCase();

  return (
    <Fragment>
      <ListItem
        button
        component={Link}
        to={`/pokemons/${id}`}
        className={classes.listItem}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={pictureSmall} className={classes.avatar} />
        </ListItemAvatar>
        <ListItemText>
          <Typography variant='h6'>{name}</Typography>
        </ListItemText>
      </ListItem>
      <Divider variant='fullWidth' />
    </Fragment>
  );
};
