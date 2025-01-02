const { RuleTester } = require("eslint");
const angularParser = require("@angular-eslint/template-parser");
const rule = require("./no-template-this");

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

describe("no-template-this", () => {
  ruleTester.run("no-template-this", rule, {
    valid: [
      {
        name: `[prop]="someVariable"`,
        code: '<div [prop]="someVariable"></div>',
      },
      {
        name: `(prop)="someMethod()"`,
        code: '<div (prop)="someMethod()"></div>',
      },
      {
        name: `(prop)="someMethod($event)"`,
        code: '<div (prop)="someMethod($event)"></div>',
      },
      {
        name: `(prop)="someMethod($event, stuff)"`,
        code: '<div (prop)="someMethod($event, stuff)"></div>',
      },
      {
        name: `[(prop)]="someVariable"`,
        code: '<div [(prop)]="someVariable"></div>',
      },
      {
        name: `[prop]="someVariable + someOtherVariable"`,
        code: '<div [prop]="someVariable + someOtherVariable"></div>',
      },
    ],
    invalid: [
      {
        name: `[prop]="this.someVariable"`,
        code: '<div [prop]="this.someVariable"></div>',
        output: '<div [prop]="someVariable"></div>',
        errors: [{ message: "Unnecessary `this.` in template." }],
      },
      {
        name: `(prop)="this.someMethod()"`,
        code: '<div (prop)="this.someMethod()"></div>',
        output: '<div (prop)="someMethod()"></div>',
        errors: [{ message: "Unnecessary `this.` in template." }],
      },
      {
        name: `(prop)="this.someMethod($event)"`,
        code: '<div (prop)="this.someMethod($event)"></div>',
        output: '<div (prop)="someMethod($event)"></div>',
        errors: [{ message: "Unnecessary `this.` in template." }],
      },
      {
        name: `(prop)="this.someMethod($event, stuff)"`,
        code: '<div (prop)="this.someMethod($event, stuff)"></div>',
        output: '<div (prop)="someMethod($event, stuff)"></div>',
        errors: [{ message: "Unnecessary `this.` in template." }],
      },
      {
        name: `[(prop)]="this.someVariable"`,
        code: '<div [(prop)]="this.someVariable"></div>',
        output: '<div [(prop)]="someVariable"></div>',
        errors: [{ message: "Unnecessary `this.` in template." }],
      },
      {
        name: `[prop]="this.someVariable + someOtherVariable"`,
        code: '<div [prop]="this.someVariable + someOtherVariable"></div>',
        output: '<div [prop]="someVariable + someOtherVariable"></div>',
        errors: [{ message: "Unnecessary `this.` in template." }],
      },
      {
        name: `[prop]="someVariable + this.someOtherVariable"`,
        code: '<div [prop]="someVariable + this.someOtherVariable"></div>',
        output: '<div [prop]="someVariable + someOtherVariable"></div>',
        errors: [{ message: "Unnecessary `this.` in template." }],
      },
      {
        name: `[prop]="this.someVariable + this.someOtherVariable"`,
        code: '<div [prop]="this.someVariable + this.someOtherVariable"></div>',
        output: '<div [prop]="someVariable + someOtherVariable"></div>',
        errors: [{ message: "Unnecessary `this.` in template." }],
      },
    ],
  });
});
