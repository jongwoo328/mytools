import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import vue from "eslint-plugin-vue";
import globals from "globals";
import parser from "vue-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:nuxt/recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier,
      vue,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: parser,
      ecmaVersion: "latest",
      sourceType: "commonjs",

      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },

    rules: {
      "prettier/prettier": ["error", {}],

      "max-len": [
        "error",
        {
          code: 120,
          ignoreRegExpLiterals: true,
          ignoreTemplateLiterals: true,
        },
      ],
    },
  },
];
