import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import type { PokemonsListType } from './types';
import type { PokemonType } from './types';
import { getPokemons } from '../../../api/pokemons';

interface PokemonsListState {
  skip: number;
  limit: number;
  search: string;
  data: PokemonsListType | null;
  loading: boolean;
  error: string | null | undefined;
  count: number;
}

const initialState: PokemonsListState = {
  skip: 0,
  limit: 20,
  search: '',
  loading: false,
  error: null,
  count: 0,
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
  search: string;
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
    pageChange: (state, action) => {
      state.skip = action.payload;
    },
    searchChange: (state, action) => {
      state.skip = 0;
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.count = payload.count;
      state.loading = false;
    });
    builder.addCase(fetchPokemons.pending, (state, action) => {
      state.loading = true;
      state.data = null;
    });
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { next, back, pageChange, searchChange } =
  pokemonsListSlice.actions;

export const selectSkip = (state: RootState) => state.pokemonsList.skip;

export default pokemonsListSlice.reducer;
