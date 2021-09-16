import React from 'react';
import { PageProps } from 'gatsby';

import packageJson from '../../package.json';
import { Seo } from '../components/Seo';
import { Markdown } from '../components/Markdown';
import { DateComponent, wrapContent } from '../utils/utils-react';
import { getPageUrl, Jsonified } from '../utils/utils-common';

import { date as dateClass, text as textClass, title as titleClass } from '../scss/blogTemplate.module.scss';
import { Blog } from '../common/Blog';
import { toValidBlogFrontmatter } from '../common/BlogFrontmatter';

type PropsType = PageProps<Record<string, unknown>, Jsonified<Required<Blog>>>;

const BlogTemplate: React.FC<PropsType> = (props) => {
  const frontmatter = toValidBlogFrontmatter(props.pageContext.frontmatter);
  if (frontmatter.externalUrl) {
    throw new Error(`Trying to generate blog with non-null externalUrl: ${frontmatter.externalUrl}`);
  }

  return wrapContent(props, <>
    <Seo
      pageType="article"
      url={getPageUrl(props)}
      title={`${frontmatter.title} - ${packageJson.author.name}'s blog`}
      metaDescription={frontmatter.description}/>
    <article>
      <h1 className={titleClass}>
        {frontmatter.title}
      </h1>
      <p className={dateClass}>
        <DateComponent date={frontmatter.date}/>
      </p>
      <Markdown markdown={props.pageContext.body}/>
    </article>
  </>, textClass);
};

export default BlogTemplate;
