import React from 'react';
import { Link } from 'gatsby';

interface MdLinkProps {
  href: string;
}

export const MdLink: React.FC<MdLinkProps> = ({ href, children }) => {
  const className = 'md-link';

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
