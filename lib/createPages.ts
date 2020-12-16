import { GatsbyNode } from 'gatsby';

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
        };
      };
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }): Promise<void> => {
  return Promise.resolve();
};
