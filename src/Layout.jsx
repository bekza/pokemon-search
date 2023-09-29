import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logo from './components/Logo.jsx';

function Layout() {
  return (
    <div className='flex flex-column min-h-screen'>
      <header>
        <nav>
          <Link to='/' className='no-underline'>
            <Logo />
          </Link>
        </nav>
      </header>
      <main className='flex-grow'>
        <Outlet />
      </main>
      <footer className='flex justify-start pa4 bg-light-gray'>
        <a className='no-underline gray' href='#'>
          Pokémon {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  );
}

export default Layout;
