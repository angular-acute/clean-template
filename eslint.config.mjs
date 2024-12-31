import templateParser from "@angular-eslint/template-parser";

export default [
  {
    ignores: [],
  },
  {
    files: ["**/*.ts"],
    plugins: {},
    languageOptions: {
      parser: templateParser,
    },
    rules: {},
  },
];
