/**
 * Manual char/word splitter — a free stand-in for GSAP's paid SplitText plugin.
 * Returns an array of { key, text } tokens ready to map into <span> elements,
 * each wrapped so its parent word never breaks mid-line (word-level nowrap).
 */
export interface SplitToken {
  key: string;
  char: string;
  wordEnd: boolean;
}

export const splitChars = (text: string): SplitToken[] => {
  const words = text.split(' ');
  const tokens: SplitToken[] = [];
  words.forEach((word, wi) => {
    [...word].forEach((char, ci) => {
      tokens.push({ key: `${wi}-${ci}`, char, wordEnd: false });
    });
    if (wi < words.length - 1) {
      tokens.push({ key: `${wi}-space`, char: ' ', wordEnd: true });
    }
  });
  return tokens;
};
