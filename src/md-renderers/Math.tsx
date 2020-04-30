import React, { FunctionComponent } from 'react';
import Tex from '@matejmazur/react-katex';

import '../scss/renderers.scss';

interface MathProps {
  value: string;
}

const InlineMath: FunctionComponent<MathProps> = (props: MathProps) => {
  return (
    <Tex math = {props.value}/>
  );
};

const BlockMath: FunctionComponent<MathProps> = (props: MathProps) => {
  return (
    <Tex math = {props.value} block />
  );
};

export { BlockMath, InlineMath };
