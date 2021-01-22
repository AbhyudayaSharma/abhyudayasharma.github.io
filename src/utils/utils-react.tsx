import React from 'react';
import { PageProps } from 'gatsby';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../scss/utils.scss';

/**
 * Wraps a top-level component between the header and the footer.
 */
export const wrapContent = (props: PageProps, element: JSX.Element | JSX.Element[], divClassName: string | undefined = undefined): JSX.Element => {
  return (
    <div className='wrap-container'>
      <Header {...props}>
        {undefined}
      </Header>
      <div className={divClassName}>
        {element}
      </div>
      <Footer />
    </div>
  );
};
