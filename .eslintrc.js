module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:nuxt/recommended"],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint", "prettier", "vue"],
  rules: {
    "prettier/prettier": ["error", {}],
    "max-len": ["error", { code: 120, ignoreRegExpLiterals: true }],
  },
};
