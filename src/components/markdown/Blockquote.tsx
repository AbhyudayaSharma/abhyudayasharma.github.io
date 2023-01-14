import React from 'react';

import { blockquote } from '../../scss/Markdown.module.scss';

export const Blockquote: React.FC<{ children?: React.ReactNode}> = ({ children }) => {
  return (
    <blockquote className={blockquote}>
      {children}
    </blockquote>
  );
};
