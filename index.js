module.exports = {
  rules: {
    "html-id-case": require("./rules/html-id-case"),
    "no-binding-literals": require("./rules/no-binding-literals"),
    "no-template-this": require("./rules/no-template-this"),
    "prefer-variable-binding": require("./rules/prefer-variable-binding"),
  },
  configs: {
    recommended: {
      plugins: ["@acute-ng/clean-template"],
      rules: {
        "@acute-ng/clean-template/html-id-case": "warn",
        "@acute-ng/clean-template/no-binding-literals": "warn",
        "@acute-ng/clean-template/no-template-this": "warn",
        "@acute-ng/clean-template/prefer-variable-binding": "warn",
      },
    },
    strict: {
      plugins: ["@acute-ng/clean-template"],
      rules: {
        "@acute-ng/clean-template/html-id-case": "error",
        "@acute-ng/clean-template/no-binding-literals": "error",
        "@acute-ng/clean-template/no-template-this": "error",
        "@acute-ng/clean-template/prefer-variable-binding": "error",
      },
    },
  },
};
