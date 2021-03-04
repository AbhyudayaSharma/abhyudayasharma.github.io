import React from 'react';

import { inlineCode } from '../../scss/Markdown.module.scss';

export const InlineCode: React.FC = ({ children }) => {
  return (
    <code className={inlineCode}>
      {children}
    </code>
  );
};
