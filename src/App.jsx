import React from 'react';
import BigButton from './BigButton';
import './scss/App.scss';
import GitInfo from 'react-git-info/macro';

function App() {
  const gitInfo = GitInfo();
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='unselectable'>
          Abhyudaya Sharma
        </h1>
      </header>
      <div className="App-body">
        <BigButton text="GitHub" url="https://github.com/AbhyudayaSharma"/>
        <BigButton text="LinkedIn" url="https://www.linkedin.com/in/abhyudaya-sharma/"/>
      </div>
      <div className='App-footer unselectable'>
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
      </div>
    </div>
  );
}

export default App;
