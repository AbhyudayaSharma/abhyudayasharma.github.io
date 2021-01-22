import React from 'react';

export const Blockquote: React.FC = ({ children }) => {
  return (
    <blockquote className='md-blockquote'>
      {children}
    </blockquote>
  );
};
