import React from 'react';

import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <div className='logo'>
        Thundercats Ice Cream!
      </div>
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
