import React from 'react';
import { range } from 'lodash';

import 'prism-themes/themes/prism-atom-dark.css';

import { MDXProvider } from '@mdx-js/react';

import { MdLink } from './markdown/MdLink';
import { getHeadingComponent } from './markdown/Heading';
import { Blockquote } from './markdown/Blockquote';
import { ThematicBreak } from './markdown/ThematicBreak';

// TODO remove `any` by creating type definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<string, React.ComponentType<any>> = {
  a: MdLink,
  blockquote: Blockquote,
  thematicBreak: ThematicBreak,
  hr: ThematicBreak,
};

range(1, 6 + 1).forEach(i => { components[`h${i}`] = getHeadingComponent(i); });

export const Markdown: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
};
