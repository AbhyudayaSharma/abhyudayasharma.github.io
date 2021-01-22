import React from 'react';
import GitInfo from 'react-git-info/macro';
import { repository } from '../../package.json';

import '../scss/Footer.scss';

const gitInfo = GitInfo();

export const Footer: React.FC = () => {
  return (
    <footer className='Footer'>
      <p>
        This page was built and deployed from the commit&nbsp;
        <a href={`${repository.url}/commit/${gitInfo.commit.hash}`} className='Footer-link'>
          <code>{gitInfo.commit.shortHash}</code>
        </a>
        <br />
        Fork this repository on&nbsp;
        <a href={repository.url} className='Footer-link'>
          GitHub
        </a>
      </p>
    </footer>
  );
};
