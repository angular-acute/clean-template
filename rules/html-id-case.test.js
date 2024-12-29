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
  describe("case: kebab", () => {
    const options = [{ case: "kebab" }];

    ruleTester.run("kebab-case", rule, {
      valid: [
        // {
        //   code: '<div id="kebab-case"></div>',
        //   options,
        // },
        // {
        //   code: '<div id="kebab-case-{{ withInterpolation }}-and-{{more}}"></div>',
        //   options,
        // },
        // {
        //   code: '<div id="kabob-case-{{ withInterpolation }}-{{andMore}}"></div>',
        //   options,
        // },
        // {
        //   code: '<div id="kerbab-case-{{ withInterpolation+andMore+evenStill }}"></div>',
        //   options,
        // },
        // {
        //   code: '<div id="ignored Case {{ withInterpolation }}"></div>',
        //   options: [{ case: "kebab", ignoreNgInterpolation: true }],
        // },
      ],
      invalid: [
        // {
        //   code: '<div id="kebab-case {{ withInterpolation }}"></div>',
        //   output: '<div id="kebab-case-{{ withInterpolation }}"></div>',
        //   errors: [
        //     { message: "Template id attributes should be in kebab-case." },
        //   ],
        // },
  // {
  //   code: '<div id="kebab-case {{ withInterpolation+andMore }}"></div>',
  //   output:
  //     '<div id="kebab-case-{{ withInterpolation + andMore }}"></div>',
  //   errors: [
  //     { message: "Template id attributes should be in kebab-case." },
  //   ],
  // },
        // {
        //   code: '<div id="snake_case"></div>',
        //   output: '<div id="snake-case"></div>',
        //   errors: [
        //     { message: "Template id attributes should be in kebab-case." },
        //   ],
        // },
        // {
        //   code: '<div id="snake_case_{{ withInterpolation }}"></div>',
        //   output: '<div id="snake-case-{{ withInterpolation }}"></div>',
        //   errors: [
        //     { message: "Template id attributes should be in kebab-case." },
        //   ],
        // },
        // {
        //   code: '<div id="snake_case_{{ myObject.withInterpolation }}"></div>',
        //   output: '<div id="snake-case-{{ myObject.withInterpolation }}"></div>',
        //   errors: [
        //     { message: "Template id attributes should be in kebab-case." },
        //   ],
        // },
        //       {
        //   code: '<div id="snake_case_{{ this.withInterpolation }}"></div>',
        //   output: '<div id="snake-case-{{ this.withInterpolation }}"></div>',
        //   errors: [
        //     { message: "Template id attributes should be in kebab-case." },
        //   ],
        // },
        // {
        //   code: '<div id="snake_case_{{ this.myObject.withInterpolation }}"></div>',
        //   output: '<div id="snake-case-{{ this.myObject.withInterpolation }}"></div>',
        //   errors: [
        //     { message: "Template id attributes should be in kebab-case." },
        //   ],
        // },
        // {
        //   code: '<div id="snake_case_{{ withMethod() }}"></div>',
        //   output: '<div id="snake-case-{{ withMethod() }}"></div>',
        //   errors: [
        //     { message: "Template id attributes should be in kebab-case." },
        //   ],
        // },
        {
          code: `<div id="snake_case_{{ withVar + 'and_string' + withMethod(someArgument, this.someOther(index)) + { magna: 'carta', magnum: { opus: 1 } } + 512 + [1, 2, 3] + null + false + undefined }}"></div>`,
          output: `<div id="snake-case-{{ withVar + 'and_string' + withMethod(someArgument, this.someOther(index)) + { magna: 'carta', magnum: { opus: 1 } } + 512 + [1, 2, 3] + null + false + undefined }}"></div>`,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
                    // {
  //   code: '<div id="snake_case_{{ withInterpolation + andMore }}"></div>',
  //   output:
  //     '<div id="snake-case-{{ withInterpolation + andMore }}"></div>',
  //   errors: [
  //     { message: "Template id attributes should be in kebab-case." },
  //   ],
  // },
  // {
  //   code: '<div id="camelCase"></div>',
  //   output: '<div id="camel-case"></div>',
  //   errors: [
  //     { message: "Template id attributes should be in kebab-case." },
  //   ],
  // },
  // {
  //   code: '<div id="camelCase{{ withInterpolation }}"></div>',
  //   output: '<div id="camel-case-{{ withInterpolation }}"></div>',
  //   errors: [
  //     { message: "Template id attributes should be in kebab-case." },
  //   ],
  // },
  // {
  //   code: '<div id="PascalCase"></div>',
  //   output: '<div id="pascal-case"></div>',
  //   errors: [
  //     { message: "Template id attributes should be in kebab-case." },
  //   ],
  // },
  // {
  //   code: '<div id="PascalCase{{ withInterpolation }}"></div>',
  //   output: '<div id="pascal-case-{{ withInterpolation }}"></div>',
  //   errors: [
  //     { message: "Template id attributes should be in kebab-case." },
  //   ],
  // },
  // {
  //   code: '<div id="Mixed case"></div>',
  //   output: '<div id="mixed-case"></div>',
  //   errors: [
  //     { message: "Template id attributes should be in kebab-case." },
  //   ],
  // },
  // {
  //   code: '<div id="Mixed case {{ withInterpolation }}"></div>',
  //   output: '<div id="mixed-case-{{ withInterpolation }}"></div>',
  //   errors: [
  //     { message: "Template id attributes should be in kebab-case." },
  //   ],
  // },
      ],
    });
  });

  describe("case: snake", () => {
    const options = [{ case: "snake" }];

    ruleTester.run("snake_case", rule, {
      valid: [
        {
          code: '<div id="snake_case"></div>',
          options,
        },
        {
          code: '<div id="snake_case_{{ withInterpolation }}"></div>',
          options,
        },
        {
          code: '<div id="snake_case_{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "snake", ignoreNgInterpolation: true }],
        },
      ],
      invalid: [
        {
          code: '<div id="snake_case-{{ withInterpolation }}"></div>',
          options,
        },
      ],
    });
  });

  describe("case: camel", () => {
    const options = [{ case: "camel" }];

    ruleTester.run("camelCase", rule, {
      valid: [
        {
          code: '<div id="camelCase"></div>',
          options,
        },
        {
          code: '<div id="camelCase{{ withInterpolation }}"></div>',
          options,
        },
        {
          code: '<div id="camelCase{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "camel", ignoreNgInterpolation: true }],
        },
      ],
      invalid: [
        {
          code: '<div id="camelCase-{{ withInterpolation }}"></div>',
          options,
        },
      ],
    });
  });

  describe("case: pascal", () => {
    const options = [{ case: "pascal" }];

    ruleTester.run("PascalCase", rule, {
      valid: [
        {
          code: '<div id="PascalCase"></div>',
          options,
        },
        {
          code: '<div id="PascalCase{{ withInterpolation }}"></div>',
          options,
        },
        {
          code: '<div id="PascalCase{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "pascal", ignoreNgInterpolation: true }],
        },
      ],
      invalid: [
        {
          code: '<div id="PascalCase-{{ withInterpolation }}"></div>',
          options,
        },
      ],
    });
  });

  describe("Mixed Case", () => {
    const options = [{ case: "kebab" }];

    ruleTester.run("Mixed Case", rule, {
      valid: [
        {
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
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
          options,
        },
        {
          code: '<div id="Some Mixed-Case {{ withInterpolation }}"></div>',
          output: '<div id="some-mixed-case-{{ withInterpolation }}"></div>',
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
          options,
        },
      ],
    });
  });
});
