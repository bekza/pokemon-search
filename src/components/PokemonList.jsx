import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Spinner from './Spinner';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [maxCount, setMaxCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const fetchPokemonList = async (page) => {
    setIsLoading(true);

    const offset = (page - 1) * itemsPerPage;

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );
      const data = await response.json();

      setPokemonList((prev) => [...prev, ...data.results]);
      setMaxCount(data.count);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [currentPage]);

  const handleShowMore = () => {
    setCurrentPage((prev) => prev + 1);

    fetchPokemonList(currentPage + 1);
  };

  return (
    <div className='pa3'>
      <div className='flex flex-wrap justify-center'>
        {pokemonList.map((pokemon, index) => {
          const pokemonId = index + 1;
          const uniqueKey = pokemonId + index;
          return (
            <PokemonCard
              key={uniqueKey}
              name={pokemon.name}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
              pokemonId={pokemonId}
            />
          );
        })}
      </div>
      {isLoading && <Spinner />}
      {!isLoading && pokemonList.length !== maxCount && (
        <div className='flex justify-center'>
          <button
            onClick={handleShowMore}
            className='mt3 grow pa2 bg-light-green black br1 bn pointer'
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
