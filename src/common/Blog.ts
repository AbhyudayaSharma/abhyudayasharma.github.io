import { trimOrThrowIfBlank } from '../utils/utils-common';
import { BlogFrontmatter, isRawBlogFrontmatter, RawBlogFrontmatter, toValidBlogFrontmatter } from './BlogFrontmatter';

export const BLOG_PREFIX = '/blog';

export interface Blog {
  // cannot be window.URL because Blog is converted to JSON and passed to blogTemplate.tsx
  readonly url: string;
  readonly body?: string;
  readonly frontmatter: BlogFrontmatter;
  readonly internal: {
    readonly contentFilePath: string;
  }
}

export interface RawBlog extends Omit<Blog, 'frontmatter' | 'url'> {
  readonly frontmatter: RawBlogFrontmatter;
}

export function toValidBlog(rawBlog: RawBlog): Blog {
  if (!isRawBlogFrontmatter(rawBlog.frontmatter)) {
    throw new Error(`Invalid frontmatter received: ${JSON.stringify(rawBlog.frontmatter)}`);
  }

  const body = !rawBlog.body ? undefined : trimOrThrowIfBlank(rawBlog.body);
  const slug = trimOrThrowIfBlank(rawBlog.frontmatter.slug);
  const frontmatter = toValidBlogFrontmatter(rawBlog.frontmatter);

  if (!slug.match(/[a-z1-9][a-z1-9-]{2,}/)) {
    throw new Error(`Invalid slug. Received slug = "${slug}"; ` +
      `frontmatter = ${JSON.stringify(frontmatter)}`);
  }

  return {
    body,
    frontmatter,
    internal: rawBlog.internal,
    url: `${BLOG_PREFIX}/${frontmatter.date.getFullYear().toString(10)}/${slug}`,
  };
}
