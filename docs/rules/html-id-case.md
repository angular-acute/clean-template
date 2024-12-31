# Enforces consistent case styling of the HTML id attribute (`@acute/clean-template/html-id-case`)

💼⚠️ This rule is enabled in the 🔒 `strict` config. This rule _warns_ in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Options

- `case`: The case style to enforce for template id attributes. Options: `kebab`, `snake`, `camel`, `pascal`. Default: `"kebab"`.
- `ignoreInterpolated`: Whether to ignore ids with Angular interpolation (e.g., `id="my-id-{{ value }}"`). Default: `false`.

## Config

```json
{
  "rules": {
    "html-id-case": [
      "error",
      {
        "case": "camel",
        "ignoreInterpolated": true
      }
    ]
  }
}
```
