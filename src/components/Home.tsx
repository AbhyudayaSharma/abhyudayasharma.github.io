import React from 'react';
import { BigButton } from './BigButton';
import { Footer } from './Footer';
import { author } from '../../package.json';

import styles from '../scss/Home.module.scss';
import { Seo } from './Seo';

const links = [
  {
    text: 'Blog',
    url: '/blog',
  },
  {
    text: 'GitHub',
    url: 'https://github.com/AbhyudayaSharma',
  },
  {
    text: 'LinkedIn',
    url: 'https://www.linkedin.com/in/abhyudaya-sharma/',
  },
];

const buttons = links.map((link, index) => <BigButton key={index} {...link} />);

export const Home: React.FC = () => {
  return (
    <>
      <Seo/>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.h1}>
            {author.name}
          </h1>
        </div>
        <div className={styles.body}>
          {buttons}
        </div>
        <Footer/>
      </div>
    </>
  );
};
