module.exports = {
  rules: {
    "html-id-case": require("./rules/html-id-case"),
  },
  configs: {
    recommended: {
      plugins: ["@acute/clean-template"],
      rules: {
        "@acute/clean-template/html-id-case": "warn",
      },
    },
    strict: {
      plugins: ["@acute/clean-template"],
      rules: {
        "@acute/clean-template/html-id-case": "error",
      },
    },
  },
};
