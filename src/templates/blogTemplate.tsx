import React from 'react';
import { PageProps } from 'gatsby';

import { Seo } from '../components/Seo';
import { author } from '../../package.json';
import { Markdown } from '../components/Markdown';
import { formatDate } from '../utils/utils-common';
import { wrapContent } from '../utils/utils-react';
import { BlogContent } from '../common/BlogContent';

import '../scss/blogTemplate.scss';

interface Props extends PageProps {
  pageContext: BlogContent;
}

const BlogTemplate: React.FC<Props> = (props) => {
  const { body, frontmatter } = props.pageContext;
  return wrapContent(props,
    <>
      <Seo title={`${frontmatter.title} - ${author.name}'s blog`} metaDescription={frontmatter.description} />
      <article>
        <h1 className='Blog-title'>
          {frontmatter.title}
        </h1>
        <section>
          <p className='Blog-date'>
            <time>
              {formatDate(frontmatter.date)}
            </time>
          </p>
        </section>
        <section>
          <Markdown markdown={body} />
        </section>
      </article>
    </>, 'Blog-text');
};

export default BlogTemplate;
