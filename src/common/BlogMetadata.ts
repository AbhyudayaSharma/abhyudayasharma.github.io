export interface UnsafeBlogMetadata {
  readonly title: string;
  readonly tags: string[];
  readonly date: string | Date;
  readonly isPublic: boolean;
  readonly description: string;
  readonly url: string;
}

export interface BlogMetadata extends UnsafeBlogMetadata {
  readonly date: Date;
}
