import React, { FunctionComponent } from 'react';
import Tex from '@matejmazur/react-katex';

import '../scss/renderers.scss';

interface MathProps {
  value: string;
}

const InlineMathRenderer: FunctionComponent<MathProps> = (props: MathProps) => {
  return (
    <Tex math = {props.value}/>
  );
};

const BlockMathRenderer: FunctionComponent<MathProps> = (props: MathProps) => {
  return (
    <Tex math = {props.value} block />
  );
};

export { BlockMathRenderer, InlineMathRenderer };
