// Based on the Base32 specification in RFC 4648
// https://datatracker.ietf.org/doc/html/rfc4648

const charmap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function * fiveBitIterator(array: Uint8Array): Generator<number> {
  if (array.length === 0) {
    return;
  }

  let num = 0;
  let bitsNeeded = 5;
  let bitsAvailable = 8;

  array = array.slice();

  for (let i = 0; i < array.length;) {
    if (bitsNeeded === 0) {
      yield num;
      bitsNeeded = 5;
      num = 0;
    } else if (bitsAvailable === 0) {
      bitsAvailable = 8;
      i++;
    } else {
      num |= (array[i] >>> (8 - bitsNeeded));
      array[i] <<= bitsNeeded;
      const bitsUsed = Math.min(bitsNeeded, bitsAvailable);
      bitsNeeded -= bitsUsed;
      bitsAvailable -= bitsUsed;
    }
  }

  if (bitsNeeded !== 0 && bitsNeeded !== 5) {
    yield num;
  }
}

export function base32Encode(data: Uint8Array): string {
  const padLength = [0, 6, 4, 3, 1][data.length % 5];
  const ret = [...fiveBitIterator(data)].map(x => charmap[x]);
  ret.push(...Array(padLength).fill('='));
  return ret.join('');
}
