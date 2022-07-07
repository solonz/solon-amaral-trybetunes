import React from 'react';
import { NavLink } from 'react-router-dom';
// https://dev.to/yunweneric/implementing-react-routes-part-2-link-vs-navlink-5d6e

class Nav extends React.Component {
  render() {
    return (
      <div data-testid="page-nav">
        <ul>
          <li>
            <NavLink data-testid="link-to-search" to="/search">
              Search
            </NavLink>

          </li>
          <li>
            <NavLink data-testid="link-to-favorites" to="/favorites">
              Favorites
            </NavLink>

          </li>
          <li>
            <NavLink data-testid="link-to-profile" to="/profile">
              Profile
            </NavLink>

          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
