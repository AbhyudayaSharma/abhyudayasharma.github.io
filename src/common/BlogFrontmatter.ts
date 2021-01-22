export interface BlogFrontmatter {
  readonly slug: string;
  readonly title: string;
  readonly tags: string[];
  readonly date: string | Date;
  readonly isPublic: boolean;
  readonly description: string;
  readonly url: string;
}
