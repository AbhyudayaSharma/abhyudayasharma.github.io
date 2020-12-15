import React, { FunctionComponent } from 'react';

import '../scss/renderers.scss';

interface HeadingProps {
  level: number;
}

const Heading: FunctionComponent<HeadingProps> = ({ level, children }) => {
  if (level === 1) {
    console.warn('Heading level = 1 detected. Are you sure you want it?\n' +
      'Blog title is already an h1 element.');
  }
  return <h1 className={`md-h${level}`}>{children}</h1>;
};

export default Heading;
