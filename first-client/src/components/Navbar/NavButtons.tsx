import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { searchChange } from '../Pokemons/List/pokemonsListSlice';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: 0,
    },
  },

  buttonGroup: {
    flexGrow: 1,
    width: '100%',
    margin: '0 0',
  },
  input: {
    border: '1px solid #ddd',
    margin: '1rem 0px',
    width: '95%',
  },
  button: {
    color: theme.palette.primary.main,
    marginBottom: '1rem',
  },
}));

export default function NavButtons() {
  const history = useHistory();
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState<string>('');
  const search = useTypedSelector((state) => state.pokemonsList.search);
  const dispatch = useTypedDispatch();

  const onSearchClick = () => {
    if (searchInput.length > 0) {
      dispatch(searchChange(searchInput.trim().toLowerCase()));
      setSearchInput('');
      history.push('/pokemons');
    }
  };

  const onResetClick = () => {
    setSearchInput('');
    dispatch(searchChange(''));
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
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
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <InputBase
            className={classes.input}
            placeholder='Pokemon Name'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput.length > 0 && (
            <Button className={classes.button} onClick={onSearchClick}>
              <SearchIcon />
              search
            </Button>
          )}
          {search.length > 0 && (
            <Button className={classes.button} onClick={onResetClick}>
              reset
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
