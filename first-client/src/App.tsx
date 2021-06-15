import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Pokemons } from './pages/pokemons';
import { Berries } from './pages/berries';
import { Navbar } from './components/Navbar';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Router>
      <Container maxWidth='sm'>
        <div className='App'>dd</div>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Pokemons />
          </Route>
          <Route path='/berries'>
            <Berries />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
