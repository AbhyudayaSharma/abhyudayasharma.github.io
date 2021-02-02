import React from 'react';
import { PageProps, useStaticQuery, graphql } from 'gatsby';

import { Seo } from '../components/Seo';
import { wrapContent } from '../utils/utils-react';
import { BlogFrontmatterQueryResult } from '../common/BlogFrontmatterQueryResult';
import { BlogList } from '../components/BlogList';

import { author } from '../../package.json';
import { getPageUrl } from '../utils/utils-common';

const pageTitle = `${author.name}'s Blog`;

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
      <Seo title={pageTitle} url={getPageUrl(props)} />
      {wrapContent(props, (
        <BlogList
          publicOnly={true}
          header='Recent Articles'
          blogs={data.edges.map(({ node }) => node.frontmatter)}
        />
      ))}
    </>
  );
};

export default BlogListRoute;
