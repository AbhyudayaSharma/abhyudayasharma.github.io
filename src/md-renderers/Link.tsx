import React, { FunctionComponent } from 'react';

import '../scss/renderers.scss';

interface LinkProps {
  href: string;
  children: JSX.Element[];
}

const Link: FunctionComponent<LinkProps> = (props: LinkProps) => {
  console.log(props);
  return (
    <a href={props.href} className='md-link'>
      {props.children}
    </a>
  );
};

export default Link;
