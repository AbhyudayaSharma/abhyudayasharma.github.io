import React, { Component } from 'react';
import BigButton from './BigButton';
import Footer from './Footer';
import packageJson from '../package.json';

import './scss/common.scss';
import './scss/Home.scss';

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
    const buttons = links.map((link, index) => <BigButton key={index} {...link}/>);

    return (
      <div className="Home">
        <div className="Home-header">
          <h1 className='Home-h1'>
            {packageJson.author.name}
          </h1>
        </div>
        <div className="Home-body">
          {buttons}
        </div>
        <div className='Home-footer unselectable'>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Home;
