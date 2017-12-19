import React from 'react';

import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <div className='logo'>
        Ice Cream Store!
      </div>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/ice-cream">Ice Cream</Link></li>
          <li><Link to="/new">Add Another</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
