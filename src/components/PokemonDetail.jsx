import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from './Spinner';
import NotFoundPage from '../pages/NotFoundPage';

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpeices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pokemon && pokemonSpecies) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);

        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();

        setPokemon(pokemonData);
        setPokemonSpeices(speciesData);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!pokemon || !pokemonSpecies) {
    return <NotFoundPage />;
  }

  const PrimaryBtn = ({ text }) => {
    return (
      <button className='bg-blue white hover-bg-dark-blue hover-white pointer bn pa2 br2'>
        {text}
      </button>
    );
  };

  const PokemonImg = ({ id, name }) => {
    return (
      <div className='w-100 w-30-l tc mb3'>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={name}
        />
      </div>
    );
  };

  const NameAndFlavor = ({ name, flavor }) => {
    return (
      <>
        <h2 className='ma0 b'>
          {name.toUpperCase()} #{pokemon.id}
        </h2>
        <span className='dark-gray'>{flavor}</span>
      </>
    );
  };

  return (
    <div className='pa3'>
      <Link to='/'>
        <PrimaryBtn text='Go back' />
      </Link>
      <div className='flex flex-wrap justify-center'>
        <PokemonImg id={id} name={pokemon.name} />

        <main>
          <NameAndFlavor
            name={pokemon.name}
            flavor={pokemonSpecies.flavor_text_entries[0].flavor_text}
          />
        </main>
      </div>
    </div>
  );
}

export default PokemonDetail;
