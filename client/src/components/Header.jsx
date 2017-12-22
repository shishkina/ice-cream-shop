import React from 'react';
import Dashboard from './Dashboard';

import { Link } from 'react-router-dom';

const Header = (props) => {
  console.log(props.userState);
  return (
    <header>
      <div className='logo'>
        Ice Cream Store!
      </div>
      <nav>
        <ul>
          {!props.userState.auth ?
            <div className="container">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </div>
            :
            <div className="container">
              <li><Dashboard user={props.userState.user}/></li>
              <li><Link to="/logout" onClick={props.logout}>Logout   </Link></li>
            </div>
          }
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
