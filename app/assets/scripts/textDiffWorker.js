import * as Diff from "@/node_modules/diff/dist/diff.js";

const checkDiff = (text1, text2, diffType) => {
  if (diffType === "chars") {
    return Diff.diffChars(text1, text2);
  } else if (diffType === "words") {
    return Diff.diffWords(text1, text2);
  } else if (diffType === "lines") {
    return Diff.diffLines(text1, text2);
  }
};

self.addEventListener("message", function (e) {
  const data = e.data;
  const diff = checkDiff(data.text1, data.text2, data.diffType);
  self.postMessage(diff);
});
