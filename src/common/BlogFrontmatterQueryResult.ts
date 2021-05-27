import { RawBlog } from './Blog';

export interface BlogFrontmatterQueryResult {
  readonly edges: {
    readonly node: RawBlog;
  }[];
}
