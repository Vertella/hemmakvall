import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-theaterBlack text-lightGray flex justify-between items-center px-6 py-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <h1 className="text-2xl font-bold flex items-center">🎬 Hemmakvälls Filmbibliotek</h1>
      <div className="space-x-4">
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            isActive ? "text-theaterRed border-b-2 border-theaterRed"
          : "hover:text-theaterRed"
        }
        >
          Home
        </NavLink>
        <NavLink 
          to="/favorites" 
          className={({ isActive }) => 
            isActive
                ? "text-theaterRed border-b-2 border-theaterRed"
                : "hover:text-theaterRed"
            }
        >
          Favorites
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
