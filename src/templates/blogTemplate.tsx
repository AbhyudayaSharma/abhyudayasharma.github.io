import React from 'react';
import { Helmet } from 'react-helmet';
import { PageProps } from 'gatsby';

import { author } from '../../package.json';
import { Markdown } from '../components/Markdown';
import { UnsafeBlogContent } from '../common/BlogContent';
import { formatDate } from '../utils/utils-common';
import { wrapContent } from '../utils/utils-react';

import '../scss/blogTemplate.scss';

interface Props extends PageProps {
  pageContext: UnsafeBlogContent;
}

const BlogTemplate: React.FC<Props> = (props) => {
  const { pageContext } = props;
  const { rawMarkdownBody, metadata } = pageContext;
  return wrapContent(props,
    <>
      <Helmet title={`${metadata.title} - ${author.name}'s blog`} />
      <article>
        <h1 className='Blog-title'>
          {metadata.title}
        </h1>
        <section>
          <p className='Blog-date'>
            <time>
              {formatDate(new Date(metadata.date))}
            </time>
          </p>
        </section>
        <section>
          <Markdown markdown={rawMarkdownBody} />
        </section>
      </article>
    </>, 'Blog-text');
};

export default BlogTemplate;
