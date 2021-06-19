import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { PokemonsListType } from '../../models/types';
import type { PokemonType } from '../../models/types';
import { getPokemons } from '../../api/pokemons';

interface PokemonsListState {
  skip: number;
  limit: number;
  data: PokemonsListType;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: PokemonsListState = {
  skip: 0,
  limit: 20,
  loading: false,
  error: null,
  data: {
    count: 0,
    next: null,
    previous: null,
    pokemons: [],
  },
};

interface PageData {
  skip: number;
  limit: number;
}

export const fetchPokemons = createAsyncThunk(
  'pokemonsList/fetchPokemonsStatus',
  async (pageData: PageData) => {
    const response = await getPokemons(pageData);
    return response;
  }
);

export const pokemonsListSlice = createSlice({
  name: 'pokemonsList',
  initialState,
  reducers: {
    next: (state) => {
      state.skip += state.limit;
    },
    back: (state) => {
      const newSkip = state.skip - state.limit;
      state.skip = newSkip >= 0 ? newSkip : 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    });
    builder.addCase(fetchPokemons.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { next, back } = pokemonsListSlice.actions;

export const selectSkip = (state: RootState) => state.pokemonsList.skip;

export default pokemonsListSlice.reducer;
