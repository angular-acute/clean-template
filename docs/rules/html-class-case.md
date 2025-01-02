 

<!-- end auto-generated rule header -->

## Options

- `case`: The case style to enforce for template id attributes. Options: `kebab`, `snake`, `camel`, `pascal`. Default: `"kebab"`.
- `ignoreInterpolated`: Whether to ignore ids with Angular interpolation (e.g., `id="my-id-{{ value }}"`). Default: `false`.

## Config

```json
{
  "rules": {
    "html-class-case": [
      "warn",
      {
        "case": "camel",
        "ignoreInterpolated": true
      }
    ]
  }
}
```
