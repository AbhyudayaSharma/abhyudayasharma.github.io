import path from 'path';
import { GatsbyNode } from 'gatsby';
import { Blog, RawBlog, toValidBlog } from '../src/common/Blog';

interface BlogContentQueryResult {
  allMdx: {
    edges: {
      readonly node: RawBlog;
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
              title
              date(formatString: "YYYY-MM-DD")
              tags
              isPublic
              description
            }
            body
            slug
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
  const data = result.data as BlogContentQueryResult;
  const component = path.resolve('./src/templates/blogTemplate.tsx');

  data.allMdx.edges
    .map(edge => edge.node)
    .map(toValidBlog)
    .forEach(blog => {
      if (blog.body === undefined) {
        throw new Error('Empty body. Looks like an error in the GraphQL query.');
      }

      const context: Required<Blog> = { ...blog, body: blog.body ?? '' };
      createPage<Required<Blog>>({
        context,
        component,
        path: blog.url,
      });
    });

  return Promise.resolve();
};
