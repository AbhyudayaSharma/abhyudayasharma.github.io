import React, { FunctionComponent } from 'react';

import '../scss/renderers.scss';

interface CodeProps {
  value: string;
  language: string;
}

const Code: FunctionComponent<CodeProps> = (props: CodeProps) => {
  console.log(props);
  return (
    // <div>
    <pre className='md-code'>
      <code>{props.value}</code>
    </pre>
    // </div>
  );
};

export default Code;
