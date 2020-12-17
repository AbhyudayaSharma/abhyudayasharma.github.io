import React from 'react';
import { Helmet } from 'react-helmet';
import { PageProps, useStaticQuery, graphql } from 'gatsby';

import { wrapContent } from '../utils/utils-react';
import { convertBlogFrontmatterToBlogMetaData } from '../utils/utils-common';
import { BlogFrontmatterQueryResult } from '../common/BlogFrontmatterQueryResult';
import { BlogListEntry } from '../components/BlogListEntry';

import { author } from '../../package.json';

const convertBlogFormatterQueryResultToBlogList = (result: BlogFrontmatterQueryResult): JSX.Element[] => {
  return result.edges
    .map(edge => edge.node.frontmatter)
    .filter(frontmatter => frontmatter.isPublic)
    .map((frontmatter, index) =>
      <BlogListEntry {...(convertBlogFrontmatterToBlogMetaData(frontmatter))} key={index} />
    );
};

const BlogListRoute: React.FC<PageProps> = (props) => {
  const data = useStaticQuery(graphql`
    query BlogFrontmatter {
      allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
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
  ).allMarkdownRemark as BlogFrontmatterQueryResult;
  return (
    <>
      <Helmet title={`${author.name}'s Blog`} defer={false} />
      {wrapContent(props, convertBlogFormatterQueryResultToBlogList(data))}
    </>
  );
};

export default BlogListRoute;
