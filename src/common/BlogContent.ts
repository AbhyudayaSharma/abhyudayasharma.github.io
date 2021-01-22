import { BlogFrontmatter } from './BlogFrontmatter';

export interface BlogContent {
  readonly frontmatter: BlogFrontmatter;
  readonly body: string;
}
