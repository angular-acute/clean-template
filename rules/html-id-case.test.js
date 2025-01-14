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
        {
          name: `no id`,
          code: "<div></div>",
          options,
        },
        {
          name: `[id]="myIdVariable"`,
          code: '<div [id]="myIdVariable"></div>',
          options,
        },
        {
          name: `id="kebab-case"`,
          code: '<div id="kebab-case"></div>',
          options,
        },
        {
          name: `id="kebab-case-{{ withInterpolation }}-and-{{more}}"`,
          code: '<div id="kebab-case-{{ withInterpolation }}-and-{{more}}"></div>',
          options,
        },
        {
          name: `id="kebab-case-{{ withInterpolation }}-{{andMore}}"`,
          code: '<div id="kebab-case-{{ withInterpolation }}-{{andMore}}"></div>',
          options,
        },
        {
          name: `id="kebab-case-{{ withInterpolation+andMore+evenStill }}"`,
          code: '<div id="kebab-case-{{ withInterpolation+andMore+evenStill }}"></div>',
          options,
        },
        {
          name: `id="ignored Case {{ withInterpolation }}"`,
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "kebab", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `id=" kebab-case"`,
          code: '<div id=" kebab-case"></div>',
          output: '<div id="kebab-case"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="kebab-case "`,
          code: '<div id="kebab-case "></div>',
          output: '<div id="kebab-case"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id=" kebab-case "`,
          code: '<div id=" kebab-case "></div>',
          output: '<div id="kebab-case"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="kebab-Case {{ withInterpolation }}"`,
          code: '<div id="kebab-Case {{ withInterpolation }}"></div>',
          output: '<div id="kebab-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="kebab-Case {{ withInterpolation | andPipe }}"`,
          code: '<div id="kebab-Case {{ withInterpolation | andPipe }}"></div>',
          output:
            '<div id="kebab-case-{{ withInterpolation | andPipe }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: ``,
          code: `<div id="kebab-Case {{ withInterpolation | andPipe:arg1:argMethod(a1, a2, a3):'arg3' }}"></div>`,
          output: `<div id="kebab-case-{{ withInterpolation | andPipe:arg1:argMethod(a1, a2, a3):'arg3' }}"></div>`,
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="kebab-case {{ withInterpolation }}"`,
          code: '<div id="kebab-case {{ withInterpolation }}"></div>',
          output: '<div id="kebab-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="kebab-case {{ withInterpolation+andMore }}"`,
          code: '<div id="kebab-case {{ withInterpolation+andMore }}"></div>',
          output: '<div id="kebab-case-{{ withInterpolation+andMore }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="snake_case"`,
          code: '<div id="snake_case"></div>',
          output: '<div id="snake-case"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="snake_case_{{ withInterpolation }}"`,
          code: '<div id="snake_case_{{ withInterpolation }}"></div>',
          output: '<div id="snake-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="snake_case_{{ myObject.withInterpolation }}"`,
          code: '<div id="snake_case_{{ myObject.withInterpolation }}"></div>',
          output:
            '<div id="snake-case-{{ myObject.withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="snake_case_{{ this.withInterpolation }}"`,
          code: '<div id="snake_case_{{ this.withInterpolation }}"></div>',
          output: '<div id="snake-case-{{ this.withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="snake_case_{{ this.myObject.withInterpolation }}"`,
          code: '<div id="snake_case_{{ this.myObject.withInterpolation }}"></div>',
          output:
            '<div id="snake-case-{{ this.myObject.withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="snake_case_{{ withMethod() }}"`,
          code: '<div id="snake_case_{{ withMethod() }}"></div>',
          output: '<div id="snake-case-{{ withMethod() }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: ``,
          code: `<div id="snake_case_{{ withVar + 'and_string' + withMethod(someArgument, this.someOther(index)) + { magna: 'carta', magnum: { opus: 1 } } + 512 + [1, 2, 3] + null + false + undefined }}"></div>`,
          output: `<div id="snake-case-{{ withVar + 'and_string' + withMethod(someArgument, this.someOther(index)) + { magna: 'carta', magnum: { opus: 1 } } + 512 + [1, 2, 3] + null + false + undefined }}"></div>`,
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="snake_case_{{ withInterpolation + andMore }}"`,
          code: '<div id="snake_case_{{ withInterpolation + andMore }}"></div>',
          output:
            '<div id="snake-case-{{ withInterpolation + andMore }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="camelCase"`,
          code: '<div id="camelCase"></div>',
          output: '<div id="camel-case"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="camelCase{{ withInterpolation }}"`,
          code: '<div id="camelCase{{ withInterpolation }}"></div>',
          output: '<div id="camel-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="PascalCase"`,
          code: '<div id="PascalCase"></div>',
          output: '<div id="pascal-case"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="PascalCase{{ withInterpolation }}"`,
          code: '<div id="PascalCase{{ withInterpolation }}"></div>',
          output: '<div id="pascal-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="Mixed case"`,
          code: '<div id="Mixed case"></div>',
          output: '<div id="mixed-case"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
        {
          name: `id="Mixed case {{ withInterpolation }}"`,
          code: '<div id="Mixed case {{ withInterpolation }}"></div>',
          output: '<div id="mixed-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
        },
      ],
    });
  });

  describe("case: snake", () => {
    const options = [{ case: "snake" }];

    ruleTester.run("snake_case", rule, {
      valid: [
        {
          name: `id="snake_case"`,
          code: '<div id="snake_case"></div>',
          options,
        },
        {
          name: `id="snake_case_{{ withInterpolation }}"`,
          code: '<div id="snake_case_{{ withInterpolation }}"></div>',
          options,
        },
        {
          name: `id="snake_case_{{ withInterpolation + andMore }}"`,
          code: '<div id="snake_case_{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          name: `id="ignored Case {{ withInterpolation }}"`,
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "snake", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `id="snake_case-{{ withInterpolation }}"`,
          code: '<div id="snake_case-{{ withInterpolation }}"></div>',
          output: '<div id="snake_case_{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in snake_case." },
          ],
        },
      ],
    });
  });

  describe("case: camel", () => {
    const options = [{ case: "camel" }];

    ruleTester.run("camelCase", rule, {
      valid: [
        {
          name: `id="camelCase"`,
          code: '<div id="camelCase"></div>',
          options,
        },
        {
          name: `id="camelCase{{ withInterpolation }}"`,
          code: '<div id="camelCase{{ withInterpolation }}"></div>',
          options,
        },
        {
          name: `id="camelCase{{ withInterpolation + andMore }}"`,
          code: '<div id="camelCase{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          name: `id="ignored Case {{ withInterpolation }}"`,
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "camel", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `id="camelCase-{{ withInterpolation }}"`,
          code: '<div id="camelCase-{{ withInterpolation }}"></div>',
          output: '<div id="camelCase{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in camelCase." },
          ],
        },
      ],
    });
  });

  describe("case: pascal", () => {
    const options = [{ case: "pascal" }];

    ruleTester.run("PascalCase", rule, {
      valid: [
        {
          name: `id="PascalCase"`,
          code: '<div id="PascalCase"></div>',
          options,
        },
        {
          name: `id="PascalCase{{ withInterpolation }}"`,
          code: '<div id="PascalCase{{ withInterpolation }}"></div>',
          options,
        },
        {
          name: `id="PascalCase{{ withInterpolation + andMore }}"`,
          code: '<div id="PascalCase{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          name: `id="ignored Case {{ withInterpolation }}"`,
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "pascal", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `id="PascalCase-{{ withInterpolation }}"`,
          code: '<div id="PascalCase-{{ withInterpolation }}"></div>',
          output: '<div id="PascalCase{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in PascalCase." },
          ],
        },
      ],
    });
  });

  describe("Other cases", () => {
    const options = [{ case: "kebab" }];

    ruleTester.run("Miscellaneous", rule, {
      valid: [
        {
          name: `id="ignored Case {{ withInterpolation }}"`,
          code: '<div id="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "kebab", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `id=""`,
          code: '<div id=""></div>',
          options,
          errors: [{ message: "Template id attributes should not be empty." }],
        },
        {
          name: `id=" "`,
          code: '<div id=" "></div>',
          options,
          errors: [{ message: "Template id attributes should not be empty." }],
        },
        {
          name: `id="Some Mixed-Case"`,
          code: '<div id="Some Mixed-Case"></div>',
          output: '<div id="some-mixed-case"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
          options,
        },
        {
          name: `id="Some Mixed-Case {{ withInterpolation }}"`,
          code: '<div id="Some Mixed-Case {{ withInterpolation }}"></div>',
          output: '<div id="some-mixed-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template id attributes should be in kebab-case." },
          ],
          options,
        },
      ],
    });
  });
});
