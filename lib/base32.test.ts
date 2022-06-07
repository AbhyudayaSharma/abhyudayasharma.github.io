import { base32Encode } from './base32';

const textEncoder = new TextEncoder();

// test vectors are taken from https://datatracker.ietf.org/doc/html/rfc4648#section-10
describe.each([
  ['', ''],
  ['f', 'MY======'],
  ['fo', 'MZXQ===='],
  ['foo', 'MZXW6==='],
  ['foob', 'MZXW6YQ='],
  ['fooba', 'MZXW6YTB'],
  ['foobar', 'MZXW6YTBOI======'],
].map((arr): [string, Uint8Array, string] => [arr[0], textEncoder.encode(arr[0]), arr[1]]))(
  'base32Encode("%s")', (_, a, expected) => {
    test(`returns ${expected}`, () => {
      expect(base32Encode(a)).toBe(expected);
    });
  }
);
