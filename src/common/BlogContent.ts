import { BlogMetadata, UnsafeBlogMetadata } from './BlogMetadata';

export interface BlogContent {
  readonly metadata: BlogMetadata;
  readonly rawMarkdownBody: string;
}

export interface UnsafeBlogContent {
  readonly metadata: UnsafeBlogMetadata;
  readonly rawMarkdownBody: string;
}
