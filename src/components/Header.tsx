import React, { FunctionComponent } from 'react';
import { PageProps } from 'gatsby';
import { author } from '../../package.json';

import './scss/Header.scss';

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

const Header: FunctionComponent<PageProps> = (props) => (
  <div className='Header'>
    <div className='Header-title'>
      <div className='Header-item'>
        <h1 className='Header-h1'>
          <a href='/'>
            {author.name}
          </a>
        </h1>
      </div>
    </div>
    <div className='Header-links'>
      {headerLinks.map((link, index) => (
        <div className={'Header-item'} key={index}>
          <h1 className='Header-h2'>
            {/* TODO: update logic so that it respects foo/link.url */}
            <a href={link.url} className={props.path === `${link.url}/` ? ' Header-link-selected' : null}>
              {link.title}
            </a>
          </h1>
        </div>))}
    </div>
  </div>);

export default Header;
