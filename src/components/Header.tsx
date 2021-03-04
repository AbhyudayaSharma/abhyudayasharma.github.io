import React, { FunctionComponent } from 'react';
import { Link, PageProps } from 'gatsby';
import packageJson from '../../package.json';

import * as styles from '../scss/Header.module.scss';

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

export const Header: FunctionComponent<PageProps> = () => (
  <div className={styles.container}>
    <div className={styles.title}>
      <Link to='/'>
        {packageJson.author.name}
      </Link>
    </div>
    <div className={styles.links}>
      {headerLinks.map((link, index) => (
        <Link to={link.url} key={index} activeClassName={styles.itemActive} className={styles.item}>
          {link.title}
        </Link>
      ))}
    </div>
  </div>);
