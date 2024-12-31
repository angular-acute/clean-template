const { RuleTester } = require("eslint");
const angularParser = require("@angular-eslint/template-parser");
const rule = require("./no-binding-literals");

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

describe("no-binding-literals", () => {
  ruleTester.run("kebab-case", rule, {
    valid: [
      {
        code: '<div prop="my string"></div>',
      },
      {
        code: `<div [prop]="'my' + 'string'"></div>`,
      },
      {
        code: `<div *ngSwitchCase="'my string'"></div>`,
      },
    ],
    invalid: [
      {
        code: `<div [prop]="'my string'"></div>`,
        output: '<div prop="my string"></div>',
        errors: [
          { message: "Unnecessary binding of string literal 'my string'." },
        ],
      },
      {
        code: `<div *ngIf="'bananas'"></div>`,
        errors: [
          {
            message:
              "Pointless structural binding of string literal 'bananas'.",
          },
        ],
      },
    ],
  });
});
