import { isBoolean, isString } from 'lodash';
import { trimOrThrowIfBlank } from '../utils/utils-common';

export interface BlogFrontmatter {
  readonly title: string;
  readonly tags: string[];
  readonly date: Date;
  readonly isPublic: boolean;
  readonly description: string;
  readonly externalUrl?: string;
  readonly slug: string;
}

export interface RawBlogFrontmatter extends Omit<BlogFrontmatter, 'date'> {
  readonly date: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isRawBlogFrontmatter(obj: any): obj is RawBlogFrontmatter {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const { title, tags, date, isPublic, description } = obj;
  return (
    isString(date) &&
    isString(title) &&
    isString(description) &&
    isBoolean(isPublic) &&
    Array.isArray(tags) &&
    (tags as Array<unknown>).every(isString)
  );
}

/**
 * Converts a {@link RawBlogFrontmatter} to a valid {@link BlogFrontmatter} object.
 *
 * It is the caller's responsibility to ensure that `frontmatter` has the correct shape of {@link RawBlogFrontmatter}.
 * This can be done using {@link isRawBlogFrontmatter}.
 * @param frontmatter potentially unsafe `BlogFrontmatter`
 * @return safe to use BlogFrontMatter
 */
export function toValidBlogFrontmatter(frontmatter: RawBlogFrontmatter): BlogFrontmatter {
  const date = new Date(frontmatter.date);
  if (isNaN(date.getDate())) {
    throw new Error(`Invalid date: ${frontmatter.date}`);
  }

  const title = trimOrThrowIfBlank(frontmatter.title);
  const description = trimOrThrowIfBlank(frontmatter.description);
  const isPublic = frontmatter.isPublic;
  const externalUrl = frontmatter.externalUrl ? frontmatter.externalUrl.trim() : undefined;
  const slug = trimOrThrowIfBlank(frontmatter.slug);

  if (frontmatter.tags.length < 1) {
    throw Error(`${title}: tags should be an array of containing at least one string value.`);
  }

  const tags = frontmatter.tags.map(trimOrThrowIfBlank);

  return {
    title,
    description,
    isPublic,
    date,
    tags,
    externalUrl,
    slug,
  };
}
