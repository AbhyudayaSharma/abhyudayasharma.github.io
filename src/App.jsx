import React from 'react';
import BigButton from './BigButton';
import './scss/App.scss';
import GitInfo from 'react-git-info/macro';

function App() {
  const gitInfo = GitInfo();
  return (
    <div className="App">
      <div className="App-header">
        <h1 className='unselectable'>
          Abhyudaya Sharma
        </h1>
      </div>
      <div className="App-body">
        <BigButton text="GitHub" url="https://github.com/AbhyudayaSharma"/>
        <BigButton text="LinkedIn" url="https://www.linkedin.com/in/abhyudaya-sharma/"/>
      </div>
      <div className='App-footer unselectable'>
        <p>
          This page was built and deployed from the commit&nbsp;
          <a href={`https://github.com/AbhyudayaSharma/abhyudayasharma.github.io/commit/${gitInfo.commit.hash}`}
            className='App-link selectable'>
            <code>{gitInfo.commit.shortHash}</code>
          </a>
          <br/>
          Fork this repository on&nbsp;
          <a href='https://github.com/AbhyudayaSharma/abhyudayasharma.github.io' className='selectable App-link'>
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
