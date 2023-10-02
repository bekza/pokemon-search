import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  return <div>PokemonDetail here</div>;
}

export default PokemonDetail;
