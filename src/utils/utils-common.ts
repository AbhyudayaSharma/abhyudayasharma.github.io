import { isString } from 'lodash';
import { PageProps } from 'gatsby';

import packageJson from '../../package.json';

/**
 * Receives an arbitrary object and checks if it is a non-blank string.
 * @param x unknown object
 * @throws Error if `x` is not a string or is blank.
 * @returns trimmed string using {@link String.trim}
 */
export const trimOrThrowIfBlank = (x: unknown): string => {
  if (!isString(x) || x.match(/^\s*$/)) {
    throw Error(`Passed element should be a non-empty string. x = "${x}"`);
  }
  return x.trim();
};

export const getPageUrl: (pageProps: PageProps) => URL = (pageProps) => {
  return new URL(pageProps.location.pathname, packageJson.homepage);
};

/**
 * Type of an object `x` after a round trip JSON serialization and deserialization: `JSON.parse(JSON.stringify(x))`.
 * @see https://effectivetypescript.com/2020/04/09/jsonify/
 */
export type Jsonified<T> =
  T extends { toJSON(): infer U }
    ? U
    : T extends object // eslint-disable-line @typescript-eslint/ban-types
    ? {
      [k in keyof T]: Jsonified<T[k]>
    }
    : T;

/**
 * Shorthand to join multiple css classes.
 * @param classes CSS classes
 * @returns a string joining css classes
 */
export function c(...classes: string[]): string {
  return classes.join(' ');
}
