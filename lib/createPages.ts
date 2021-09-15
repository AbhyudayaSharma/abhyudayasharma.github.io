import path from 'path';
import { GatsbyNode } from 'gatsby';
import { Blog, BLOG_PREFIX, RawBlog, toValidBlog } from '../src/common/Blog';

interface BlogContentQueryResult {
  allMdx: {
    edges: {
      readonly node: RawBlog;
    }[];
  };
}

type BlogListTemplateProps = { blogs: Blog[]; year: number };

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

  // populate blog pages like /blog/20xx/foo
  const resolvedBlogs = data.allMdx.edges
    .map(edge => edge.node)
    .map(toValidBlog);

  resolvedBlogs.forEach(blog => {
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

  // populate yearly blog lists (like /blog/20xx)
  const blogYearMap: Map<number, Blog[]> = new Map();
  resolvedBlogs.forEach(blog => {
    const year = blog.frontmatter.date.getFullYear();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const existingBlogs = blogYearMap.has(year) ? blogYearMap.get(year)! : [];
    existingBlogs.push(blog);
    blogYearMap.set(year, existingBlogs);
  });

  const blogListTemplateComponent = path.resolve('./src/templates/BlogListTemplate.tsx');
  blogYearMap.forEach((blogs, year) => {
    createPage<BlogListTemplateProps>({
      path: `${BLOG_PREFIX}/${year}`,
      context: { blogs, year },
      component: blogListTemplateComponent,
    });
  });

  return Promise.resolve();
};
