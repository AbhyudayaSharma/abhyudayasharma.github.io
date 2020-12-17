
import { BlogMetadata } from '../common/BlogMetadata';
import { BlogFrontmatter } from '../common/BlogFrontmatter';

const nonEmptyStringOrThrow = <T extends unknown>(x: T): string => {
  if (!x || typeof x !== 'string' || x.match(/^\s*$/)) {
    throw Error(`Passed element should be a non-empty string. x = ${x}`);
  }
  return x;
};

const validUrlPathOrThrow = <T extends unknown>(x: T): string => {
  const y = nonEmptyStringOrThrow(x);
  if (!y.match(/^[0-9a-zA-Z\-_]{3,}$/)) {
    throw Error(`Not a valid blog URL path: ${x}`);
  }
  return y;
};

export const convertBlogFrontmatterToBlogMetaData = (frontmatter: BlogFrontmatter): BlogMetadata => {
  const date = new Date(nonEmptyStringOrThrow(frontmatter.date));
  const url = `/blog/${date.getFullYear()}/${validUrlPathOrThrow(frontmatter.slug)}`;
  const title = nonEmptyStringOrThrow(frontmatter.title);
  const description = nonEmptyStringOrThrow(frontmatter.description);

  if (typeof frontmatter.isPublic !== 'boolean') {
    throw Error(`${title}: 'isPublic' should be a boolean.`);
  }
  const isPublic = frontmatter.isPublic;

  if (!Array.isArray(frontmatter.tags) || frontmatter.tags.length < 1) {
    throw Error(`${title}: tags should be an array of containing at least one string value.`);
  }
  const tags = frontmatter.tags.map(nonEmptyStringOrThrow);

  return {
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

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-us', dateOptions);
};
