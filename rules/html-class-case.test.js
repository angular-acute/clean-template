const { RuleTester } = require("eslint");
const angularParser = require("@angular-eslint/template-parser");
const rule = require("./html-class-case");

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

describe("html-class-case", () => {
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
          name: `[class]="myIdVariable"`,
          code: '<div [class]="myIdVariable"></div>',
          options,
        },
        {
          name: `class="kebab-case"`,
          code: '<div class="kebab-case"></div>',
          options,
        },
        {
          name: `class="kebab-case-{{ withInterpolation }}-and-{{more}}"`,
          code: '<div class="kebab-case-{{ withInterpolation }}-and-{{more}}"></div>',
          options,
        },
        {
          name: `class="kebab-case-{{ withInterpolation }}-{{andMore}}"`,
          code: '<div class="kebab-case-{{ withInterpolation }}-{{andMore}}"></div>',
          options,
        },
        {
          name: `class="kebab-case-{{ withInterpolation+andMore+evenStill }}"`,
          code: '<div class="kebab-case-{{ withInterpolation+andMore+evenStill }}"></div>',
          options,
        },
        {
          name: `class="ignored Case {{ withInterpolation }}"`,
          code: '<div class="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "kebab", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `class=" kebab-case"`,
          code: '<div class=" kebab-case"></div>',
          output: '<div class="kebab-case"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="kebab-case "`,
          code: '<div class="kebab-case "></div>',
          output: '<div class="kebab-case"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class=" kebab-case "`,
          code: '<div class=" kebab-case "></div>',
          output: '<div class="kebab-case"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="kebab-Case {{ withInterpolation }}"`,
          code: '<div class="kebab-Case {{ withInterpolation }}"></div>',
          output: '<div class="kebab-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="kebab-Case {{ withInterpolation | andPipe }}"`,
          code: '<div class="kebab-Case {{ withInterpolation | andPipe }}"></div>',
          output:
            '<div class="kebab-case-{{ withInterpolation | andPipe }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: ``,
          code: `<div class="kebab-Case {{ withInterpolation | andPipe:arg1:argMethod(a1, a2, a3):'arg3' }}"></div>`,
          output: `<div class="kebab-case-{{ withInterpolation | andPipe:arg1:argMethod(a1, a2, a3):'arg3' }}"></div>`,
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="kebab-case {{ withInterpolation }}"`,
          code: '<div class="kebab-case {{ withInterpolation }}"></div>',
          output: '<div class="kebab-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="kebab-case {{ withInterpolation+andMore }}"`,
          code: '<div class="kebab-case {{ withInterpolation+andMore }}"></div>',
          output: '<div class="kebab-case-{{ withInterpolation+andMore }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="snake_case"`,
          code: '<div class="snake_case"></div>',
          output: '<div class="snake-case"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="snake_case_{{ withInterpolation }}"`,
          code: '<div class="snake_case_{{ withInterpolation }}"></div>',
          output: '<div class="snake-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="snake_case_{{ myObject.withInterpolation }}"`,
          code: '<div class="snake_case_{{ myObject.withInterpolation }}"></div>',
          output:
            '<div class="snake-case-{{ myObject.withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="snake_case_{{ this.withInterpolation }}"`,
          code: '<div class="snake_case_{{ this.withInterpolation }}"></div>',
          output: '<div class="snake-case-{{ this.withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="snake_case_{{ this.myObject.withInterpolation }}"`,
          code: '<div class="snake_case_{{ this.myObject.withInterpolation }}"></div>',
          output:
            '<div class="snake-case-{{ this.myObject.withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="snake_case_{{ withMethod() }}"`,
          code: '<div class="snake_case_{{ withMethod() }}"></div>',
          output: '<div class="snake-case-{{ withMethod() }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: ``,
          code: `<div class="snake_case_{{ withVar + 'and_string' + withMethod(someArgument, this.someOther(index)) + { magna: 'carta', magnum: { opus: 1 } } + 512 + [1, 2, 3] + null + false + undefined }}"></div>`,
          output: `<div class="snake-case-{{ withVar + 'and_string' + withMethod(someArgument, this.someOther(index)) + { magna: 'carta', magnum: { opus: 1 } } + 512 + [1, 2, 3] + null + false + undefined }}"></div>`,
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="snake_case_{{ withInterpolation + andMore }}"`,
          code: '<div class="snake_case_{{ withInterpolation + andMore }}"></div>',
          output:
            '<div class="snake-case-{{ withInterpolation + andMore }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="camelCase"`,
          code: '<div class="camelCase"></div>',
          output: '<div class="camel-case"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="camelCase{{ withInterpolation }}"`,
          code: '<div class="camelCase{{ withInterpolation }}"></div>',
          output: '<div class="camel-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="PascalCase"`,
          code: '<div class="PascalCase"></div>',
          output: '<div class="pascal-case"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="PascalCase{{ withInterpolation }}"`,
          code: '<div class="PascalCase{{ withInterpolation }}"></div>',
          output: '<div class="pascal-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="Mixed case"`,
          code: '<div class="Mixed case"></div>',
          output: '<div class="mixed-case"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
        },
        {
          name: `class="Mixed case {{ withInterpolation }}"`,
          code: '<div class="Mixed case {{ withInterpolation }}"></div>',
          output: '<div class="mixed-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
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
          name: `class="snake_case"`,
          code: '<div class="snake_case"></div>',
          options,
        },
        {
          name: `class="snake_case_{{ withInterpolation }}"`,
          code: '<div class="snake_case_{{ withInterpolation }}"></div>',
          options,
        },
        {
          name: `class="snake_case_{{ withInterpolation + andMore }}"`,
          code: '<div class="snake_case_{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          name: `class="ignored Case {{ withInterpolation }}"`,
          code: '<div class="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "snake", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `class="snake_case-{{ withInterpolation }}"`,
          code: '<div class="snake_case-{{ withInterpolation }}"></div>',
          output: '<div class="snake_case_{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in snake_case." },
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
          name: `class="camelCase"`,
          code: '<div class="camelCase"></div>',
          options,
        },
        {
          name: `class="camelCase{{ withInterpolation }}"`,
          code: '<div class="camelCase{{ withInterpolation }}"></div>',
          options,
        },
        {
          name: `class="camelCase{{ withInterpolation + andMore }}"`,
          code: '<div class="camelCase{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          name: `class="ignored Case {{ withInterpolation }}"`,
          code: '<div class="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "camel", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `class="camelCase-{{ withInterpolation }}"`,
          code: '<div class="camelCase-{{ withInterpolation }}"></div>',
          output: '<div class="camelCase{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in camelCase." },
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
          name: `class="PascalCase"`,
          code: '<div class="PascalCase"></div>',
          options,
        },
        {
          name: `class="PascalCase{{ withInterpolation }}"`,
          code: '<div class="PascalCase{{ withInterpolation }}"></div>',
          options,
        },
        {
          name: `class="PascalCase{{ withInterpolation + andMore }}"`,
          code: '<div class="PascalCase{{ withInterpolation + andMore }}"></div>',
          options,
        },
        {
          name: `class="ignored Case {{ withInterpolation }}"`,
          code: '<div class="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "pascal", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `class="PascalCase-{{ withInterpolation }}"`,
          code: '<div class="PascalCase-{{ withInterpolation }}"></div>',
          output: '<div class="PascalCase{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in PascalCase." },
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
          name: `class="ignored Case {{ withInterpolation }}"`,
          code: '<div class="ignored Case {{ withInterpolation }}"></div>',
          options: [{ case: "kebab", ignoreInterpolated: true }],
        },
      ],
      invalid: [
        {
          name: `class=""`,
          code: '<div class=""></div>',
          options,
          errors: [{ message: "Template class attributes should not be empty." }],
        },
        {
          name: `class=" "`,
          code: '<div class=" "></div>',
          options,
          errors: [{ message: "Template class attributes should not be empty." }],
        },
        {
          name: `class="Some Mixed-Case"`,
          code: '<div class="Some Mixed-Case"></div>',
          output: '<div class="some-mixed-case"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
          options,
        },
        {
          name: `class="Some Mixed-Case {{ withInterpolation }}"`,
          code: '<div class="Some Mixed-Case {{ withInterpolation }}"></div>',
          output: '<div class="some-mixed-case-{{ withInterpolation }}"></div>',
          options,
          errors: [
            { message: "Template class attributes should be in kebab-case." },
          ],
          options,
        },
      ],
    });
  });
});
