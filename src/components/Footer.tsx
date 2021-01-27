import React from 'react';
import GitInfo from 'react-git-info/macro';
import { repository } from '../../package.json';

import styles from '../scss/Footer.module.scss';

const gitInfo = GitInfo();

export const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <p>
        This page was built and deployed from the commit&nbsp;
        <a href={`${repository.url}/commit/${gitInfo.commit.hash}`} className={styles.link}>
          <code>{gitInfo.commit.shortHash}</code>
        </a>
        <br />
        Fork this repository on&nbsp;
        <a href={repository.url} className={styles.link}>
          GitHub
        </a>
      </p>
    </footer>
  );
};
