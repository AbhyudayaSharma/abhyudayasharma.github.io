import React from 'react';
import './css/App.sass';
import BigButton from "./BigButton";

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
      </div>
    </div>
  );
}

export default App;
