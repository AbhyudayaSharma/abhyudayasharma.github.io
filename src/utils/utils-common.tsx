import { PageProps } from 'gatsby';
import { BlogFrontmatter } from '../common/BlogFrontmatter';

import { homepage } from '../../package.json';

/**
 * Receives an arbitrary object and checks if it is a non-blank string.
 * @param x unknown object
 * @throws Error if `x` is not a string or is blank.
 * @returns trimmed string using {@link String.trim}
 */
const trimOrThrow = <T extends unknown>(x: T): string => {
  if (!x || typeof x !== 'string' || x.match(/^\s*$/)) {
    throw Error(`Passed element should be a non-empty string. x = "${x}"`);
  }
  return x.trim();
};

const validUrlPathOrThrow = <T extends unknown>(x: T): string => {
  const y = trimOrThrow(x);
  if (!y.match(/^[0-9a-zA-Z\-_]{3,}$/)) {
    throw Error(`Not a valid blog URL path: "${x}"`);
  }
  return y;
};

/**
 * Validates unsafe frontmatter and returns a safe BlogFrontmatter object
 * @param frontmatter raw unsafe frontmatter possibly from a blog
 * @return safe {@link BlogFrontmatter}
 */
export const validateBlogFrontmatter = (frontmatter: Partial<BlogFrontmatter>): BlogFrontmatter => {
  const date = new Date(trimOrThrow(frontmatter.date));
  const url = `/blog/${date.getFullYear()}/${validUrlPathOrThrow(frontmatter.slug)}`;
  const slug = trimOrThrow(frontmatter.slug);
  const title = trimOrThrow(frontmatter.title);
  const description = trimOrThrow(frontmatter.description);

  if (typeof frontmatter.isPublic !== 'boolean') {
    throw Error(`${title}: 'isPublic' should be a boolean.`);
  }

  const isPublic = frontmatter.isPublic;

  if (!Array.isArray(frontmatter.tags) || frontmatter.tags.length < 1) {
    throw Error(`${title}: tags should be an array of containing at least one string value.`);
  }

  const tags = frontmatter.tags.map(trimOrThrow);

  return {
    slug,
    title,
    description,
    isPublic,
    date,
    url,
    tags,
  };
};

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-us', dateOptions);
};

export const getPageUrl: (pageProps: PageProps) => URL = (pageProps) => {
  return new URL(pageProps.uri, homepage);
};
