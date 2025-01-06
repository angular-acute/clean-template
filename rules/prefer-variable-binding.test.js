const { RuleTester } = require("eslint");
const angularParser = require("@angular-eslint/template-parser");
const rule = require("./prefer-variable-binding");

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

describe("prefer-variable-binding", () => {
  ruleTester.run("prefer-variable-binding", rule, {
    valid: [
      {
        name: `prop="my string"`,
        code: '<div prop="my string"></div>',
      },
      {
        name: `prop="{{ var1 }} {{ var 2 }}"`,
        code: `<div prop="{{ var1 }} {{ var 2 }}"></div>`,
      },
    ],
    invalid: [
      {
        name: `prop="{{ myVariable }}"`,
        code: `<div prop="{{ myVariable }}"></div>`,
        output: '<div [prop]="myVariable"></div>',
        errors: [
          {
            message: "Prefer binding 'myVariable', rather than interpolating.",
          },
        ],
      },
      {
        name: `prop="{{ 'string' }}"`,
        code: `<div prop="{{ 'string' }}"></div>`,
        output: '<div prop="string"></div>',
        errors: [
          {
            message: "Unnecessary interpolation of 'string'.",
          },
        ],
      },
      {
        name: `prop="{{ 42 }}"`,
        code: `<div prop="{{ 42 }}"></div>`,
        output: '<div [prop]="42"></div>',
        errors: [
          {
            message: "Unnecessary interpolation of '42'.",
          },
        ],
      },
      {
        name: `prop="{{ myVariable + myOtherVariable }}"`,
        code: `<div prop="{{ myVariable + myOtherVariable }}"></div>`,
        output: '<div [prop]="myVariable + myOtherVariable"></div>',
        errors: [
          {
            message:
              "Prefer binding 'myVariable + myOtherVariable', rather than interpolating.",
          },
        ],
      },
      {
        name: `prop="{{ myMethod(index) }}"`,
        code: `<div prop="{{ myMethod(index) }}"></div>`,
        output: '<div [prop]="myMethod(index)"></div>',
        errors: [
          {
            message:
              "Prefer binding 'myMethod(index)', rather than interpolating.",
          },
        ],
      },
      {
        name: `prop="{{ myVariable + this.myMethod(index) }}"`,
        code: `<div prop="{{ myVariable + this.myMethod(index) }}"></div>`,
        output: '<div [prop]="myVariable + this.myMethod(index)"></div>',
        errors: [
          {
            message:
              "Prefer binding 'myVariable + this.myMethod(index)', rather than interpolating.",
          },
        ],
      },
      {
        name: `prop="{{\n  myVariable\n  + myOtherVariable\n}}"`,
        code: `<div prop="{{
          myVariable
          + myOtherVariable
        }}"></div>`,
        output: `<div [prop]="
          myVariable
          + myOtherVariable
        "></div>`,
        errors: [
          {
            message:
              "Prefer binding 'myVariable + myOtherVariable', rather than interpolating.",
          },
        ],
      },
      {
        name: `prop="{{ \`\n  myVariable\n  + myOtherVariable\n\` }}"`,
        code: `<div prop="{{ \`
          myVariable
          + myOtherVariable
        \` }}"></div>`,
        output: `<div [prop]="
          myVariable
          + myOtherVariable
        "></div>`,
        errors: [
          {
            message:
              "Unnecessary interpolation of ' myVariable + myOtherVariable '.",
          },
        ],
      },
      {
        name: `prop="{{ this.myVariable }}"`,
        code: `<div prop="{{ this.myVariable }}"></div>`,
        output: '<div [prop]="this.myVariable"></div>',
        errors: [
          {
            message:
              "Prefer binding 'this.myVariable', rather than interpolating.",
          },
        ],
      },
    ],
  });
});
