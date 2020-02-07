import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import packageJson from '../package.json';

import './scss/Header.scss';

export default class Header extends Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className='Header'>
        <div className='Header-title'>
          <h1 className='Header-h1'>
            <NavLink to='/' activeClassName='Header-link-hover'>
              {packageJson.author.name}
            </NavLink>
          </h1>
        </div>
        <div className='Header-links'>
          <h2 className='Header-h2'>
            <NavLink exact to='/' activeClassName='Header-link-selected'>
              Home
            </NavLink>
          </h2>
          <h2 className='Header-h2'>
            <NavLink exact to='/blog' activeClassName='Header-link-selected'>
              Blog
            </NavLink>
          </h2>
          <h2 className='Header-h2'>
            <NavLink exact to='/about' activeClassName='Header-link-selected'>
              About Me
            </NavLink>
          </h2>
        </div>
      </div>);
  }
}
