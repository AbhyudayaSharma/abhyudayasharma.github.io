import React from 'react';
import { BlogList } from '../components/BlogList';
import { GatsbyTemplateProps, getPageUrl } from '../utils/utils-common';
import { toValidBlogFrontmatter } from '../common/BlogFrontmatter';
import { wrapContent } from '../utils/utils-react';
import { Seo } from '../components/Seo';
import { BlogListTemplateProps } from '../common/BlogListTemplateProps';

const BlogListTemplate: React.FC<GatsbyTemplateProps<BlogListTemplateProps>> = (props) => {
  // sort blogs chronologically
  const blogs = props.pageContext.blogs.map(blog => ({
    ...blog,
    frontmatter: toValidBlogFrontmatter(blog.frontmatter),
  })).sort((a, b) => a.frontmatter.date.getTime() - b.frontmatter.date.getTime());

  const title = props.pageContext.title;
  return wrapContent(props, (<>
    <Seo title={title} url={getPageUrl(props)}/>
    <BlogList publicOnly header={title} blogs={blogs}/>
  </>));
};

export default BlogListTemplate;
