import React from 'react';
import { range } from 'lodash';

import 'prism-themes/themes/prism-atom-dark.css';

import { MDXRenderer } from 'gatsby-plugin-mdx';
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

export interface MarkdownProps {
  markdown: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ markdown }) => {
  return (
    <MDXProvider components={components}>
      <MDXRenderer>
        {markdown}
      </MDXRenderer>
    </MDXProvider>
  );
};
