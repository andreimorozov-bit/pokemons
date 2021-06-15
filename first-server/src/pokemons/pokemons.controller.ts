import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  getAllPokemons(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    return this.pokemonsService.getAllPokemons(offset, limit);
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
