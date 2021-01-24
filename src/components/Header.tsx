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
        <Link to='/' className='Header-h1'>
          {author.name}
        </Link>
      </div>
    </div>
    <div className='Header-links'>
      {headerLinks.map((link, index) => (
        <div className={'Header-item'} key={index}>
          <Link to={link.url} activeClassName='Header-link-selected' className='Header-h2'>
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  </div>);
