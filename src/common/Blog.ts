import { escapeRegExp } from 'lodash';
import { trimOrThrowIfBlank } from '../utils/utils-common';
import { BlogFrontmatter, isRawBlogFrontmatter, RawBlogFrontmatter, toValidBlogFrontmatter } from './BlogFrontmatter';

export const BLOG_PREFIX = '/blog';

export interface Blog {
  // cannot be window.URL because Blog is converted to JSON and passed to blogTemplate.tsx
  readonly url: string;
  readonly body?: string;
  readonly frontmatter: BlogFrontmatter;
}

export interface RawBlog extends Omit<Blog, 'frontmatter' | 'url'> {
  readonly slug: string;
  readonly frontmatter: RawBlogFrontmatter;
}

export function toValidBlog(rawBlog: RawBlog): Blog {
  if (!isRawBlogFrontmatter(rawBlog.frontmatter)) {
    throw new Error(`Invalid frontmatter received: ${JSON.stringify(rawBlog.frontmatter)}`);
  }

  const body = rawBlog.body === undefined ? undefined : trimOrThrowIfBlank(rawBlog.body);
  const slug = trimOrThrowIfBlank(rawBlog.slug);
  const frontmatter = toValidBlogFrontmatter(rawBlog.frontmatter);

  const slugPattern = new RegExp(escapeRegExp(frontmatter.date.getFullYear().toString(10)) + '/[a-z1-9][a-z1-9-]{2,}');
  if (!slug.match(slugPattern)) {
    throw new Error(`Blog should be organized by year. Received slug = "${slug}"; ` +
      `frontmatter = ${JSON.stringify(frontmatter)}`);
  }

  return {
    body,
    frontmatter,
    url: `${BLOG_PREFIX}/${slug}`,
  };
}
