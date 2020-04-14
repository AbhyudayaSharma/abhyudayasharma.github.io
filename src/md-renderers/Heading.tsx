import React, { FunctionComponent } from 'react';

import '../scss/renderers.scss';

interface HeadingProps {
  level: number;
  children: JSX.Element[];
}

const Heading: FunctionComponent<HeadingProps> = (props: HeadingProps) => {
  if (props.level === 1) {
    console.warn('Heading level = 1 detected. Are you sure you want it?\n' +
      'Blog title is already an h1 element.');
  }
  return <h1 className={`md-h${props.level}`}>{props.children}</h1>;
};

export default Heading;
