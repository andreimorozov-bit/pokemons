import { configureStore } from '@reduxjs/toolkit';
import { pokemonDetailSlice } from './components/Pokemons/Detail/pokemonDetailSlice';
import { pokemonsListSlice } from './components/Pokemons/List/pokemonsListSlice';

export const store = configureStore({
  reducer: {
    pokemonsList: pokemonsListSlice.reducer,
    pokemonDetail: pokemonDetailSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
