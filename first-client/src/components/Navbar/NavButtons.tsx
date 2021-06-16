import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: 0,
    },
  },

  buttonGroup: {
    flexGrow: 1,
  },
}));

export default function NavButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='vertical primary button group'
        className={classes.buttonGroup}
      >
        <Button component={NavLink} to='/'>
          Pokemons
        </Button>

        <Button component={NavLink} to='/berries'>
          Berries
        </Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  );
}
