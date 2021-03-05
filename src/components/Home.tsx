import React from 'react';

import { Seo } from './Seo';
import { Footer } from './Footer';
import { BigButton } from './BigButton';
import packageJson from '../../package.json';

import { container, header, h1, body } from '../scss/Home.module.scss';

export interface HomeProps {
  readonly pageUrl: URL;
}

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

export const Home: React.FC<HomeProps> = ({ pageUrl }) => {
  return (
    <>
      <Seo url={pageUrl} />
      <div className={container}>
        <div className={header}>
          <h1 className={h1}>
            {packageJson.author.name}
          </h1>
        </div>
        <div className={body}>
          {buttons}
        </div>
        <Footer />
      </div>
    </>
  );
};
