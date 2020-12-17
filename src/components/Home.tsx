import React from 'react';
import { BigButton } from './BigButton';
import { Footer } from './Footer';
import { author } from '../../package.json';
import { Helmet } from 'react-helmet';

import '../scss/Home.scss';

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

export const Home: React.FC<{}> = () => {
  return (
    <div className="Home">
      <Helmet title={`${author.name}'s Personal Website and Blog`} defer={false} />
      <div className="Home-header">
        <h1 className='Home-h1'>
          {author.name}
        </h1>
      </div>
      <div className="Home-body">
        {buttons}
      </div>
      <Footer />
    </div>
  );
};
