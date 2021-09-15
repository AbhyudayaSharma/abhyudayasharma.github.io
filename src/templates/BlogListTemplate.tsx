import React from 'react';
import { BlogList } from '../components/BlogList';
import { PageProps } from 'gatsby';
import { getPageUrl, Jsonified } from '../utils/utils-common';
import { Blog } from '../common/Blog';
import { toValidBlogFrontmatter } from '../common/BlogFrontmatter';
import { wrapContent } from '../utils/utils-react';
import { Seo } from '../components/Seo';

type PropsType = PageProps<Record<string, unknown>, Jsonified<{ blogs: Blog[]; year: number }>>;

const BlogListTemplate: React.FC<PropsType> = (props) => {
  // sort blogs chronologically
  const blogs = props.pageContext.blogs.map(blog => ({
    ...blog,
    frontmatter: toValidBlogFrontmatter(blog.frontmatter),
  })).sort((a, b) => a.frontmatter.date.getTime() - b.frontmatter.date.getTime());

  const pageTitle = `Blogs written in ${props.pageContext.year}`;
  return wrapContent(props, (<>
    <Seo title={pageTitle} url={getPageUrl(props)}/>
    <BlogList publicOnly header={pageTitle} blogs={blogs}/>;
  </>));
};

export default BlogListTemplate;
