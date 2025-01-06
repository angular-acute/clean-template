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
  ruleTester.run("no-binding-literals", rule, {
    valid: [
      {
        name: `prop="my string"`,
        code: '<div prop="my string"></div>',
      },
      {
        name: `[prop]="'my' + 'string'"`,
        code: `<div [prop]="'my' + 'string'"></div>`,
      },
      {
        name: `*ngSwitchCase="'my string'"`,
        code: `<div *ngSwitchCase="'my string'"></div>`,
      },
    ],
    invalid: [
      {
        name: `[prop]="'my string'"`,
        code: `<div [prop]="'my string'"></div>`,
        output: '<div prop="my string"></div>',
        errors: [
          { message: "Unnecessary binding of string literal 'my string'." },
        ],
      },
      {
        name: `*ngIf="'bananas'"`,
        code: `<div *ngIf="'bananas'"></div>`,
        errors: [
          {
            message:
              "Pointless structural binding of string literal 'bananas'.",
          },
        ],
      },
      {
        name: `*ngSwitchDefault="'bananas'"`,
        code: `<div *ngSwitchDefault="'bananas'"></div>`,
        output: "<div *ngSwitchDefault></div>",
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
