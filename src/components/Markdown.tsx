import _ from 'lodash';
import React from 'react';

import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import Code from './Code';
import { MdLink } from './markdown/MdLink';
import { getHeadingComponent } from './markdown/Heading';
import { InlineCode } from './markdown/InlineCode';
import { Blockquote } from './markdown/Blockquote';
import { ThematicBreak } from './markdown/ThematicBreak';

// TODO remove `any` by creating type definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<string, React.ComponentType<any>> = {
  a: MdLink,
  code: Code,
  pre: ({ children }) => <>{children}</>,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  thematicBreak: ThematicBreak,
  hr: ThematicBreak,
};

components.pre.displayName = 'Markdown >> pre';

_.range(1, 6 + 1).forEach(i => { components[`h${i}`] = getHeadingComponent(i); });

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
