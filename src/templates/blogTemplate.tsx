import React from 'react';
import { PageProps } from 'gatsby';

import { Seo } from '../components/Seo';
import { author } from '../../package.json';
import { Markdown } from '../components/Markdown';
import { wrapContent } from '../utils/utils-react';
import { BlogContent } from '../common/BlogContent';
import { formatDate, getPageUrl } from '../utils/utils-common';

import styles from '../scss/blogTemplate.module.scss';

interface Props extends PageProps {
  pageContext: BlogContent;
}

const BlogTemplate: React.FC<Props> = (props) => {
  const { body, frontmatter } = props.pageContext;
  return wrapContent(props,
    <>
      <Seo
        pageType='article'
        url={getPageUrl(props)}
        title={`${frontmatter.title} - ${author.name}'s blog`}
        metaDescription={frontmatter.description} />
      <article>
        <h1 className={styles.title}>
          {frontmatter.title}
        </h1>
        <section>
          <p className={styles.date}>
            <time>
              {formatDate(frontmatter.date)}
            </time>
          </p>
        </section>
        <section>
          <Markdown markdown={body} />
        </section>
      </article>
    </>, styles.text);
};

export default BlogTemplate;
