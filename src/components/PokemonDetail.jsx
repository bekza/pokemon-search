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

  const Profile = ({ pokemon, pokemonSpecies }) => {
    const ProfileItem = ({ label, value }) => {
      return (
        <p>
          <span className='b'>{label}</span> {value}
        </p>
      );
    };

    const profileData = [
      { label: 'Height', value: `${pokemon.height}ft` },
      { label: 'Weight', value: `${pokemon.weight}lbs` },
      { label: 'Color', value: pokemonSpecies.color.name },
      { label: 'Habitat', value: pokemonSpecies?.habitat?.name || 'N/A' },
      { label: 'Base Experience', value: pokemon?.base_experience || 'N/A' },
      { label: 'Base Happines', value: pokemonSpecies?.base_happiness },
    ];
    return (
      <div className='w-100 w-30-l pa0'>
        <h4 className='b dark-blue'>PROFILE</h4>
        {profileData.map(({ label, value }, index) => {
          return <ProfileItem key={index} label={label} value={value} />;
        })}
      </div>
    );
  };

  const Specs = ({ pokemon, pokemonSpecies }) => {
    return (
      <div className='w-100 w-70-l pa0'>
        <h4 className='b dark-blue'>SPECS</h4>
        <p>
          <b>Egg Groups:</b>{' '}
          {pokemonSpecies.egg_groups.map((item, index) => {
            return (
              <span key={item.name + index}>
                <button className='mr1 bn pa1 bg-lightest-blue dark-gray br1'>
                  {item.name}
                </button>
              </span>
            );
          })}
        </p>
        <p>
          <b>Types:</b>{' '}
          {pokemon.types.map((item, index) => {
            return (
              <span key={item.type.name + index}>
                <button className='mr1 bn pa1 bg-washed-red black br1'>
                  {item.type.name}
                </button>
              </span>
            );
          })}
        </p>
        <p>
          <b>Abilities:</b>{' '}
          {pokemon.abilities.map((item, index) => {
            return (
              <span key={item.ability.name + index}>
                <button className='mr1 bn pa1 bg-washed-green br1'>
                  {item.ability.name}
                </button>
              </span>
            );
          })}
        </p>
      </div>
    );
  };

  const Stats = () => {
    const baseStats = pokemon.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    }));

    const maxStatValue = Math.max(...baseStats.map((stat) => stat.value));
    return (
      <>
        <p className='b dark-blue'>STATS</p>
        {baseStats.map((stat) => {
          return (
            <div key={stat.name} className='mb2'>
              <div className='flex items-center'>
                <div className='w-20'>
                  <b>{stat.name}</b>
                </div>
                <div className='w-80 bg-light-gray'>
                  <div
                    className='bg-blue flex justify-end items-center white b--dashed b--gray'
                    style={{
                      width: `${(stat.value / maxStatValue) * 100}%`,
                      height: '25px',
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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

        <main className='w-100 w-70-l pa3'>
          <NameAndFlavor
            name={pokemon.name}
            flavor={pokemonSpecies.flavor_text_entries[0].flavor_text}
          />

          <div className='flex flex-wrap justify-center items-start w-70-l w-100'>
            <Profile pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
            <Specs pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
          </div>
          <Stats />
        </main>
      </div>
    </div>
  );
}

export default PokemonDetail;
