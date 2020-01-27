import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
  const urls = ['/', '/blog', '/about'];
  for (let i = 0; i < urls.length; i++) {
    window.location = `/#${urls[i]}`;
  }
});
