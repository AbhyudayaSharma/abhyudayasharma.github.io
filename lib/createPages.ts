import path from 'path';
import { GatsbyNode } from 'gatsby';
import { Blog, BLOG_PREFIX, RawBlog, toValidBlog } from '../src/common/Blog';
import { BlogListTemplateProps } from '../src/common/BlogListTemplateProps';
import { getBlogTagUrl } from '../src/utils/utils-common';

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
              externalUrl
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

    if (blog.frontmatter.externalUrl) {
      return;
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

  // categorize blogs by tags
  const blogTagMap: Map<string, Blog[]> = new Map();

  resolvedBlogs.forEach(blog => {
    const year = blog.frontmatter.date.getFullYear();

    const existingBlogs = blogYearMap.get(year) ?? [];
    existingBlogs.push(blog);
    blogYearMap.set(year, existingBlogs);

    blog.frontmatter.tags.forEach(tag => {
      const tagBlogs = blogTagMap.get(tag) ?? [];
      tagBlogs.push(blog);
      blogTagMap.set(tag, tagBlogs);
    });
  });

  const blogListTemplateComponent = path.resolve('./src/templates/BlogListTemplate.tsx');
  blogYearMap.forEach((blogs, year) => createPage<BlogListTemplateProps>({
    path: `${BLOG_PREFIX}/${year}`,
    context: { blogs, title: `Blogs written in ${year}` },
    component: blogListTemplateComponent,
  }));

  blogTagMap.forEach((blogs, tag) => createPage<BlogListTemplateProps>({
    path: getBlogTagUrl(tag),
    context: { blogs, title: `Blogs tagged ‘${tag}’` },
    component: blogListTemplateComponent,
  }));

  return Promise.resolve();
};
