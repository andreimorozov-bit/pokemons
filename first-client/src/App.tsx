import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { PokemonsPage } from './pages/pokemons';
import { BerriesPage } from './pages/berries';
import Navbar from './components/Navbar';
import TopAppBar from './components/TopAppBar';
import { PokemonDetailPage } from './pages/pokemons/Detail';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Container maxWidth='md'>
            <div className={classes.root}>
              <TopAppBar />
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <Navbar />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Switch>
                    <Route path='/' exact>
                      <PokemonsPage />
                    </Route>
                    <Route path='/pokemons' exact>
                      <PokemonsPage />
                    </Route>
                    <Route path='/pokemons/:id' exact>
                      <PokemonDetailPage />
                    </Route>
                    <Route path='/berries' exact>
                      <BerriesPage />
                    </Route>
                  </Switch>
                </Grid>
              </Grid>
            </div>
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
