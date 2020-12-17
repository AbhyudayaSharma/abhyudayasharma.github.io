import React, { FunctionComponent } from 'react';
import { Link, PageProps } from 'gatsby';
import { author } from '../../package.json';

import '../scss/Header.scss';

const headerLinks = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Blog',
    url: '/blog',
  },
  {
    title: 'About Me',
    url: '/about',
  }
];

export const Header: FunctionComponent<PageProps> = () => (
  <div className='Header'>
    <div className='Header-title'>
      <div className='Header-item'>
        <h1 className='Header-h1'>
          <Link to='/'>
            {author.name}
          </Link>
        </h1>
      </div>
    </div>
    <div className='Header-links'>
      {headerLinks.map((link, index) => (
        <div className={'Header-item'} key={index}>
          <h1 className='Header-h2'>
            <Link to={link.url} activeClassName='Header-link-selected'>
              {link.title}
            </Link>
          </h1>
        </div>))}
    </div>
  </div>);
