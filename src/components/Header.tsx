import React from 'react';
import packageJson from '../../package.json';

import { Link, PageProps } from 'gatsby';
import { container, title, links, itemActive, item } from '../scss/Header.module.scss';

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
  },
];

export const Header: React.FC<PageProps> = () => (
  <div className={container}>
    <div className={title}>
      <Link to='/'>
        {packageJson.author.name}
      </Link>
    </div>
    <div className={links}>
      {headerLinks.map((link, index) => (
        <Link to={link.url} key={index} activeClassName={itemActive} className={item}>
          {link.title}
        </Link>
      ))}
    </div>
  </div>);
