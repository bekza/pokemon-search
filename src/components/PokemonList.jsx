import React, { useState, useEffect } from 'react';

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

  return <div>PokemonList</div>;
}

export default PokemonList;
