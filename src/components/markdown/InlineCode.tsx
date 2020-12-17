import React from 'react';

export interface InlineCodeProps {
  value: string;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ value }) => {
  return (
    <code className='md-inline-code'>
      {value}
    </code>
  );
};
