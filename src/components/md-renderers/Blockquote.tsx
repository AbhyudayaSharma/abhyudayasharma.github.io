import React, { FunctionComponent } from 'react';

const Blockquote: FunctionComponent = ({ children }) => {
  return (
    <blockquote className='md-blockquote'>
      {children}
    </blockquote>
  );
};

export default Blockquote;
