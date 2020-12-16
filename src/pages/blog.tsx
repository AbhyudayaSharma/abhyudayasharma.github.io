import { PageProps, graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { author } from '../../package.json';
import { wrapContent } from '../utils';
import BlogListEntry from '../components/BlogListEntry';
import { BlogMetadata } from '../blog/Blogs';

interface BlogFrontmatterQueryResult {
  allMarkdownRemark: {
    edges: {
      node: {
        frontmatter: {
          slug: string;
          title: string;
          date: string;
          description: string;
          tags: string[];
          public: boolean;
        };
      };
    }[];
  };
}

const convertBlogFormatterQueryResultToBlogList = (result: BlogFrontmatterQueryResult): JSX.Element[] => {
  return result.allMarkdownRemark.edges
    .map(edge => edge.node.frontmatter)
    .map((data, index) =>
      <BlogListEntry
        {...data}
        key={index}
        url={data.slug}
        path={data.slug}
        date={new Date(data.date)}
      />
    );
};

export const query = graphql`
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
            public
          }
        }
      }
    }
  }`;

interface BlogListRouteProps extends PageProps {
  data: BlogFrontmatterQueryResult;
}

const BlogListRoute: React.FC<BlogListRouteProps> = (props) => {
  return (
    <>
      <Helmet title={`${author.name}'s Blog`} defer={false} />
      {wrapContent(props, convertBlogFormatterQueryResultToBlogList(props.data))}
    </>
  );
};

export default BlogListRoute;
