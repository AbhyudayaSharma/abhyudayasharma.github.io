import React, { FunctionComponent } from 'react';

import '../scss/renderers.scss';

interface InlineCodeProps {
  value: string;
}

const InlineCode: FunctionComponent<InlineCodeProps> = ({ value }) => {
  return (
    <code className='md-inline-code'>
      {value}
    </code>
  );
};

export default InlineCode;
