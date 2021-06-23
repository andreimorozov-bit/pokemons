import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  getPokemons(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.pokemonsService.getPokemons(offset, limit, search);
  }

  @Get('search')
  getPokemonsBySearch(@Query('text') text: string) {
    return this.pokemonsService.getPokemonsBySearch(text);
  }

  @Get(':id')
  getPokemonById(@Param('id') id: string) {
    return this.pokemonsService.getPokemonById(id);
  }
}
