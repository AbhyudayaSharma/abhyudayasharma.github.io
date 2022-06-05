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
        Text under <a href='https://creativecommons.org/licenses/by-nc-nd/4.0/' className={link}>
        CC-BY-NC-ND-4.0</a> • Source on <a href={repository.url} className={link}>GitHub</a>
        <br/>
        This page was built and deployed from the commit&nbsp;
        <a href={`${repository.url}/commit/${gitInfo.commit.hash}`} className={link}>
          <code>{gitInfo.commit.shortHash}</code>
        </a>
      </p>
    </footer>
  );
};
