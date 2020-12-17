import path from 'path';

import { GatsbyNode } from 'gatsby';
import { BlogContent } from '../src/common/BlogContent';
import { BlogFrontmatter } from '../src/common/BlogFrontmatter';
import { convertBlogFrontmatterToBlogMetaData } from '../src/utils/utils-common';

interface BlogContentQueryData {
  allMarkdownRemark: {
    edges: {
      node: {
        rawMarkdownBody: string;
        frontmatter: BlogFrontmatter;
      };
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }): Promise<void> => {
  const result = await graphql(/* GraphQL */ `
    query BlogContentQuery {
      allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            frontmatter {
              slug
              title
              date
              tags
              isPublic
              description
            }
            rawMarkdownBody
          }
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild('Error in GraphQL query when creating blog pages.', result.errors);
    return Promise.reject(result.errors);
  }

  const { createPage } = actions;
  const data = result.data as BlogContentQueryData;
  const blogTemplate = path.resolve('./src/templates/blogTemplate.tsx');
  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const context: BlogContent = {
      metadata: convertBlogFrontmatterToBlogMetaData(node.frontmatter),
      rawMarkdownBody: node.rawMarkdownBody,
    };
    createPage({
      component: blogTemplate,
      path: context.metadata.url,
      context,
    });
  });
  return Promise.resolve();
};
