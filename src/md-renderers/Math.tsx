import React, { FunctionComponent } from 'react';
import { InlineMath, BlockMath } from 'react-katex';

import '../scss/renderers.scss';

interface MathProps {
  value: string;
}

const InlineMathRenderer: FunctionComponent<MathProps> = (props: MathProps) => {
  return (
    <InlineMath math = {props.value}/>
  );
};

const BlockMathRenderer: FunctionComponent<MathProps> = (props: MathProps) => {
  return (
    <BlockMath math = {props.value}/>
  );
};

export { BlockMathRenderer, InlineMathRenderer };
