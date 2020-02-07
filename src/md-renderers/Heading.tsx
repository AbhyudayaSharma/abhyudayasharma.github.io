import React, { FunctionComponent } from 'react';

import '../scss/renderers.scss';

interface HeadingProps {
  level: number;
  children: JSX.Element[];
}

const Heading: FunctionComponent<HeadingProps> = (props: HeadingProps) => {
  // TODO: respect other heading levels too.
  return <h1 className='md-h1'>{props.children}</h1>;
};

export default Heading;
