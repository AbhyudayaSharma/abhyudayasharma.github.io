import path from 'path';

import { GatsbyNode } from 'gatsby';
import { BlogContent } from '../src/common/BlogContent';
import { BlogFrontmatter } from '../src/common/BlogFrontmatter';
import { validateBlogFrontmatter } from '../src/utils/utils-common';

interface BlogContentQueryData {
  allMdx: {
    edges: {
      node: {
        body: string;
        frontmatter: BlogFrontmatter;
      };
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }): Promise<void> => {
  const result = await graphql(/* GraphQL */ `
    query BlogContentQuery {
      allMdx(sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            frontmatter {
              slug
              title
              date(formatString: "YYYY-MM-DD")
              tags
              isPublic
              description
            }
            body
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
  data.allMdx.edges.forEach(({ node }) => {
    const context: BlogContent = {
      frontmatter: validateBlogFrontmatter(node.frontmatter),
      body: node.body,
    };
    createPage({
      component: blogTemplate,
      path: context.frontmatter.url,
      context,
    });
  });
  return Promise.resolve();
};
