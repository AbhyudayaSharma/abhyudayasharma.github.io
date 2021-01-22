import { BlogFrontmatter } from './BlogFrontmatter';

export interface BlogFrontmatterQueryResult {
  readonly edges: {
    readonly node: {
      readonly frontmatter: Partial<BlogFrontmatter>;
    };
  }[];
}
