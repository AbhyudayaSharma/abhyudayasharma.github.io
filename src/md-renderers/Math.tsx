import React, { FunctionComponent } from 'react';
import Tex from '@matejmazur/react-katex';

import '../scss/renderers.scss';

interface MathProps {
  value: string;
}

const InlineMath: FunctionComponent<MathProps> = ({ value }) => (<Tex math={value}/>);
const BlockMath: FunctionComponent<MathProps> = ({ value }) => (<Tex math={value} block/>);

export { BlockMath, InlineMath };
