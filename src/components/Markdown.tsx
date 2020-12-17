import React from 'react';

import 'katex/dist/katex.min.css';
import '../scss/Markdown.scss';

import ReactMarkdown from 'react-markdown';
import { Code } from './Code';
import { Link } from './markdown/Link';
import { Image } from './markdown/Image';
import { Heading } from './markdown/Heading';
import { InlineCode } from './markdown/InlineCode';
import { Blockquote } from './markdown/Blockquote';
import { ThematicBreak } from './markdown/ThematicBreak';
import { BlockMath, InlineMath } from './markdown/Math';

const markdownRenderers = {
  heading: Heading,
  code: Code,
  image: Image,
  link: Link,
  math: BlockMath,
  inlineMath: InlineMath,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  thematicBreak: ThematicBreak,
};

const markdownPlugins = [
  require('remark-math'),
];

export interface MarkdownProps {
  markdown: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ markdown }) => {
  return <ReactMarkdown source={markdown} renderers={markdownRenderers} plugins={markdownPlugins} />;
};

//         <title>{`${this.state.blog.title} - ${author.name}'s blog`}</title>
//         Helmet>
//           der>
//             className='Blog-title'>{this.state.blog.title}</h1>
//             er>
//             on>
//             lassName='Blog-date'>
//           {this.state.blog.date.toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//           })}
//         </p>
//       </section>
//         <section role='document'>
//         </section>
//     </article>
//     );
// }
