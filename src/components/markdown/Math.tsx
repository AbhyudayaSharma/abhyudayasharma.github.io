import React from 'react';
import Tex from '@matejmazur/react-katex';

interface MathProps {
  value: string;
}

const InlineMath: React.FC<MathProps> = ({ value }) => (<Tex math={value} />);
const BlockMath: React.FC<MathProps> = ({ value }) => (<Tex math={value} block />);

export { BlockMath, InlineMath };
