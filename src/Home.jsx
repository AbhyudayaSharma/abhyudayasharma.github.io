import React, { Component } from 'react';
import BigButton from './BigButton';
import GitInfo from 'react-git-info/macro';
import packageJson from '../package.json';

import './scss/common.scss';
import './scss/App.scss';

const links = [
  {
    text: 'GitHub',
    url: 'https://github.com/AbhyudayaSharma',
  },
  {
    text: 'LinkedIn',
    url: 'https://www.linkedin.com/in/abhyudaya-sharma/',
  },
];

class Home extends Component {
  render() {
    const gitInfo = GitInfo();
    const buttons = links.map((link, index) => <BigButton key={index} {...link}/>);

    return (
      <div className="App">
        <div className="App-header">
          <h1 className='unselectable'>
            {packageJson.author.name}
          </h1>
        </div>
        <div className="App-body">
          {buttons}
        </div>
        <div className='App-footer unselectable'>
          <p>
            This page was built and deployed from the commit&nbsp;
            <a href={`${packageJson.repository.url}/commit/${gitInfo.commit.hash}`}
              className='App-link selectable'>
              <code>{gitInfo.commit.shortHash}</code>
            </a>
            <br/>
            Fork this repository on&nbsp;
            <a href={packageJson.repository.url} className='selectable App-link'>
              GitHub
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
