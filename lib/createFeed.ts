import packageJson from '../package.json';

import { BlogFrontmatterQueryResult } from '../src/common/BlogFrontmatterQueryResult';
import { toValidBlog } from '../src/common/Blog';

export const feedUrl = new URL('/blog/feed.rss', packageJson.homepage);

export const feedQuery = /* GraphQL */ `{
  allMdx(sort: {fields: frontmatter___date, order: DESC}) {
    edges {
      node {
        slug
        frontmatter {
          title
          date
          tags
          description
          isPublic
        }
      }
    }
  }
}`;

export function serializeFeed({ query }: { query: { allMdx: BlogFrontmatterQueryResult } }): ItemOptions[] {
  return query.allMdx.edges.map(({ node }) => toValidBlog(node)).map(({ frontmatter, url }) => {
    return { // https://www.npmjs.com/package/rss#itemoptions
      url: new URL(url, packageJson.homepage).href,
      guid: url,
      date: frontmatter.date,
      title: frontmatter.title,
      categories: frontmatter.tags,
      author: packageJson.author.name,
      description: frontmatter.description,
    };
  });
}

// Taken from type definitions for rss
// Project: https://github.com/dylang/node-rss
// Definitions by: Second Datke <https://github.com/secondwtq>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/92e71182200ccc612feb6d4fd4c34ca9b9050c2c/types/rss/index.d.ts#L106
interface ItemOptions {
  /**
   * Title of this particular item.
   */
  title: string;
  /**
   * Content for the item. Can contain HTML but link and image
   * URLs must be absolute path including hostname.
   */
  description: string;
  /**
   * URL to the item. This could be a blog entry.
   */
  url: string;
  /**
   * A unique string feed readers use to know if an item is
   * new or has already been seen. If you use a guid never
   * change it. If you don't provide a guid then your item
   * urls must be unique.
   * Defaults to url.
   */
  guid?: string;
  /**
   * If provided, each array item will be added as a category
   * element.
   */
  categories?: string[];
  /**
   * If included it is the name of the item's creator. If not
   * provided the item author will be the same as the feed author.
   * This is typical except on multi-author blogs.
   */
  author?: string;
  /**
   * The date and time of when the item was created. Feed
   * readers use this to determine the sort order. Some readers
   * will also use it to determine if the content should be
   * presented as unread.
   * Accepts Date object or string with any format
   * JS Date can parse.
   */
  date: Date | string;
  /**
   * The latitude coordinate of the item for GeoRSS.
   */
  lat?: number;
  /**
   * The longitude coordinate of the item for GeoRSS.
   */
  long?: number;
  /**
   * Put additional elements in the item (node-xml syntax).
   */
  // eslint-disable-next-line camelcase
  custom_elements?: Record<string, string>[];
  /**
   * An enclosure object.
   */
  enclosure?: EnclosureObject;
}

interface EnclosureObject {
  /**
   * URL to file object (or file).
   */
  url: string;
  /**
   * Path to binary file (or URL).
   */
  file?: string;
  /**
   * Size of the file.
   */
  size?: number;
  /**
   * If not provided, the MIME Type will be guessed based
   * on the extension of the file or URL, passing type to
   * the enclosure will override the guessed type.
   */
  type?: string;
}
