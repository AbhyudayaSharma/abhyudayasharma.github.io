import React, { FunctionComponent } from 'react';

import '../scss/renderers.scss';

interface LinkProps {
  href: string;
}

const Link: FunctionComponent<LinkProps> = ({ href, children }) => {
  return (
    <a href={href} className='md-link'>
      {children}
    </a>
  );
};

export default Link;
