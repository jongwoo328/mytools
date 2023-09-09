const keyNameRegex = RegExp(
  // from https://github.com/lodash/lodash/blob/master/.internal/stringToPath.js
  // Match anything that isn't a dot or bracket.
  "[^.[\\]]+" +
    "|" +
    // Or match property names within brackets.
    "\\[(?:" +
    // Match a non-string expression.
    "([^\"'][^[]*)" +
    "|" +
    // Or match strings (supports escaping characters).
    "([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2" +
    ")\\]" +
    "|" +
    // Or match "" as the space between consecutive dots or empty brackets.
    "(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))",
  "g",
);

export const parseJsonPathToKeyArray = (jsonPath: string) => {
  const matches: string[] = jsonPath.match(keyNameRegex) || [];
  return matches.map((key) => {
    if (key.startsWith('["') && key.endsWith('"]')) {
      return key.slice(2, -2);
    }
    return key;
  });
};
