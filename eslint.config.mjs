import templateParser from "@angular-eslint/template-parser";

export default [
  {
    ignores: ["coverage/"],
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
