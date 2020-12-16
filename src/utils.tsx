import { PageProps } from 'gatsby';
import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import './scss/utils.scss';

/**
 * Wraps a top-level component between the header and the footer.
 */
export const wrapContent = (props: PageProps, element: JSX.Element | JSX.Element[]): JSX.Element => {
  return (
    <div className='wrap-container'>
      <Header {...props} />
      <div>
        { element }
      </div>
      <Footer />
    </div>
  );
};
