import React from 'react';
import { PageProps } from 'gatsby';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { wrapContainer } from '../scss/utils.module.scss';

/**
 * Wraps a top-level component between the header and the footer.
 */
export const wrapContent = (props: PageProps, element: JSX.Element | JSX.Element[], divClassName: string | undefined = undefined): JSX.Element => {
  return (
    <div className={wrapContainer}>
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
