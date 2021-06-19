import { configureStore } from '@reduxjs/toolkit';
import { pokemonsListSlice } from './components/Pokemons/pokemonsListSlice';

export const store = configureStore({
  reducer: {
    pokemonsList: pokemonsListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
