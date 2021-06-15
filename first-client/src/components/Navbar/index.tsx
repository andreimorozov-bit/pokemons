import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import {
  List,
  ListItem,
  Menu,
  MenuList,
  MenuItem,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer variant='permanent'>
        <MenuList>
          <MenuItem>
            <NavLink to='/'>Pokemons</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to='/berries'>Berries</NavLink>
          </MenuItem>
        </MenuList>
      </Drawer>
    </div>
  );
}
