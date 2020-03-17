import React, { Component } from 'react';
import GitInfo from 'react-git-info/macro';
import packageJson from '../package.json';

import './scss/Footer.scss';

const gitInfo = GitInfo();

class Footer extends Component {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <footer className='Footer'>
        <p>
          This page was built and deployed from the commit&nbsp;
          <a href={`${packageJson.repository.url}/commit/${gitInfo.commit.hash}`} className='Footer-link'>
            <code>{gitInfo.commit.shortHash}</code>
          </a>
          <br/>
          Fork this repository on&nbsp;
          <a href={packageJson.repository.url} className='Footer-link'>
            GitHub
          </a>
        </p>
      </footer>
    );
  }
}

export default Footer;
