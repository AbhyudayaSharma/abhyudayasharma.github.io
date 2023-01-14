import React from 'react';
import packageJson from '../../package.json';

import { graphql, PageProps, useStaticQuery } from 'gatsby';

import { Seo } from '../components/Seo';
import { wrapContent } from '../utils/utils-react';
import { BlogList } from '../components/BlogList';
import { BlogFrontmatterQueryResult } from '../common/BlogFrontmatterQueryResult';

import { getPageUrl } from '../utils/utils-common';
import { toValidBlog } from '../common/Blog';

const pageTitle = `${packageJson.author.name}'s Blog`;

const BlogListRoute: React.FC<PageProps> = (props) => {
  const data = useStaticQuery(graphql`
    query BlogFrontmatter {
      allMdx(sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            frontmatter {
              title
              date
              tags
              description
              isPublic
              externalUrl
              slug
            }
          }
        }
      }
    }`).allMdx as BlogFrontmatterQueryResult;

  return (
    <>
      <Seo title={pageTitle} url={getPageUrl(props)}/>
      {wrapContent(props, (
        <BlogList
          publicOnly={true}
          header='Recent Articles'
          blogs={data.edges.map(({ node }) => toValidBlog(node))}
        />
      ))}
    </>
  );
};

export default BlogListRoute;
