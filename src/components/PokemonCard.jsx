import React from 'react';
import { Link } from 'react-router-dom';

function PokemonCard({ pokemonId, name, image }) {
  return (
    <div className='fl w-50 w-20-l pa2'>
      <Link to={`/pokemon/${pokemonId}`} className='no-underline black'>
        <div className='bg-light-green tc pa3 br3 grow'>
          <img src={image} alt={name} height='200px' />
          <h3>{name.toUpperCase()}</h3>
        </div>
      </Link>
    </div>
  );
}

export default PokemonCard;
