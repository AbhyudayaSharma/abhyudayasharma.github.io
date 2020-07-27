import React from 'react';
import { render, hydrate } from 'react-dom';
import 'whatwg-fetch';

import './scss/index.scss';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement || rootElement.tagName !== 'DIV') {
  throw Error('Document should contain a div element with id=`root`.');
}

if (rootElement.hasChildNodes()) {
  hydrate(<App/>, rootElement);
} else {
  render(<App/>, rootElement);
}
