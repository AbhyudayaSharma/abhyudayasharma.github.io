import React, { FunctionComponent } from 'react';
import { Link, PageProps } from 'gatsby';
import { author } from '../../package.json';

import styles from '../scss/Header.module.scss';

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
  <div className={styles.container}>
    <Link to='/' className={styles.title}>
      {author.name}
    </Link>
    <div className={styles.links}>
      {headerLinks.map((link, index) => (
        <Link to={link.url} key={index} activeClassName={styles.itemActive} className={styles.item}>
          {link.title}
        </Link>
      ))}
    </div>
  </div>);
