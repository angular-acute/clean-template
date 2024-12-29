const { RuleTester } = require("eslint");
const angularParser = require("@angular-eslint/template-parser");
const rule = require("./html-id-case");

const ruleTester = new RuleTester({
  languageOptions: {
    parser: {
      parse: angularParser.parse,
      parseForESLint: angularParser.parseForESLint,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

describe("html-id-case", () => {
  ruleTester.run("kebab-case", rule, {
    valid: [
      {
        code: '<div id="kebab-case"></div>',
        options: [{ case: "kebab" }],
      },
      {
        code: '<div id="kebab-case-{{ withInterpolation }}"></div>',
        options: [{ case: "kebab" }],
      },
      {
        code: '<div id="ignored case {{ withInterpolation }}"></div>',
        options: [{ case: "kebab", ignoreNgInterpolation: true }],
      },
    ],
    invalid: [,],
  });

  ruleTester.run("snake_case", rule, {
    valid: [
      {
        code: '<div id="snake_case"></div>',
        options: [{ case: "snake" }],
      },
      {
        code: '<div id="snake_case_{{ withInterpolation }}"></div>',
        options: [{ case: "snake" }],
      },
      {
        code: '<div id="ignored case {{ withInterpolation }}"></div>',
        options: [{ case: "snake", ignoreNgInterpolation: true }],
      },
    ],
    invalid: [
      {
        code: '<div id="snake_case-{{ withInterpolation }}"></div>',
        options: [{ case: "snake" }],
      },
    ],
  });

  ruleTester.run("camelCase", rule, {
    valid: [
      {
        code: '<div id="camelCase"></div>',
        options: [{ case: "camel" }],
      },
      {
        code: '<div id="camelCase{{ withInterpolation }}"></div>',
        options: [{ case: "camel" }],
      },
      {
        code: '<div id="ignored case {{ withInterpolation }}"></div>',
        options: [{ case: "camel", ignoreNgInterpolation: true }],
      },
    ],
    invalid: [
      {
        code: '<div id="camelCase-{{ withInterpolation }}"></div>',
        options: [{ case: "camel" }],
      },
    ],
  });

  ruleTester.run("PascalCase", rule, {
    valid: [
      {
        code: '<div id="PascalCase"></div>',
        options: [{ case: "pascal" }],
      },
      {
        code: '<div id="PascalCase{{ withInterpolation }}"></div>',
        options: [{ case: "pascal" }],
      },
      {
        code: '<div id="ignored case {{ withInterpolation }}"></div>',
        options: [{ case: "pascal", ignoreNgInterpolation: true }],
      },
    ],
    invalid: [
      {
        code: '<div id="PascalCase-{{ withInterpolation }}"></div>',
        options: [{ case: "pascal" }],
      },
      {
        code: '<div id="PascalCase"></div>',
        output: '<div id="pascal-case"></div>',
        errors: [
          { message: "Template id attributes should be in kebab-case." },
        ],
      },
    ],
  });

  ruleTester.run("Mixed Case", rule, {
    valid: [
      {
        code: '<div id="ignored case {{ withInterpolation }}"></div>',
        options: [{ case: "kebab", ignoreNgInterpolation: true }],
      },
    ],
    invalid: [
      {
        code: '<div id="Some Mixed-Case"></div>',
        output: '<div id="some-mixed-case"></div>',
        errors: [
          { message: "Template id attributes should be in kebab-case." },
        ],
        options: [{ case: "kebab" }],
      },
      {
        code: '<div id="Some Mixed-Case {{ withInterpolation }}"></div>',
        output: '<div id="some-mixed-case-{{ withInterpolation }}"></div>',
        errors: [
          { message: "Template id attributes should be in kebab-case." },
        ],
        options: [{ case: "kebab" }],
      },
    ],
  });
});
