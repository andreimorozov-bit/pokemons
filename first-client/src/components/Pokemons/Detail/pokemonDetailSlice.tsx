import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import { getPokemonById } from '../../../api/pokemons';
import { PokemonDetail, Stat, Ability, PokemonType } from './types';

interface PokemonDetailState {
  loading: boolean;
  error: string | null | undefined | SerializedError;
  data: PokemonDetail | null;
}

const initialState: PokemonDetailState = {
  loading: false,
  error: null,
  data: {
    id: '',
    height: 0,
    name: '',
    weight: 0,
    baseExperience: 0,
    types: [],
    pictureOfficial: '',
    stats: [],
    abilities: [],
  },
};

export const fetchPokemonById = createAsyncThunk(
  'pokemonDetail/fetchPokemonStatus',
  async (id: string) => {
    const response = await getPokemonById(id);
    return response;
  }
);

export const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonById.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchPokemonById.pending, (state, action) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(fetchPokemonById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default pokemonDetailSlice.reducer;
