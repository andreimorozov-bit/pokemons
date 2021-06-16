import React from 'react';

interface PokemonDetailProps {
  id: string;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ id }) => {
  return <div>Pokemon with id {id} and azaza</div>;
};
