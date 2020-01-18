import React from 'react';
import BigButton from './BigButton';
import './scss/App.scss';
import GitInfo from 'react-git-info/macro';

function App() {
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
        {console.log(GitInfo())}
      </div>
    </div>
  );
}

export default App;
