import React from 'react';

import { Link } from 'gatsby';
import { link as className } from '../../scss/Markdown.module.scss';

interface MdLinkProps {
  href: string;
  children?: React.ReactNode;
}

export const MdLink: React.FC<MdLinkProps> = ({ href, children }) => {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};
