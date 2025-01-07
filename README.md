# @acute-ng/eslint-plugin-clean-template

## Install

```sh
npm install --save-dev eslint @acute-ng/eslint-plugin-clean-template
```

## Usage (`eslint.config.js`)

**Requires ESLint `>=8.56.0`.**

Use `recommended` or `strict` settings, or configure each rule in `eslint.config`.

If you don't use the preset, ensure you use the same `languageOptions` config as below.

### ES Module (Recommended)

```js
import acuteCleanTemplate from "@acute-ng/eslint-plugin-clean-template";
import templateParser from "@angular-eslint/template-parser";

export default [
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: templateParser,
    },
    plugins: {
      "@acute-ng/clean-template": acuteCleanTemplate,
    },
    rules: {
      "@acute-ng/clean-template/html-id-case": "warn",
      "@acute-ng/clean-template/no-binding-literals": "warn",
      "@acute-ng/clean-template/no-template-this": "warn",
      "@acute-ng/clean-template/prefer-variable-binding": "warn",
    },
  },
];
```

### CommonJS

```js
"use strict";
const acuteCleanTemplate = require("@acute-ng/eslint-plugin-clean-template");
const templateParser = require("@angular-eslint/template-parser");

module.exports = [
  {
    languageOptions: {
      parser: templateParser,
    },
    plugins: {
      "@acute-ng/clean-template": acuteCleanTemplate,
    },
    rules: {
      "@acute-ng/clean-template/html-id-case": "warn",
      "@acute-ng/clean-template/no-binding-literals": "warn",
      "@acute-ng/clean-template/no-template-this": "warn",
      "@acute-ng/clean-template/prefer-variable-binding": "warn",
    },
  },
];
```

## Usage (legacy: `.eslintrc.*` or `package.json`)

```json
{
  "parser": "@angular-eslint/template-parser",
  "plugins": ["@acute-ng/clean-template"],
  "rules": {
    "@acute-ng/clean-template/html-id-case": "warn",
    "@acute-ng/clean-template/no-binding-literals": "warn",
    "@acute-ng/clean-template/no-template-this": "warn",
    "@acute-ng/clean-template/prefer-variable-binding": "warn"
  }
}
```

## Rules

 <!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
✅ Set in the `recommended` configuration.\
🔒 Set in the `strict` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                             | Description                                                   | 💼  | ⚠️  | 🔧  |
| :--------------------------------------------------------------- | :------------------------------------------------------------ | :-- | :-- | :-- |
| [html-id-case](docs/rules/html-id-case.md)                       | Enforces consistent case styling of the HTML id attribute.    | 🔒  | ✅  | 🔧  |
| [no-binding-literals](docs/rules/no-binding-literals.md)         | Prevent binding properties to string literals.                | 🔒  | ✅  | 🔧  |
| [no-template-this](docs/rules/no-template-this.md)               | Help prevent using unnecessary `this` in templates.           | 🔒  | ✅  | 🔧  |
| [prefer-variable-binding](docs/rules/prefer-variable-binding.md) | Enforces property binding over simple variable interpolation. | 🔒  | ✅  | 🔧  |

<!-- end auto-generated rules list -->
