import React, { FunctionComponent } from 'react';

interface LinkProps {
  href: string;
}

export const Link: FunctionComponent<LinkProps> = ({ href, children }) => {
  return (
    <a href={href} className='md-link'>
      {children}
    </a>
  );
};
