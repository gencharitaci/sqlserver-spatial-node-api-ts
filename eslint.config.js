// @ts-check

// import eslint from '@eslint/js';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   eslint.configs.recommended,
//   ...tseslint.configs.recommended,
// );

// @ts-check

// eslint.config.js
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Use recommended rules from TypeScript ESLint
    },
  },
];
