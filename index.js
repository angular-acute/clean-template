module.exports = {
  rules: {
    "html-class-case": require("./rules/html-class-case"),
    "html-id-case": require("./rules/html-id-case"),
    "no-binding-literals": require("./rules/no-binding-literals"),
    "no-template-this": require("./rules/no-template-this"),
    "prefer-variable-binding": require("./rules/prefer-variable-binding"),
  },
  configs: {
    recommended: {
      plugins: ["@acute/clean-template"],
      rules: {
        "@acute/clean-template/html-class-case": "warn",
        "@acute/clean-template/html-id-case": "warn",
        "@acute/clean-template/no-binding-literals": "warn",
        "@acute/clean-template/no-template-this": "warn",
        "@acute/clean-template/prefer-variable-binding": "warn",
      },
    },
    strict: {
      plugins: ["@acute/clean-template"],
      rules: {
        "@acute/clean-template/html-class-case": "error",
        "@acute/clean-template/html-id-case": "error",
        "@acute/clean-template/no-binding-literals": "error",
        "@acute/clean-template/no-template-this": "error",
        "@acute/clean-template/prefer-variable-binding": "error",
      },
    },
  },
};
