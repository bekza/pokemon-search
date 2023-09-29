import React from 'react';

const logoStyles = {
  fontSize: '2rem',
  letterSpacing: '0.1rem',
  textTransform: 'uppercase',
};

function Logo() {
  return (
    <h2 className='bg-blue white pa3 shadow-2 ma0' style={logoStyles}>
      Pokémon
    </h2>
  );
}

export default Logo;
