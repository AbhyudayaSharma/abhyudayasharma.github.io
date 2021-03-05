import React from 'react';
import GitInfo from 'react-git-info/macro';
import packageJson from '../../package.json';

import { container, link } from '../scss/Footer.module.scss';

const gitInfo = GitInfo();

export const Footer: React.FC = () => {
  const { repository } = packageJson;
  return (
    <footer className={container}>
      <p>
        This page was built and deployed from the commit&nbsp;
        <a href={`${repository.url}/commit/${gitInfo.commit.hash}`} className={link}>
          <code>{gitInfo.commit.shortHash}</code>
        </a>
        <br />
        Fork this repository on&nbsp;
        <a href={repository.url} className={link}>
          GitHub
        </a>
      </p>
    </footer>
  );
};
