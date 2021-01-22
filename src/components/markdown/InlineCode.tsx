import React from 'react';

export const InlineCode: React.FC<{}> = ({ children }) => {
  return (
    <code className='md-inline-code'>
      {children}
    </code>
  );
};
