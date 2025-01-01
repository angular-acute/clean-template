module.exports = {
  rules: {
    "html-id-case": require("./rules/html-id-case"),
    "no-binding-literals": require("./rules/no-binding-literals"),
    "prefer-variable-binding": require("./rules/prefer-variable-binding"),
  },
  configs: {
    recommended: {
      plugins: ["@acute/clean-template"],
      rules: {
        "@acute/clean-template/html-id-case": "warn",
        "@acute/clean-template/no-binding-literals": "warn",
        "@acute/clean-template/prefer-variable-binding": "warn",
      },
    },
    strict: {
      plugins: ["@acute/clean-template"],
      rules: {
        "@acute/clean-template/html-id-case": "error",
        "@acute/clean-template/no-binding-literals": "error",
        "@acute/clean-template/prefer-variable-binding": "error",
      },
    },
  },
};
