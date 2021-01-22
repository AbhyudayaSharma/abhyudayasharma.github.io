import React from 'react';
import { PageProps, useStaticQuery, graphql } from 'gatsby';

import { Seo } from '../components/Seo';
import { wrapContent } from '../utils/utils-react';
import { validateBlogFrontmatter } from '../utils/utils-common';
import { BlogFrontmatterQueryResult } from '../common/BlogFrontmatterQueryResult';
import { BlogListEntry } from '../components/BlogListEntry';

import { author } from '../../package.json';

const convertBlogFormatterQueryResultToBlogList = (result: BlogFrontmatterQueryResult): JSX.Element[] => {
  return result.edges
    .map(edge => edge.node.frontmatter)
    .filter(frontmatter => frontmatter.isPublic)
    .map((frontmatter, index) =>
      <BlogListEntry {...(validateBlogFrontmatter(frontmatter))} key={index} />
    );
};

const BlogListRoute: React.FC<PageProps> = (props) => {
  const data = useStaticQuery(graphql`
    query BlogFrontmatter {
      allMdx(sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            frontmatter {
              slug
              title
              date
              tags
              description
              isPublic
            }
          }
        }
      }
    }`
  ).allMdx as BlogFrontmatterQueryResult;
  return (
    <>
      <Seo title={`${author.name}'s Blog`} />
      {wrapContent(props, convertBlogFormatterQueryResultToBlogList(data))}
    </>
  );
};

export default BlogListRoute;
